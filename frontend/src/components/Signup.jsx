import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../stylesheets/Login.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const authInfo = useRef();

  const handleSignUp = () => {
    console.log(email);
    console.log(name);
    console.log(password);

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
        console.log(data);

        if (data.code == 200) {
          console.log(data);
          navigate("/");

        } else {
          authInfo.current.innerText = data.message;
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            setPassword(e.target.value);
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
};

export default Signup;
