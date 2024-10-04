import React, { useContext, useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios'

export function Conversation({conversation,currentUser}) {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
    const [user,setUser]=useState(null);
    

    useEffect(() =>{
      const friendId=conversation.members.find((m) => m !== currentUser._id);

      const getUser = async() =>{
        try {
          const res=await axios('http://localhost:8801/api/users/?userId=' + friendId);
          setUser(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    },[currentUser,conversation])
   
  return (
    <div className="conversation">
        <img className='conversationImg' src={user?.profilePicture ? PF + user.profilePicture : PF + "assets/7.jpeg"} alt="" />
        <span className='conversationName'>{user?.username}</span>
    </div>
  )
}

