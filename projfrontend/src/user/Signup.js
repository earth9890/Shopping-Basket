import React, { useState } from "react"
import Base from "../core/Base"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"
// ...

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in Sign up"));
  };

const signUpForm = () => {
  return (
    <div className="flex items-center justify-center m-2">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <form>
          <div className="form-group mb-4">
            <label className="text-blue-800">Name</label>
            <input
              className="form-control border-b-2 border-blue-800 w-full"
              onChange={handleChange("name")}
              type="text"
              value={name}
            />
          </div>
          <div className="form-group mb-4">
            <label className="text-blue-800">Email</label>
            <input
              className="form-control border-b-2 border-blue-800 w-full"
              onChange={handleChange("email")}
              type="email"
              value={email}
            />
          </div>
          <div className="form-group mb-4">
            <label className="text-blue-800">Password</label>
            <input
              className="form-control border-b-2 border-blue-800 w-full"
              onChange={handleChange("password")}
              type="password"
              value={password}
            />
          </div>
          <div className="form-group d-grid mt-4 text-center">
            <button
              onClick={onSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full block focus:outline-none focus:shadow-outline-blue mx-auto w-max"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "None" }}
          >
            New Account was Created Successfully.
            Please  <Link to="/signin" className="text-blue-800"> Login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "None" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page" description="A page that helps to Sign Up">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signup;
