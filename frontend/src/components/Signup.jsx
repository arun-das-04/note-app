import '../stylesheets/Login.css';
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import userSignupHook from "../hooks/userSignupHook";


const Signup = () => {

  // Objects 
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState(null);

  // Refs
  const authInfo = useRef();


  // Functions for Signup Hook
  const {checkEmail, sendOtp, varifyOtp, addUser} = userSignupHook();

  // Handle signup button click
  const handleSignUp = async () => {
    
    if(email && password && confirmPassword && name && password === confirmPassword){

        const data = await checkEmail(email);
        if(data.ok){
          setIsOtp(true);

          const data = await sendOtp(email);
          if(!data.ok){
             setIsOtp(false);
          }

        }
    }
    else{
      if(!email) { toast.error("Provide a valid Email") }
      else if (!password) { toast.error("Enter your Password") }
      else if (!name) { toast.error("Enter your Name") }
      else if (password !== confirmPassword) { toast.error("Password does not match") }
    }
  }

  // Handle Otp Button Click
  const handleOtpBtn = async () => {

    if(otp) {
        const data = await varifyOtp(otp, email);
        if(data.ok){
          const data = await addUser(email, password, name);

          if(data.ok){
            setIsOtp(false);
            navigate('/auth');
          }
        }  
    }
    else {
      toast.error("Enter your OTP");
    }
  }


  // Signup Screen
  if(!isOtp){
      return (
        <div className="auth-main">
          <h3 id="auth-heading">Signup Here</h3>
          <input
            placeholder="Enter Your Email"
            type="email"
            className="auth-input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            placeholder="Enter Your password"
            type="password"
            className="auth-input"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <input
            placeholder="Enter Confirm password"
            type="password"
            className="auth-input"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />

          <input
            placeholder="Enter Your Name"
            type="text"
            className="auth-input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <span id="auth-info" ref={authInfo}> </span>
          <button id="auth-btn" onClick={handleSignUp}> Sign Up </button>
          <p className='auth-create'>Already have an Account? <Link to="/auth"><span>Login here</span></Link></p>
        </div>
    );

  }


  // Otp Screen
  return(
      <div className='auth-main'>
        <p>Varify OTP</p>
        <input 
          placeholder='Enter OTP' 
          type='number'
          onChange={(e) => setOtp(e.target.value)}
          ></input>
        <button onClick={handleOtpBtn}>Varify</button>
    </div>
    );
    
};

export default Signup;
