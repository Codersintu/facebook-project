import { useContext, useRef } from "react";
import "./login.css";
import {loginCall} from '../../apiCall'
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core"

export default function Login() {
  const email=useRef();
  const password=useRef()

  const {user,isFetching,error,dispatch}=useContext(AuthContext)
  const handleClick=(e)=>{
    e.preventDefault();
   loginCall(
    {email:email.current.value, password:password.current.value},
    dispatch
  )
  };

  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input 
            placeholder="Email" 
            type="Email" 
            required 
            ref={email} 
            className="loginInput" 
            />
            <input 
            placeholder="Password" 
            required 
            minLength={6}
            ref={password} 
            type="password" 
            className="loginInput" 
            />
            <button className="loginButton" disabled={isFetching}>{isFetching ? <CircularProgress color="white"/> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
            {isFetching ? <CircularProgress color="white"/> : "Create a New Account"}
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}