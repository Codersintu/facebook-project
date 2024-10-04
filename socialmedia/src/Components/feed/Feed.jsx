import React, { useContext, useId } from 'react'
import { useState,useEffect } from "react";
import "./Feed.css";
import Share from '../Share/Share';
import Post from '../Post/Post';
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';


function Feed({username}) {
 const [posts,setPosts] =useState([]);
  const {user} =useContext(AuthContext)

 useEffect(()=>{
  const fetchPosts=async ()=>{
    const res= username
    ? await axios.get("http://localhost:8801/api/post/profile/"+username)
    :await axios.get("http://localhost:8801/api/post/timeline/" + user._id)

    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );     
  console.log(res);
  }
  fetchPosts();
 },[username,user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((p) => <Post key={p._id || p.id} post={p} />)
      ) : (
        <p>No posts available</p>
      )}
      </div>
    </div>
  );
}

export default Feed;
