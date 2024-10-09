import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Cart.css";
import Swal from 'sweetalert2'
import ShoppingCartItem from "../CartList/CartList";
import { ShopContext } from "../../Context/ShopContext";

const Cart = () => {
  // const { AllProduct } = useContext(ShopContext);

  const [cartItems, setCartItems] = useState([]);
  const { removeFromCart } = useContext(ShopContext);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("/cart");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (product) => {
    console.log("pid", product);
    if (!product) {
      console.error("Invalid product object for removal.");
      return;
    }
    try {
      console.log("cartitem, trying : ", product);
      const response = await axios.delete(`/cart/${product}`);
      console.log("cartitem : resp", response.data); // Log response from the server
      Swal.fire({
        icon: "success",
        title: "Item has been deleted",
        showConfirmButton: false,
        timer: 1500
      });
      
      // Update the local state or context to reflect the removal
      removeFromCart(product);
      // setCartItems(prevCartItems => prevCartItems.filter(item => item.Product_Id !== product));
    } catch (error) {
      console.error(" cartItems : Error removing product from cart:", error);
    }
  };

  return (
    <div className="carts">
      <h1>Shopping Cart</h1>
      <hr className="hr" />
      <div className="carts-items">
        {cartItems.map((item) => (
          <div className="carts-item" key={item.Product_Id}>
            {console.log("ppid", item)}
            <ShoppingCartItem
              Product_Id={item.Product_Id}
              ProductName={item.ProductName}
              Product_Image={item.Product_Image}
              Price={item.TotalPrice / item.quantity}
              // ProductStatus="In Stock"
            />
            <div className="cart-item-details">
              <p>จำนวน: {item.Quantity}</p>
              <p>ราคาทั้งหมด: {item.TotalPrice} บาท</p>
              <button onClick={() => handleRemoveFromCart(item.Product_Id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
