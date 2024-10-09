import React from "react";
import "./Item.css";
const Item = (props) => {
  return (
    <div className="shopping-cart">
      <div className="cart-items">
        <div className="item">
        <p>{props.Product_Id}</p>
          <img src={`images/` + props.Product_Image} alt="" />
          <p>{props.ProductName}</p>
          <div className="item-price">
            <div className="item-price-new">{props.Price} Bath</div>

            <div className="status">
             Status: {props.ProductStatus} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
