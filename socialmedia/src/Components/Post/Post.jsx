import React, { useState,useEffect, useContext } from 'react';
import './Post.css';
import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


function Post({ post }) {

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [like, setLike] = useState(post.likes.length); // Correctly uses the like state
  const [isLiked, setIsLiked] = useState(false);
  const [user,setUser] =useState({});
  const {user:currentUser} = useContext(AuthContext)
  

  useEffect(()=>{
    console.log("Post userId:", post.userId);
    const fetchUser=async ()=>{
      const res= await axios.get(`http://localhost:8801/api/users/?userId=${post.userId}`)
      setUser(res.data)
    console.log(res);
    console.log(post.userId)

    }
    fetchUser();
   },[post.userId])
 
  const likeHandler = () => {
    try {
      axios.put(`http://localhost:8801/api/post/${post_Id}/like`,{userId:currentUser._id})
    } catch (error) {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    }
   
  };
  
  return (
    <div className="post">
      <div className="postwrapper">
        <div className="postTop">
          <div className="postTopleft">
            <Link to={`profile/${user.username}`}>
            <img src={user.profilePicture ? PF + user.profilePicture : PF + "assets/318.jpg"} className="postprofileimg" alt="" />
            </Link>
            <span className="postusername">
            { user.username }
            </span>
            <span className="posttime">{format(post.createdAt)}</span>
          </div>
          <div className="postTopright">
            <MoreVert />
          </div>
        </div>
        <div className="postcenter">
          <span className="postdescription">{post?.desc}</span>
          <img className="postimg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomleft">
            <img className="likeIcon" src={`${PF}/assets/like.png`} onClick={likeHandler} alt="like" />
            <img className="likeIcon" src={`${PF}/assets/heart.png`} onClick={likeHandler} alt="heart" />
            <span className="likeCount">{like} and other</span> {/* Updated to use the like state */}
          </div>
          <div className="postBottomright">
            <span className="postcomment">{post.comment || 0} Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
