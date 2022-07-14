import { useRef, useState } from "react";
import "./register.css";

// MUI
import { Room } from "@material-ui/icons";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        Map-POI
      </div>
      <form>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
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
