import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile  } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("")

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
      event.preventDefault();
      setSuccess('')
      setRegisterError('')
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
        setRegisterError('please enter at least two upper case')
        return;
    }
    else if (!/(?=.*\d)/.test(password)){
        setRegisterError('please enter at least one digit')
        return;
    }
    else if (!/(?=.{8,})/.test(password)){
        setRegisterError('please enter at least eight charecter')
        return;
    }

    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // Signed in
        const loggedUser = result.user;
        // ...
        console.log(loggedUser);
        setRegisterError(" ");
        setSuccess('Registration successful')
        emailVarification(loggedUser);
        updateUserName(result.user, name)
      })
      .catch((error) => {
        console.error(error.message);
        setRegisterError(error.message);
        // ..
      });
      event.target.reset()
  };

  const emailVarification = (loggedUser) => {
    sendEmailVerification(loggedUser)
  .then((result) => {
    // Email verification sent!
    // ...
    console.log(result);
    alert('Verify your email')
  });

  }

  const updateUserName = (user, name) => {
    updateProfile(user, {
        displayName: name
      }).then(() => {
        // Profile updated!
        // ...
        console.log('user profile updated')
      }).catch((error) => {
        // An error occurred
        // ...
        setRegisterError(error.message)
      });
  }

  const handleEmailChange = (event) => {
    // console.log(event)
    setEmail(event.target.value);
  };

  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className="w-50 mx-auto">
      <h3 className="my-4 mx-auto w-50">Please Register</h3>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <input
          className="mb-3 ps-2 rounded"
          
          type="text"
          name="neme"
          id="name"
          placeholder="Your Name" required
        />{" "}
        <br />
        <input
          className="mb-3 ps-2 rounded"
          onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Your email" required
        />{" "}
        <br />
        <input
          className="mb-3 ps-2 rounded"
          onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="Password" required
        />{" "}
        <br />
        <input className="btn btn-primary" type="submit" value="Register" />
      </form>
      <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
      
        <p className="text-danger">{registerError}</p>
        <p className="text-success">{success}</p>
    </div>
  );
};

export default Register;
