import React, { useEffect } from "react";
import usersApi from "../../../api/users";
import axios from "axios";

export default function DeleateUser() {


  const handleSubmit = async (e) => {

    
    try {
        
        const JWT = localStorage.getItem("token");      
        const Id = localStorage.getItem("_id");

      await axios.delete(`http://localhost:3000/api/users/${Id}?authorization=Bearar ${JWT}`);
      // alert("User added successfully");
    } catch (error) {
      alert(error.response.data.message);
      console.log("🚀 ~ handleSubmit ~ error:", error)
    }

  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>delete user</h1>
        <form action="" onSubmit={handleSubmit}>
          

          <button className="btn btn-primary" type="submit">
            Submit Del confirme
          </button>
        </form>
      </div>
    </div>
  );
}
