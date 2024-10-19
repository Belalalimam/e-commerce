import React from 'react'
import HeaderNav from './HeaderNav'
import MedialNav from './MedialNav'
import CategoryNav from './CategoryNav'
import AddUser from  './AddUser'
import Login from  './Login'
import GetUsers from  './GetUsers'

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
      </Routes>
      
    </>
  )
}
