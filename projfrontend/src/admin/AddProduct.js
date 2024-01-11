import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createaProduct, getCategories } from "./helper/adminapicall";

export default function AddProduct() {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: false });
    createaProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            error: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .catch();
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success text-blue-800"
      style={{ display: createdProduct ? "" : "none" }}
    >
      {createdProduct} create successfully
    </div>
  );

  const errorMessage = () => (
    <div
      className="alert alert-warning text-red-900"
      style={{ display: error ? "" : "none" }}
    >
      <h4 className="text-warning">Error occurred while creating Product</h4>
    </div>
  );

    const createProductForm = () => (
      
    <form>
      <span className="text-blue-800">Post photo</span>
      <div className="form-group">
        <label className="btn d-grid btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control rounded text-center border border-blue-800"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control rounded text-center text-black border border-blue-800"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control rounded text-center text-black border border-blue-800"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mt-2">
        <select
          onChange={handleChange("category")}
          className="form-control rounded text-center text-black border border-blue-800"
          placeholder="Category"
        >
          <option defaultValue={true}>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mt-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control rounded text-center text-black border border-blue-800"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className=" rounded-full py-2 px-4 mt-2 mb-2 bg-blue-500 text-white"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product here"
      description="Welcome to the product creation section"
      className="container bg-info p-4"
    >
      <Link
        className="bg-blue-500 hover:bg-blue-700 m-3 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
        to={`/admin/dashboard`}
      >
        <span className="">Admin Home</span>
      </Link>
      <div className="row bg-blue-200 text-blue-800 rounded m-3">
        <div className="col-md-8 offset-md-2 m-1">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
}
