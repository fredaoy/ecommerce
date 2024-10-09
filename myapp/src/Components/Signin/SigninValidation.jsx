import React from 'react';

const SigninValidation = (values) => {
  let error = {}

  // if (values.firstname === "") {
  //   error.firstname = "กรุณากรอกชื่อ"
  // } else {
  //   error.firstname = ""
  // }

  if (values.email === "") {
    error.email = "กรุณาใส่ email"
  }else{
    error.email = ""
  }


  if (values.password === "") {
    error.password = "กรุณาใส่ password"
  }else{
    error.password = ""
  }

  return error;

} 

export default SigninValidation;