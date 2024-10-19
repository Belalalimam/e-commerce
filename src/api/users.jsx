import http from "./http";

const apiurl = `http://localhost:3000/api/users/addUser`

const creatUsers = data => http.post(apiurl, data)

const usersApi =  {creatUsers }

export default usersApi
