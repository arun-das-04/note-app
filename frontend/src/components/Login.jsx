import "../stylesheets/Login.css";
import { useEffect, useRef, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setUser } from "../store/slices/userSlice.js";
import userLoginHook from "../hooks/userLoginHook";
import toast from "react-hot-toast";

import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const userLogin = userLoginHook();

  // handle Login Btn Click
  const handleAuthBtn = async () => {

    if(email && password) {
        const data = await userLogin( email, password );
        
        if(data.ok){
          dispatch(setUser({
            userid: data.userData._id,
            userName: data.userData.name,
            islogged: true,
          }));

          setTimeout(() => {
            navigate('/notes');
          }, 1000)
        }
    }
    else {
      if(!email) { toast.error("Enter an email") }
      else if(!password) { toast.error("Enter your Password") }
    }
  }


  return (
    <div>
      <div className="auth-main">
        <h3 id="auth-heading">Login Here</h3>

        <input
          placeholder="Enter your email"
          type="email"
          className="auth-input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className='auth-password-section'>
        <input
          placeholder="Enter your password"
          type={showPassword? 'text' : 'password'}
          className="auth-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id='password-action-btn' onClick={() => setShowPassword(!showPassword)}>{showPassword? <FaRegEyeSlash/> : <FaRegEye/>}</button>
        </div>

        <button id="auth-btn" onClick={handleAuthBtn}>
          Submit
        </button>

        <p className='auth-create'>Don't have an Account? 
          <Link to="/auth/signup"><span>Create One</span></Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

