const express = require("express");
const db = require("./database");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bcrypt = require("bcryptjs");
// require('dotenv').config({path: "my-app\backend\secretpk"});
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const multer = require("multer");
const path = require("path");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const sessionConfig = {
  secret: "secret",
  resave: true, // บันทึก session ทุกครั้งที่มีการร้องขอ
  saveUninitialized: true, // บันทึก session ทุกครั้งที่มีการร้องขอ โดยไม่คำนึงว่า session จะมีข้อมูลหรือไม่
  maxAge: 3600,
};
app.use(session(sessionConfig));

// app.get('/', function(req, res, next) {
//   const getUserId = req.session.user_id;
//   if (!getUserId) {
//     res.redirect('../myapp/src/Components/Signin/Signin.jsx'); // redirect to login page if no user_id is found
//   } else {
//     // proceed with the request
//   }
// })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../myapp/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/register", async (req, res) => {
  // Define the password pattern you want to enforce
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const { firstname, lastname, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ตรวจสอบว่าไม่มีค่าที่เป็นค่าว่างหรือ undefined
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate the password against the pattern
    else if (!password_pattern.test(password)) {
      return res
        .status(400)
        .json({ message: "Password does not meet the required criteria" });
    }

    db.query(
      "INSERT INTO users (FirstName, LastName, Email, Passwords) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).json({ message: "Failed to register user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { firstname, email, password } = req.body;

  if (!firstname || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "SELECT * FROM users WHERE FirstName = ? AND Email = ?",
    [firstname, email],
    async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
        const validPass = await bcrypt.compare(password, results[0].Passwords);
        if (validPass) {
          const user_id = results[0].User_Id;
          req.session.user_id = user_id;
          req.session.firstname = firstname;
          req.session.email = email;
          req.session.password = password;
          console.log("Login Success");
          res.status(200).send("Login Success");
        } else {
          console.log("Password is not correct");
          res.status(400).send("Password is not correct");
        }
      } else {
        console.log("User not found");
        res.status(400).send("User not found");
      }
    }
  );
});

// แก้ไขเส้นทาง /profile
app.get("/profile", (req, res) => {
  const getUserId = req.session.user_id;
  const getFirstname = req.session.firstname;
  const getEmail = req.session.email;
  const getPassword = req.session.password;
  res.json({
    userid: getUserId,
    firstname: getFirstname,
    email: getEmail,
    password: getPassword,
  });
});

// PUT /profile/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put("/profile/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const formData = req.body;

    // เข้ารหัสรหัสผ่านก่อนที่จะบันทึกลงฐานข้อมูล
    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const sql =
      "UPDATE users SET FirstName = ?,  Email = ?, Passwords = ? WHERE User_Id = ?";
    const values = [
      formData.firstname,
      formData.email,
      hashedPassword, // ใช้รหัสผ่านที่เข้ารหัสแล้ว
      id,
    ];
    console.log("updated", values);
    db.query(sql, values);
    //เพิ่ม session ตรงเก็บค่าอันใหม่
    req.session.firstname = formData.firstname;
    req.session.email = formData.email;
    req.session.password = formData.password;
    res.json({
      message: "Update Ok",
      data: {
        firstname: formData.firstname,
        email: formData.email,
        password: formData.password,
      },
    });
  } catch (error) {
    console.error("Error updating user", error.message);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

// DELETE /profile/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete("/profile/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const sql = "DELETE FROM users WHERE User_Id = ?";
    const values = [id];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้", err.message);
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดบางอย่าง",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบผู้ใช้" });
      }

      // ลบ session หลังจากการลบ
      req.session.destroy((err) => {
        if (err) {
          console.error("เกิดข้อผิดพลาดในการทำลาย session", err.message);
          return res.status(500).json({
            message: "เกิดข้อผิดพลาดบางอย่าง",
          });
        }
        res.json({
          message: "ลบข้อมูลเรียบร้อยแล้ว",
        });
      });
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้", error.message);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่าง",
    });
  }
});

// Get all items
app.post("/products", upload.single("image"), (req, res) => {
  const getUserId = req.session.user_id;

  if (getUserId == null) {
    return res.status(401).json({ message: "Please register or log in." });
  }

  const image = req.file;
  const imagename = req.file.filename;
  const info = req.body;

  const name = info.name;
  const description = info.description;
  const price = info.price;
  const quantity = info.quantity;
  const status = info.status;
  const category = info.category;

  console.log("name: ", name);
  console.log("description: ", description);
  console.log("price: ", price);
  console.log("quantity: ", quantity);
  console.log("status: ", status);
  console.log("category: ", category);
  console.log("image: ", image);

  // ตรวจสอบค่าที่ได้รับว่าไม่ว่างเปล่าหรือไม่
  if (
    !image ||
    !name ||
    !description ||
    !price ||
    !quantity ||
    !status ||
    !category ||
    !getUserId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO products (ProductName, Product_Image, ProductDescription, Price, StockQuantity, ProductStatus, Category_Id, User_Id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      imagename, // เก็บที่อยู่ของไฟล์ภาพ
      description,
      price,
      quantity,
      status,
      category.replace("v_", ""),
      getUserId, // เพิ่ม user ID ที่ดึงมาจาก session
    ],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // ถ้าสำเร็จให้ส่งข้อความแจ้งเตือนว่าสำเร็จ
      console.log("Add Success");
      res.status(200).json({ message: "Product added successfully" });
    }
  );
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

app.post("/cart", (req, res) => {
  const userId = req.session.user_id;
  const { productId, quantity, totalPrice } = req.body;

  console.log(productId, quantity, totalPrice, userId);
  // Check if all required fields are present
  if (!userId || !productId || !quantity || !totalPrice) {
    return res.status(400).send("Invalid data");
  }

  const query = `INSERT INTO carts (Product_Id, Quantity, TotalPrice, Users_Id) VALUES (?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE Quantity = quantity`;

  db.query(query, [productId, quantity, totalPrice, userId], (err, result) => {
    if (err) {
      console.error("Error adding product to cart:", err);
      return res.status(500).send("Error adding product to cart");
    }
    res.send("Product added to cart successfully");
  });
});

// Route สำหรับดึงข้อมูลจาก cart และ products โดยใช้ JOIN

app.get("/cart", (req, res) => {
  const User_Id = req.session.user_id;

  const query = `
    SELECT p.Product_Id,p.ProductName, p.Product_Image, c.Quantity, c.TotalPrice
    FROM carts AS c
    JOIN products AS p ON c.Product_Id = p.Product_Id
    WHERE Users_Id = ?
  `;

  db.query(query, [User_Id], (err, results) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).send("Error fetching cart items");
    }
    res.json(results);
  });
});


app.delete("/cart/:id", async (req, res) => {
  console.log("server - delete - cart");
  try {
    const product = req.params.id; // รับค่า Product_Id จาก URL parameter
    const userId = req.session.user_id; // รับค่า User_Id จาก session หรือตามที่กำหนด

    console.log("server : delete : cart: ", userId, product);

    if (!userId || !product) {
      return res
        .status(400)
        .json({ message: "User ID or Product ID is missing." });
    }

    console.log("PASS HERE server : delete : cart: ", userId, product);
    const sql = "DELETE FROM carts WHERE Users_Id = ? AND Product_Id = ?";
    const values = [userId, product];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("เกิดข้อผิดพลาดในการลบสินค้าในตะกร้า", err.message);
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดบางอย่าง",
        });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "ไม่พบสินค้าในตะกร้า" });
      }

      res.json({
        message: "ลบสินค้าออกจากตะกร้าเรียบร้อยแล้ว",
      });
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการลบสินค้าในตะกร้า", error.message);
    res.status(500).json({
      message: "เกิดข้อผิดพลาดบางอย่าง",
    });
  }
});

// // GET products by category
// app.get('/products/:category', (req, res) => {
//   const category = req.query.category;

//   // คำสั่ง SQL ที่ดึงข้อมูลสินค้าที่มี category เท่ากับค่าที่ส่งมา
//   const sql = `SELECT * FROM products WHERE category = ?`;

//   db.query(sql, [category], (err, rows) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     res.json(rows);
//   });
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

