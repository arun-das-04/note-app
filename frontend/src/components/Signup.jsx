import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../stylesheets/Login.css';
import toast from "react-hot-toast";

const Signup = () => {

  // Use State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  // For OTP screen
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState(null);

  const navigate = useNavigate();
  const authInfo = useRef();

  // When Signup button is Clicked
  const handleSignUp = () => {

    // if Input fields are ok
    if(email!='' && password!='' && confirmPassword!='' && name!='' && password===confirmPassword){
      
      // Check if email already in use
      fetch(`${import.meta.env.VITE_API_URL}/varifyemail`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      })
      .then(response => response.json())
      .then((data) => {
        if(data.code==200){
          if(!isOtp){

        // Sent Otp
        fetch(`${import.meta.env.VITE_API_URL}/requestotp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
          })
        })
        .then(response => response.json())
        .then((data) => {
          if(data.code==200){
            toast.success(data.message);
          }
          else{
            toast.error(data.message);
          }
        })

        setIsOtp(true);
      }
        }
        else{
          toast.error(data.message);
        }
      })
      

    }

    // if some fields are not ok
    else {
      if(email==''){
        toast('Please Provide a valid Email', {
          icon: '⚠️',
        });
      }
      else if(password==''){
        toast('Please Provide a valid password', {
          icon: '⚠️',
        });
      }
      else if(confirmPassword==''){
        toast('Please Provide same confirm password', {
          icon: '⚠️',
        });
      }
      else if(name==''){
        toast('Please Provide a valid name', {
          icon: '⚠️',
        });
      }
      else if(password!=confirmPassword){
        toast('Both Password Must be Same', {
          icon: '⚠️',
        });
      }
    }
  };

  // if Otp button is clicked
  const handleOtpBtn = () => {
    fetch(`${import.meta.env.VITE_API_URL}/varifyotp`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTP: otp,
        email: email
      })
    })
    .then(response => response.json())
    .then((data) => {
      if(data.code==200){
        toast.success(data.message);

        // Save user to Database
        
        fetch(`${import.meta.env.VITE_API_URL}/adduser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);

            if (data.code == 200) {
              // console.log(data);
              toast.success(data.message);
              navigate("/auth");

            } else {
              // authInfo.current.innerText = data.message;
              // console.log(data.message);
              toast.error(data.message);
            }
          })
          .catch((err) => {
            // console.log(err);
            toast.err(err.message);
          });

        
      }
      else{
        toast.error(data.message);
      }
    })
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
  else{

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

  }
  
};

export default Signup;
