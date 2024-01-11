import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { updateCategory, getCategory } from "./helper/adminapicall";
import "../index.css";

export default function UpdateCategories() {
  const { categoryID } = useParams();
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    updatedCategory: "",
    error: "",
    success: false,
  });

  const { updatedCategory, error, success } = values;

  const preload = (categoryID) => {
    getCategory(categoryID).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          updatedCategory: data.name,
        });
        console.log(data);
      }
    });
  };

  useEffect(() => {
    preload(categoryID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryID]);

  const onSubmit = (event) => {
    event.preventDefault();
    updateCategory(categoryID, user._id, token, { updatedCategory }).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, updatedCategory: data.name, success: true });
        }
      }
    );
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      error: "",
      updatedCategory: event.target.value,
    });
  };

  const successMessage = () => (
    <div
      className="alert alert-success text-blue-800"
      style={{ display: success ? "" : "none" }}
    >
      {updatedCategory} updated successfully
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-warning text-red-"
      style={{ display: error ? "" : "none" }}
    >
      <h4 className="text-warning">Error occurred while updating Category </h4>
    </div>
  );

  const updateCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control rounded text-center text-black border border-blue-800"
          onChange={handleChange}
          value={updatedCategory}
          autoFocus
          required
          placeholder="For ex. Summer"
        />
        <button
          onClick={onSubmit}
          className="rounded-full bg-blue-400 py-2 px-4 m-2 mb-4 mt-4"
        >
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a Category here"
      description="Welcome to category update section"
      className="container bg-info p-4"
    >
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-1 rounded-full focus:outline-none focus:shadow-outline-blue"
        to={`/admin/dashboard`}
      >
        <span className="">Admin Home</span>
      </Link>
      <div className="row bg-dark text-black rounded">
        <div className="col-md-8 offset-md-2 m-3">
          {successMessage()}
          {errorMessage()}
          {updateCategoryForm()}
        </div>
      </div>
    </Base>
  );
}
