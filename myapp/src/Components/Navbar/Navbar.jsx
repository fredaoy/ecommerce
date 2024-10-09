import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart-icon.png'
import { Link } from 'react-router-dom';


function Navbar() {

  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li onClick={() => {setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link> {menu==="home"? <hr/>:<></>}</li>
        <li onClick={() => {setMenu("add_product")}}><Link style={{textDecoration: 'none'}} to='/add_product'>Add Product</Link> {menu==="add_product"? <hr/>:<></>}</li>
        <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/shop'>Shop</Link> {menu==="shop"? <hr/>:<></>}</li>
        {/* <li onClick={() => {setMenu("game")}}><Link style={{textDecoration: 'none'}} to='/MyProduct'>Game</Link> {menu==="game"? <hr/>:<></>}</li> */}
      </ul>
      <div className="nav-login-cart">
        <Link to='/LoginSignup'><button>Login</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="" width={45} /></Link>
        <div className="nav-cart-count">0</div>
        <div className="nav-menu">
        <li onClick={() => {setMenu("profile")}}><Link style={{textDecoration: 'none'}} to='/Profile'>Profile</Link>{menu==="profile"? <hr/>:<></>}</li>
        </div>
        {/* <Link to='/Logout'>Logout</Link> */}
        
      </div>
    </div>
  )
}

export default Navbar

