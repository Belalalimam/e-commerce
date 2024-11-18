import React, { useEffect } from "react";
import usersApi from "../../../api/users";
import axios from "axios";

export default function Login() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit =  async (e) => {
    e.preventDefault();
    
        const res =  await axios.post("http://localhost:3000/api/users/login", data);
        console.log(res.data.data.user.token);
        console.log(res.data.data.user._id);
        localStorage.setItem("token", res.data.data.user.token);
        localStorage.setItem("_id", res.data.data.user._id);
        window.location.href = "/getUser";
        window.location.href = "/getUsers";
        alert("User added successfully");
        
        }

      



        


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">
              password
            </label>
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="password"
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
