import React, { useState, useRef } from "react";
import "../stylesheets/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authInfo = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuthBtn = () => {
    console.log(email);
    console.log(password);

    fetch(`${import.meta.env.VITE_API_URL}/userlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.code == 200) {
          console.log(data);
          navigate("/");

        } else if (data.code == 404) {
          authInfo.current.innerText = data.message;

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
    <div>
      <div className="auth-main">
        <h3 id="auth-heading">Login Here</h3>

        <input
          placeholder="Enter your email"
          type="email"
          className="auth-input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <input
          placeholder="Enter your password"
          type="password"
          className="auth-input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <span id="auth-info" ref={authInfo}></span>
        <button id="auth-btn" onClick={handleAuthBtn}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;