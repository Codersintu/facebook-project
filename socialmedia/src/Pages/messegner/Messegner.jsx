import React, { useContext, useEffect, useRef, useState } from 'react'
import { Topbar } from '../../Components/Topbar/Topbar'
import './messenger.css'
import { Conversation } from '../../Components/conversation/Conversation'
import { Message } from '../../Components/message/Message'
import { ChatOnline } from '../../Components/chatOnline/ChatOnline'
import axios from 'axios'
import {AuthContext} from '../../context/AuthContext'
import {io} from 'socket.io-client'



function Messegner() {

   const {user}=useContext(AuthContext)
   const [conversation,setConversation]=useState([])
   const [currentChat,setCurrentChat] =useState()
   const [messages,setMessages]=useState([])
   const [newMessage,setNewMessage] =useState([])
   const socket =useRef()
   const scrollRef = useRef()
   const [arrivalMessage, setArrivalMessage] = useState(null);
   

   useEffect(() => {
      socket.current = io("ws://localhost:8802");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    }, []);

    useEffect(() => {
      arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

  useEffect(() => {
   socket.current.emit("addUser",user._id)
   socket.current.on("getUsers",users=>{
       setOnlineUsers(
         user.followings.filter((f) => users.some((u) => u.userId === f))
       );
   })
  },[user]);



   useEffect(()=>{
     const getconversation=async()=>{
       try {
         const res=await axios.get("http://localhost:8801/api/conversation/" + user._id)
         console.log(res)
         setConversation(res.data);
         
       } catch (error) {
         console.log(error)
       }
     }
     getconversation()
   },[user._id])

   useEffect(() => {
      const getMessages = async () => {
         try {
            const res=await axios.get("http://localhost:8801/api/message/" + currentChat?._id)
            setMessages(res.data)
         } catch (error) {
            console.log(error)
         }
      };
      getMessages();
   },[currentChat])
   

   const handleSubmit=async(e) =>{
      e.preventDefault();
      const message = {
         sender: user._id,
         text: newMessage,
         conversationId: currentChat._id
      }

      const receiverId = currentChat.members.find(
         (member) => member !== user._id
       );
   
       socket.current.emit("sendMessage", {
         senderId: user._id,
         receiverId,
         text: newMessage,
       });
      try {
         const res = await axios.post("http://localhost:8801/api/message/",message);
         setMessages([...messages,res.data])
         setNewMessage("")
      } catch (error) {
         console.log(error)
      }
    }
    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])
  return (
     <>
     <Topbar/>
     <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
               <input type="text" placeholder='search friends' className='chatMenuInput' />
              {conversation.map((c)=>(
                <div onClick={()=>setCurrentChat(c)}>
                  <Conversation conversation={c} key={c._id} currentUser={user}/>
                </div>
              ))}
            </div>
        </div>
        <div className="chatBox">
         <div className="chatBoxWrapper">
            {currentChat ? (
               <>
            <div className="chatBoxTop">
            {messages.map((m) => (
               <div ref={scrollRef}>
                 <Message message={m} key={m._id} own={m.sender === user._id}/>
                 </div>
            ))}
             </div>
          <div className="chatBoxBottom">
            <textarea 
            className='chatMessageInput' 
            placeholder='write something...'
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            ></textarea>
            <button className="chatSubmitbtn" onClick={handleSubmit}>send</button>
          </div>
          </>
            ) : (
               <span className="noconversation">Open a conversation to start a chat</span>
            )}
        </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                  <ChatOnline/>
            </div>
        </div>
     </div>
     </>
  )
}

export default Messegner