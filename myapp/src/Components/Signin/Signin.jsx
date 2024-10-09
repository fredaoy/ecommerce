import "../Signup/Signup.css";
import React, { useState } from "react";
import axios from "axios";
import SigninValidation from "./SigninValidation";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signin = () => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate()
  // axios.defaults.withCredentials = true

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = SigninValidation({ firstname, email, password });
    setError(validationError);
  
    try {
      const response = await axios.post("/login", { firstname, email, password });
      console.log(response.status);
      console.log(response.data);
      // setMessage(response.data);

      Swal.fire({
        title: "Success!",
        text: "You signed in successfully!",
        icon: "success",
      });
      navigate('/Profile')

    } catch (error) {
      console.error(error);
      if (error.response) {
        // setMessage(error.response.data);
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || "Something went wrong!",
          icon: "error"
        });
      } else {
        // setMessage(error.message);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error"
        });
      }
    }
  };
  

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h1>LOGIN</h1>
        <div className="input-group">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter Firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
          {error.firstname && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "-7px" }}>
              {error.firstname}
            </span>
          )}
        </div>
  
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <span style={{ color: "red", fontSize: "12px", marginTop: "-7px" }}>
              {error.email}
            </span>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
          <span style={{ color: "red", fontSize: "12px", marginTop: "-7px" }}>
              {error.password}
            </span>
          )}
        </div>
        <div className="btn">
          <button type="submit">Create Account</button>
        </div>
        
        <div className="btn-login">
          <p>Do you have an Account ?<Link to='/LoginSignup'> SignUp </Link></p>
          {/* <p>Message from the server: {message}</p> */}
        </div>


        
      </form>
    </div>
  );
};

export default Signin;