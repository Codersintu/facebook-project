import React from 'react'
import './message.css'
import {format} from 'timeago.js'

export function Message({message,own}) {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img className='messageImg' src={PF + "assets/8.jpeg"} alt="" />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

