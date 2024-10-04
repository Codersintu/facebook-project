import React from 'react'
import "./online.css"
import adimg2 from "../../assets/10.jpeg"

function Online({user}) {
  return (
    <div>
         <li className="online">
           <div className="rightbarprofileimg">
           <img className='onlineimg' src={adimg2} alt="" />
           </div>
            <span className='greenbar'></span>
          <span className='onlinefriendname'>{user.username}</span>
            </li>

           
    </div>
  )
}

export default Online