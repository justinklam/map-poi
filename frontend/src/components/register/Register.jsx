import { useState } from "react";
import "./register.css";

// MUI
import { Room } from "@material-ui/icons";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
        {success && (
          <span className="success">
            Credentials Accepted! You may login now!
          </span>
        )}
        {error && <span className="failure">Credentials Denied!</span>}
      </form>
    </div>
  );
};

export default Register;
