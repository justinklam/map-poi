import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="logo"></div>
      <form>
        <input type="text" placeholder="username" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
      </form>
    </div>
  );
};

export default Register;
