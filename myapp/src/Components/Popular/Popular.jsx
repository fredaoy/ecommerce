import "./Popular.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
// import ShoppingCartItem from '../CartList/CartList';
import Item from '../Item/Item';
import { ShopContext } from "../../Context/ShopContext";
import Swal from 'sweetalert2'

const Popular = () => {
  const [items, setItems] = useState([]);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId, price) => {
    try {
      const quantity = 1;
      const totalPrice = quantity * price;
      console.log("Product ID:", productId);
      console.log("Quantity:", quantity);
      console.log("Total Price:", totalPrice);

      Swal.fire({
        icon: "success",
        title: "Success",
        showConfirmButton: false,
        timer: 1500
      });

      const response = await axios.post('/cart', { productId, quantity, totalPrice });
      console.log(response.data); // Log response from the server
      addToCart(productId, quantity);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="popular">
      <h1>Popular Products</h1>
      <hr />
      <div className="popular-item">
        {items.map((item) => ( 
          <div className="all-product" key={item.Product_Id}>
            
            <Item
              id={item.Product_Id}
              ProductName={item.ProductName}
              Product_Image={item.Product_Image}
              Price={item.Price}
              ProductStatus={item.ProductStatus}
            />
            <div className="btn-add">
              <input onClick={() => handleAddToCart(item.Product_Id, item.Price)} type="button" value="Add to Cart" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
