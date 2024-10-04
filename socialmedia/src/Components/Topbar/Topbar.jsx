import React, { useContext } from 'react'
import "./Topbar.css";
import { Person,Search,Chat,Notifications } from '@mui/icons-material'
import {AuthContext} from '../../context/AuthContext'
import { Link } from 'react-router-dom';


export function Topbar() {
    const {user}=useContext(AuthContext)
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;

    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">facebook</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Link to="/messenger" style={{ color: "inherit", textDecoration: "none" }}>
              <Chat />
              </Link>
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
            
          </div>
          
          <Link to={`/profile/${user.username}`}>
            <img className="topbarimg" src={user.profilePicture ? PF + user.profilePicture : PF + "assets/318.jpg"} alt="Profile" />
          </Link>
        
        </div>
        
      </div>
    )
}
