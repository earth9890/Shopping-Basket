import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";
import "../index.css";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3 m-2" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Backend request fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
        }
      })
      .catch();
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-blue-800 m-2">Category Created Successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-red m-2">Error while creating category</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group m-2">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control rounded text-center border border-blue-800 m-1"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For ex. Summer"
        />
        <button
          onClick={onSubmit}
          className="rounded-full mb-4 mt-4 bg-blue-500 text-sm py-2 px-4 text-white"
        >
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new t-shirts"
      className="container bg-blue-300  p-4 text-blue-800"
    >
      <div className="row bg-white">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {myCategoryForm()}
          {successMessage()}
          {warningMessage()}
        </div>
      </div>
    </Base>
  );
}
