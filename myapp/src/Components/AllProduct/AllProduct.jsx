import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AllProduct = () => {

  const [items, setItems] = useState([]);

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
    
  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <p>upload_files: {item.ProductName}</p>
          <p>product_name: {item.Product_Image}</p>
          <p>description: {item.ProductDescription}</p>
          <p>product_price: {item.Price}</p>
          <p>stock_quantity: {item.StockQuantity}</p>
          <p>produst_status: {item.ProductStatus}</p>
          <p>category: {item.Category_Id}</p>
        </div>
      ))}
    </div>
  )
}

export default AllProduct
