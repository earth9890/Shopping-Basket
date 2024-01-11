import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";
import "../index.css";

export default function ManageCategory() {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryID) => {
    deleteCategory(categoryID, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base
      title="Welcome admin"
      description="Manage Categories here"
      className="bg-white text-black"
    >
      <h2 className="mb-4">All Categories:</h2>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue"
        to={`/admin/dashboard`}
      >
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-3">
            Total {categories.length} Categories
          </h2>

          {categories.map((category, index) => (
            <div className="bg-blue-100 rounded-lg p-4 mb-4" key={index}>
              <h3 className="text-2xl font-semibold text-black">
                {category.name}
              </h3>
              <div className="flex mt-4">
                <Link
                  className="btn btn-success mr-2"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span class="">Update</span>
                </Link>
                <button
                  onClick={() => {
                    deleteThisCategory(category._id);
                  }}
                  className=""
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
