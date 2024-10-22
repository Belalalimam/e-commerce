import React, { useEffect } from "react";
import usersApi from "../../api/users";
import axios from "axios";

export default function AddUser() {
  const [name22, setName] = React.useState("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });


useEffect(()=>{
  const JWT =  localStorage.getItem("token");

  axios.get(`http://localhost:3000/api/users?authorization=Bearar ${JWT}`).then((res) => {

    setName(res.data.data.users.map((e)=>{
      // console.log(e)
      return <>
      <div style={{borderBlock:"2px solid red"}}>
      <h1>{e._id}</h1>
      <h1>{e.email}</h1>
      <h1>{e.role}</h1>
      <h1>{e.age}</h1>
      <h1>{e.name}</h1>
      <h1>{e.token}</h1>
      <img src={`${e.avatar}.png`} alt="img" />
      <h1>{e.avatar}</h1>
      </div>
      </>
    }))
    // console.log(res.data.data.users[0])
    });
    },[]);

  return (
    <>
      <div>
        {name22}
      </div>
    </>
    );
    }

// import React from 'react'

// export default function GetUsers() {
//   return (
//     <div>GetUsers</div>
//   )
// }
