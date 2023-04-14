import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Form, Link } from "react-router-dom";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);
const Login = () => {

const emailRef = useRef()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (event) => {
    setError("");
    setSuccess("");
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(password, email);
    event.target.reset();
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Enter at least one upper case");
      return;
    } else if (!/(?=.*[!#$%&? "])/.test(password)) {
      setError("Enter at least one special character");
      return;
    } else if (!/(?=.{8,})/.test(password)) {
      setError("Password should have at least 8 character");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
        if (!user.emailVerified) {
          alert("you are not verified user");
        }

        setSuccess("Login successful");
        setError("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message);
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if(!email){
        alert('Please provide an valid email')
        return
    }
    console.log(email)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        alert('Check your email to reset password')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
// console.log(emailRef.current.value)
  return (
    <div className="w-50 mx-auto">
      <h3> this is login</h3>
      <form
        className="p-4 border rounded"
        style={{ width: "50%" }}
        onSubmit={handleLogin}
      >
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            required ref={emailRef}
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            name="password"
            className="form-control mb-2"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        <small>
          Forget password? please{" "}
          <button onClick={handleResetPassword} className="btn btn-link">
            Reset Password
          </button>
        </small>
      </p>
      <p>
        <small>
          New to this website? please <Link to="/register">Register</Link>
        </small>
      </p>
      <p className="text-danger">{error}</p>
      <p className="text-success">{success}</p>
    </div>
  );
};

export default Login;
