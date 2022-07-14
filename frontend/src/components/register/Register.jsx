import React from "react";
import "./register.css";

// MUI
import { Room } from "@material-ui/icons";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        Map-POI
      </div>
      <form>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button className="registerBtn">Register</button>
        <span className="success">
          Credentials Accepted! You may login now!
        </span>
        <span className="failure">Credentials Denied!</span>
      </form>
    </div>
  );
};

export default Register;
