import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Base from "../core/Base";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("Sign in failed"));
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2> Loading....</h2>
        </div>
      )
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

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };
    
    
//  <div className="flex items-center justify-center m-2">
//    <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
//      <form>
//        <div className="form-group mb-4">
//          <label className="text-blue-800">Name</label>
//          <input
//            className="form-control border-b-2 border-blue-800 w-full"
//            onChange={handleChange("name")}
//            type="text"
//            value={name}
//          />
//        </div>
  
     
//      </form>
//    </div>
//  </div>;
  const signInForm = () => {
    return (
      <div className="flex items-center justify-center m-2">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <form>
            <div className="form-group mb-4">
              <label className="text-blue-800">Email </label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control border-b-2 border-blue-800 w-full"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-blue-800"> Password </label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control border-b-2 border-blue-800 w-full"
                type="password"
              />
            </div>
            <div className="form-group d-grid mt-4">
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

  return (
    <Base title="Sign In Page" description="A page that helps to Sign In">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
