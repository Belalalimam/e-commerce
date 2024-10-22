import React, { useEffect } from "react";
import usersApi from "../../api/users";
import axios from "axios";

export default function EditUser() {
  const [data, setData] = React.useState({
    name: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const JWT = localStorage.getItem("token");

    try {
      const Id = localStorage.getItem("_id");

      await axios.put(`http://localhost:3000/api/users/${Id}`, data);
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
        <h1>EditUser</h1>
        <form action="" onSubmit={handleSubmit}>
          
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              NAME
            </label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput4" class="form-label">
              age
            </label>
            <input
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              type="text"
              className="form-control"
              id="exampleFormControlInput4"
              placeholder="age"
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// import React from 'react'

// export default function AddUser() {
//   return (
//     <div>AddUser</div>
//   )
// }

// import React from 'react'

// export default function EditUser() {
//   return (
//     <div>EditUser</div>
//   )
// }
