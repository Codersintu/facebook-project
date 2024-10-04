import React from 'react'
import './Closefriend.css'
import adimg1 from "../../assets/1.jpeg";

function Closefriend({user}) {
  return (
    <li className="sidebarfriend">
   <img src={adimg1} className="sidebarfriendimg" alt="" />
   <span className='sidebarfriendname'>{user.username}</span>
  </li>
  )
}

export default Closefriend