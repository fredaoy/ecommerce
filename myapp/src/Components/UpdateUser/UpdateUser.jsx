import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [update, setUpdate] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // เพิ่มฟิลด์อื่น ๆ ตามต้องการ
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setUpdate(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          // ตั้งค่าเริ่มต้นของฟิลด์อื่น ๆ ตามต้องการ
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
      const response = await axios.put(`/profile/${update.id}`, formData);
      setUpdate(response.data);
      setIsEditing(false);
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`/profile/${update.id}`);
  //     setUpdate({});
  //     setFormData({
  //       name: '',
  //       email: '',
  //       // เคลียร์ฟิลด์อื่น ๆ ตามต้องการ
  //     });
  //     console.log("Profile deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting profile:", error);
  //   }
  // };

  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Update Profile</h2>
          <div>
            <label>
              ชื่อ:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              อีเมล:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* เพิ่มฟิลด์อื่น ๆ ตามต้องการ */}
          <button onClick={handleUpdate}>บันทึกการเปลี่ยนแปลง</button>
          <button onClick={() => setIsEditing(false)}>ยกเลิก</button>
          {/* <button onClick={handleDelete}>ลบโปรไฟล์</button> */}
        </div>
      ) : (
        <div>
          <button onClick={() => setIsEditing(true)}>Update</button>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
