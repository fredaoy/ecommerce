import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import ShoppingCartItem from "../Components/CartList/CartList";
import "./CSS/shopCategory.css";
import axios from "axios";
// import Category from '../Components/Category/Category'

const ShopCategory = ({ category }) => {
  const { AllProduct, addToCart } = useContext(ShopContext);

  // Filter products by category
  const filteredProducts = AllProduct.filter(
    (item) => item.Category_Id === parseInt(category)
  );

  const handleAddToCart = async (product) => {
    try {
      const quantity = 1;
      const totalPrice = quantity * product.Price;
      console.log("Product ID:", product.id);
      console.log("Quantity:", quantity);
      console.log("Total Price:", totalPrice);

      const response = await axios.post("/cart", {
        productId: product.id,
        quantity: quantity,
        totalPrice: totalPrice,
      });
      console.log(response.data); // Log response from the server
      addToCart(product.id, quantity);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="shop-category">
      <div className="shop-category-name">
        <p>{/* <span>หมวดหมู่</span>{filteredProducts.length} */}</p>
      </div>
      <div className="shop-category-indexSort">
        <p>
          <span>Show</span> Out of {filteredProducts.length} Products
        </p>
        <div className="shop-category-sort">
          {/* Sort by <img src={} alt="" /> */}
        </div>
      </div>

      <div className="shopCategory-product">
        {filteredProducts.map((item, i) => (
          <div className="shopCategory-item" key={item.Product_Id}>
            <ShoppingCartItem
              Product_Id={item.Product_Id}
              ProductName={item.ProductName}
              Product_Image={item.Product_Image}
              Price={item.Price}
              Category_Id={item.Category_Id}
            />
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategory;
