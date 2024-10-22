import React, { useEffect } from "react";
import usersApi from "../../api/users";
import axios from "axios";

export default function getUser() {
  const [name22, setName] = React.useState("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });


useEffect(()=>{
  const JWT =  localStorage.getItem("token");
  const _id =  localStorage.getItem("_id");

//   const  headers = {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${JWT}`
//     };
//     axios.get('http://localhost:3001/api/users', {headers})
//     .then(response => {
//         console.log(response.data);
//         setName(response.data.name);
//         setData(response.data);
//         })
//         .catch(error => {
//             console.error(error);
//             });
//             }, []);
//             return (
//                 <div>
//                     <h1>{name22}</h1>

//                 </div>



  axios.get(`http://localhost:3000/api/users/getUser/${_id}`).then((res) => {

    console.log(res.data.data.user._id);

    const e = res.data.data.user;
    
    console.log("🚀 ~ axios.get ~ e:", e)
    setName(
        <>
      <div style={{borderBlock:"2px solid red"}}>
      <h1>{e._id}</h1>
      <h1>{e.email}</h1>
      <h1>{e.role}</h1>
      <h1>{e.age}</h1>
      <h1>{e.name}</h1>
      <h1>{e.token}</h1>
      <img src={`/uploads/${e.avatar}`} alt="img" />
      <h1>{e.avatar}</h1>
      </div>
      </>
    );



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