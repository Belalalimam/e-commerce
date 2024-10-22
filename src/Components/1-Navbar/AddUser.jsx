import React, { useEffect } from "react";
import usersApi from "../../api/users";
import axios from "axios";

export default function AddUser() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    role:"",
    name: "",
    age:""
  });

  const handleSubmit =  async (e) => {
    e.preventDefault()

        const res =  await axios.post("http://localhost:3000/api/users/addUser", data);
        console.log(res.data);
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
        <h1>Adduser</h1>
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
          <div class="mb-3">
            <label for="exampleFormControlInput3" class="form-label">
              password
            </label>
            <input
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              type="text"
              className="form-control"
              id="exampleFormControlInput3"
              placeholder="role"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput4" class="form-label">
              name
            </label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              className="form-control"
              id="exampleFormControlInput4"
              placeholder="name"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput5" class="form-label">
              age
            </label>
            <input
              value={data.age}
              onChange={(e) => setData({ ...data, age: e.target.value })}
              type="number"
              className="form-control"
              id="exampleFormControlInput5"
              placeholder="age"
            />
          </div>
          {/* <div class="mb-3">
            <label for="exampleFormControlInput3" class="form-label">
              name
            </label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
              className="form-control"
              id="exampleFormControlInput3"
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
          </div> */}
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
