import React, { useState, useEffect } from "react";
import axios from "axios";
import './Profile.css'
import Swal from 'sweetalert2';

const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {

    
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        console.log("Fetched user:", response.data); // เพิ่มบรรทัดนี้เพื่อดูข้อมูลที่ได้รับ
        
        setUser(response.data);
        setFormData({
          firstname: response.data.firstname,
          email: response.data.email,
          password: response.data.password, // Do not pre-fill the password field
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
    
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/profile/${user.userid}`, {
        id: user.userid,
        firstname: formData.firstname,
        email: formData.email,
        password: formData.password,
      });

      setUser(response.data);

      // Update state with response data
      // setUser({
      //   ...user,
      //   firstname: response.data.data.firstname,
      //   email: response.data.data.email,
      //   password: response.data.data.password,
      // });

      // // Clear the password field
      // setFormData({
      //   ...formData,
      //   password: "", // Password field should be cleared after update
      // });

      setIsEditing(false);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };


  const handleDelete = async () => {
    try {
      // if (!user.userid) {
      //   console.error("ไม่มีข้อมูล user ID สำหรับการลบ");
      //   return;
      // }
  
      const response = await axios.delete(`/profile/${user.userid}`);
      console.log(response);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
  
      console.log("ลบโปรไฟล์สำเร็จ!");
      setUser(response.data);
      setFormData({
        firstname: "",
        email: "",
        password: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการลบโปรไฟล์:", error);
    }
  };

  

  return (
    <div className="forms">
<div className="container">
      <h2>User Profile</h2>
      <form className="upAndDe">
        <label className="label">
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label className="label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        <label className="label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </label>
        <br />
        {!isEditing ? (
          <div className="btn-up-de">
          <button className="blue-btn" type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
           <button className="red-btn" type="button" onClick={handleDelete}>
           Delete
         </button>
         </div>
        ) : (
   
            <button className="button" type="button" onClick={handleUpdate}>
              Update
            </button>
  
        )}
      </form>
    </div>
    </div>
    
  );
};

export default Profile;
