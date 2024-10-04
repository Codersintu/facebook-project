import React from 'react'
import './chatOnline.css'

 export function ChatOnline() {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <div className="chatOnline">
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src={PF + "assets/318.jpg"} alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">Sintu Roy</span>
        </div>
    </div>
  )
}

