import React, { useEffect } from "react";
import usersApi from "../../api/users";
import axios from "axios";

export default function AddUser() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/users/addUser',  {data})
    .then(response => {
      console.log(response.data);
      }).catch
      (error => {
        console.error(error);
        });

  
}

// useEffect(()=>{
//   axios.get("http://localhost:3000/api/users").then((res) => {
//     setName(res.data.data.users)
//     console.log(res.data.data.users[0])
//     });
//     },[]);

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
              type="email"
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
