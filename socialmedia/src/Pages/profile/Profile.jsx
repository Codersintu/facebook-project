import React,{useEffect,useState} from 'react'
import { Topbar } from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import "./profile.css"
import axios from 'axios'
import { useParams } from 'react-router'


  
function Profile() {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [user,setUser] =useState({});
  const username=useParams().username;

  useEffect(()=>{
    
    const fetchUser=async ()=>{
      const res= await axios.get(`http://localhost:8801/api/users/?username=${username}`)
      setUser(res.data)
    console.log(res);
    

    }
    fetchUser();
   },[])
  return (
    <>
    <Topbar />
    <div className="profile">
      <Sidebar />
      <div className="profileRight">
        <div className="profileRightTop">
          <div className="profileCover">
            <img
              className="profileCoverImg"
              src={user.coverPicture ? PF+user.coverPicture : PF + "assets/1.jpeg" }
              alt=""
            />
            <img
              className="profileUserImg"
              src={user.profilePicture ? PF + user.profilePicture : PF + "assets/318.jpg"}
              alt=""
            />
          </div>
          <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
          </div>
        </div>
        <div className="profileRightBottom">
          <Feed username={username}/>
          <Rightbar user={user}/>
        </div>
      </div>
    </div>
  </>
  )
}


export default Profile;