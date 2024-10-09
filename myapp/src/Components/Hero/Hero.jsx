import React from "react";
import "./Hero.css";
import { Link, useNavigate } from 'react-router-dom';


const Hero = () => {
  return (
  <div className="hero-background">
    <div className="hero">
      <h1>Welcome to <br /> Marketplace !</h1>
      <div className="intro-text">
        <h3>MARKETPLACE</h3>
        <p>Shopping on Facebook <br /> with many services <br /> and garuntee</p>
        <Link to="/Signin"> <input type="button" value="Get Start" /></Link>
      </div>
    </div>
  </div>
   
  );
};

export default Hero;
