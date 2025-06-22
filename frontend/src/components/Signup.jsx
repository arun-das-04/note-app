import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEnmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const authInfo = useRef();

  const handleSignUp = () => {
    console.log(email);
    console.log(name);
    console.log(password);

    fetch(`${import.meta.env.VITA_API_URL}/adduser`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    })
      .then((Response) => Response.json())
      .then((data) => {
        console.log(data);

        if (data.code == 200) {
          navigate("/");
        } else {
          authInfo.current.innerText = data.message;
          console.log(err.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="Signup-main">
        <h3 id="Signup-heading">Signup Here</h3>
        <input
          placeholder="Enter Your Email"
          type="email"
          className="Signup-input"
          onClick={(e) => {
            setEnmail(e.target.value);
          }}
        />

        <input
          placeholder="Enter Your Name"
          type="text"
          className="Signup-input"
          onClick={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          placeholder="Enter Your password"
          type="Password"
          className="Signup-input"
          onClick={(e) => {
            setPassword(e.target.value);
          }}
        />

        <span id="auth-info" ref={authInfo}>
          ...
        </span>
        <button id="signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
