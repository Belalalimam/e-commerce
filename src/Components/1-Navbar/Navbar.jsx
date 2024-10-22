import React from 'react'
import HeaderNav from './HeaderNav'
import MedialNav from './MedialNav'
import CategoryNav from './CategoryNav'
import AddUser from  './AddUser'
import Login from  './Login'
import GetUsers from  './GetUsers'
import  EditUser from  './EditUser'
import  DeleateUser from  './DeleateUser'
import  GetUser from  './getUser'


import {Routes, Route} from  'react-router-dom'


export default function Navbar() {
  return (
    <>
    

      <HeaderNav />
      <MedialNav />
      <CategoryNav />
      {/* <ResponsiveAppBar /> */}


      <Routes>
        <Route path="/addUser" element={< AddUser />} />
        <Route path="/Login" element={< Login />} />
        <Route path="/getUsers" element={< GetUsers />} />
        <Route path="/editUser" element={< EditUser />} />
        <Route path="/deleteUser" element={<DeleateUser />} />
        <Route path="/getUser" element={<GetUser />} />
      </Routes>
      
    </>
  )
}
