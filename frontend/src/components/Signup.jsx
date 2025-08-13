import '../stylesheets/Login.css';
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import userSignupHook from "../hooks/userSignupHook";

import { IoIosArrowBack } from "react-icons/io";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";


const Signup = () => {

  // Objects 
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);



  // On Change OTP
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if(value && index < 5) {
      inputRefs.current[index+1].focus();
    }
  }

  // On backspace Click
  const handleOtpBackspace = (e, index) => {
    if(e.key === 'Backspace') {
      e.preventDefault();

      const newOtp = [...otp];

      if(newOtp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      }

      else if (index > 0) {
        inputRefs.current[index -1].focus();

        newOtp[index-1] = '';
        setOtp(newOtp);
      }
    }
  }


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

  // Handle OTP button Click
  const handleOtpSubmit = async () => {
    const joinedOtp = otp.join("");
    if(joinedOtp) {
        const data = await varifyOtp(joinedOtp, email);
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

          <button className='auth-back-btn'><IoIosArrowBack/></button>

          <div className='auth-headings'>
          <h3 className="auth-main-heading">Create Account</h3>
          <p className='auth-sub-heading'>Fit your information bellow and register<br/> to your note account</p>
          </div>

          <div className='auth-input-section'>
            <label className='auth-label'>Name</label>
            <input
              placeholder="Enter Your Name"
              type="text"
              className="auth-input"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className='auth-input-section'>
            <label className='auth-label'>Email</label>
            <input
              placeholder="Enter Your Email"
              type="email"
              className="auth-input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          
          <div className='auth-input-section'>
            <label className='auth-label'>Password</label>
            <div className='auth-password-section'>
              <input
                placeholder="Enter Your password"
                type={showPassword? 'text' : 'password'}
                className="auth-input"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button 
                className='password-action-btn'
                onClick={() => setShowPassword(!showPassword)}>{showPassword? <FaRegEyeSlash/> : <FaRegEye/>}</button>
            </div>
          </div>


          <div className='auth-input-section'>
            <label className='auth-label'>Confirm Password</label>
            <div className='auth-password-section'>
              <input
                placeholder="Enter Confirm password"
                type={showConfirmPassword? 'text' : 'password'}
                className="auth-input"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <button 
                className='password-action-btn'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword? <FaRegEyeSlash/> : <FaRegEye/>}</button>
            </div>
          </div>

          <div className='auth-input-terms'>
            <input
              className='auth-input-checkbox'
              type='checkbox'
            />
            <label className='auth-label auth-terms'>Agree with <span>Terms & Condition</span></label>
          </div>

          <button className="auth-btn" onClick={handleSignUp}> Sign Up </button>
          <p className='auth-transport'>Already have an Account? <Link to="/auth"><span>Sign in</span></Link></p>
        </div>
    );

  }


  // Otp Screen
  return(
      <div className='auth-main'>
        <p>Varify OTP</p>
        <div className='auth-otp-section'>
          {otp.map((digit, index) => (
            <input 
              key={index}
              type='number'
              maxLength='1'
              className='auth-otp-input'
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleOtpBackspace(e, index)}
              ref={(e) => inputRefs.current[index] = e}
              />
          ))}
        </div>
        <button onClick={handleOtpSubmit}>Varify</button>
    </div>
    );
    
};

export default Signup;
