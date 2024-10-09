import React from "react";
import "./CartList.css";

const ShoppingCartItem = (props) => {
  return (
    <div className="items">
      <img src={`images/${props.Product_Image}`} alt={props.ProductName} width={"200px"} />
      <p>{props.ProductName}</p>
    </div>
  );
};

export default ShoppingCartItem;
