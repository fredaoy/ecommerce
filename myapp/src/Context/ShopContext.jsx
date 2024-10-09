import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [AllProduct, setAllProduct] = useState([]);
  const [cartItem, setCartItem] = useState({}); // Initialize an empty cart object

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products"); // Adjust endpoint according to your API
        setAllProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Initialize cart when products are fetched
  useEffect(() => {
    const getDefaultCart = () => {
      let cart = {};
      AllProduct.forEach((product) => {
        cart[product.id] = 0; // Initialize each product ID with a count of 0
      });
      return cart;
    };
    setCartItem(getDefaultCart());
  }, [AllProduct]);

  const addToCart = async (itemId) => {
    if (!itemId) {
      console.error("Invalid itemId:", itemId);
      return;
    }

    try {
      console.log("itemId:", itemId);
      console.log("cartItem1:", cartItem);
      await axios.post("/cart", { productId: itemId, quantity: 1 }); // ส่งข้อมูลไปยังเซิร์ฟเวอร์
      setCartItem((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
      console.log("cartItem1:", cartItem.prev);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const removeFromCart = async (itemId) => {
    console.log("// -- ", itemId);
    if (!itemId) {
      console.error("Invalid itemId:", itemId);
      return;
    }

    try {
      // Check if quantity is already 0 before decrementing
      console.log("deleting item with id :", itemId);
      await axios.delete(`/cart/${itemId}`);
      window.location.reload(true);
      setCartItem((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) - 1,
      }));
    } catch (error) {
      console.error("--Error adding product to cart:", error);
    }
  };

  // const removeFromCart = async (itemId) => {
  //   if (cartItem[itemId] > 0) {

  //     const removeFromCart = async (itemId) => {
  //       if (!itemId) {
  //         console.error('Invalid itemId:', itemId);
  //         return;
  //       }
  //     try {
  //       await axios.delete('/cart', { productId: itemId, quantity: -1 }); // ลดจำนวนสินค้าในฐานข้อมูล
  //       setCartItem(prev => ({
  //         ...prev,
  //         [itemId]: prev[itemId] - 1,
  //       }));
  //     } catch (error) {
  //       console.error('Error removing product from cart:', error);
  //     }
  //   }
  // };

  const contextValue = { AllProduct, cartItem, addToCart, removeFromCart };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
