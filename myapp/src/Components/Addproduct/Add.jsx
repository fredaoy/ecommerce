import React, { useState } from "react";
import axios from "axios";
import './Add.css'
import logoAddProduct from "../Assets/logoForAddProduct.png";
import Swal from 'sweetalert2';

const Add = () => {
  const [file, setFile] = useState();
  const [p_name, setProduct_name] = useState();
  const [p_description, setDescription] = useState();
  const [p_price, setProduct_price] = useState();
  const [p_quantity, setStock_quantity] = useState();
  const [p_status, setProduct_status] = useState("yes");
  const [p_category, setCategory] = useState("1");



  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("name", p_name);
    formdata.append("description", p_description);
    formdata.append("price", p_price);
    formdata.append("quantity", p_quantity);
    formdata.append("status", p_status);
    formdata.append("category", p_category);

    Swal.fire("Insert Product Ok!");


    axios
      .post("/products", formdata)
      .then((res) => console.log("at then", res))
      .catch((err) => console.log("at catch", err));

  };

  return (
    <div className="form-addProduct">
      <form>
        <div className="header-form">
          <div className="logo-products">
            <img src={logoAddProduct} alt="" />
            <h2>ลงขายสินค้า</h2>
          </div>
          <h4>รายละเอียดสินค้า</h4>
        </div>
        <div className="t2flex">
          <div className="input-groups">
            <label htmlFor="Upload_Files">Upload Files</label>
            <input
              type="file"
              name="image"
              id="Upload_Files"
              onChange={handleFile}
            />
          </div>
          <div className="input-groups">
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              placeholder="Product Name"
              onChange={(e) => setProduct_name(e.target.value)}
            />
          </div>
        </div>

        <div className="t2flex">
            <div className="input-groups">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="input-groups">
              <label htmlFor="product_price">Product Price</label>
              <input
                type="number"
                name="product_price"
                id="product_price"
                placeholder="Product Price"
                onChange={(e) => setProduct_price(e.target.value)}
              />
            </div>
        </div>
       
        <div className="t2flex"> 
            <div className="input-groups">
              <label htmlFor="stock_quantity">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                id="stock_quantity"
                placeholder="Stock Quantity"
                onChange={(e) => setStock_quantity(e.target.value)}
              />
            </div>
            <div className="input-groups">
              <label htmlFor="produst_status">Product Status</label>
              <select
                name="produst_status"
                onChange={(e) => setProduct_status(e.target.value)}
                value={p_status}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
        </div>
        
        <div className="t2flex"> 
          <div className="input-groups">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={p_category}
            >
              <option value="1">ยานพาหนะ</option>
              <option value="4">ของเล่นและเกมส์</option>
              <option value="5">อสังหาริมทรัพย์</option>
              <option value="6">ผลิตภัณฑ์เด็ก</option>
              <option value="7">ครอบครัว</option>
              <option value="8">ความบันเทิง</option>
              <option value="3">ของตกแต่งบ้าน</option>
              <option value="10">กีฬา</option>
              <option value="11">อุปกรณ์อิเล็คทรอนิกส์</option>
              <option value="12">สวนและกลางแจ้ง</option>
              <option value="13">เครื่องดนตรี</option>
              <option value="14">เสื้อผ้า</option>
              <option value="16">เครื่องสำอางค์</option>
              <option value="17">สัตว์เลี้ยง</option>
            </select>
          </div>  
        </div>
        
        <div className="btn-submit">
          <button onClick={handleUpload} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
