import React from "react";

const RegisterBS = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    // const email = event.target.exampleInputEmail1.value;
    const password = event.target.password.value;
    console.log(email, password);
    // console.log(event)
    // console.log(email)
  };

  return (
    <div className="w-50 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email" 
            className="form-control"
            id="exampleInputEmail1" name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <input
            type="password" name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">
            Accepts all terms and conditions
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterBS;
