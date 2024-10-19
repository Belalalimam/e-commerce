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

  async function handleSubmit(e) {
    e.preventDefault();
    try {
    axios.get("http://localhost:3000/api/users").then((res) => {
      setName(res.data.data.users[0])
      console.log(res.data.data.users)
    });
    
  } catch (error) {
    if  (error.response && error.response.status >= 400 && error.response.status < 500)  {
      console.log(error.response.data)
    } 
    
  }
  
}

useEffect(()=>{
  axios.get("http://localhost:3000/api/users").then((res) => {
    setName(res.data.data.users.map((e)=>{
      return <>
      <h1>{e._id}</h1>
      <h1>{e.email}</h1>
      <h1>{e.role}</h1>
      </>
    }))
    console.log(res.data.data.users[0])
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