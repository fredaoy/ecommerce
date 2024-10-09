import React from 'react';

// remove the unused import
// import React from 'react';
const SignupValidation = (values) => {

  let error = {}
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // const firstname_pattern = /^[a-zA-Z ]{2,50}$/; // simple validation for firstname

  if (values.firstname === "") {
    error.firstname = "กรุณากรอกชื่อ"
  // } else if (!firstname_pattern.test(values.firstname)) {
  //   error.firstname = "ชื่อต้องเป็นตัวอักษรและไม่เกิน 50 ตัว"
  } else {
    error.firstname = ""
  }

  if (values.lastname === "") {
    error.lastname = "กรุณากรอกนามสกุล"
  } else {
    error.lastname = ""
  }


  if (values.email === "") {
    error.email = "กรุณาใส่ email"
  }else if(!email_pattern.test(values.email)) {
    error.email = " ไม่พบ email นี้"
  }else{
    error.email = ""
  }


  if (values.password === "") {
    error.password = "กรุณาใส่ password"
  }else if(!password_pattern.test(values.password)) {
    error.password = "กรุณาใส่รหัสผ่าน A-z 0-9 และ อักษรอักขระ"
  }else{
    error.password = ""
  }

  return error;
}

export default SignupValidation