import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

export default function AdminDashBoard() {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => (
    <div className="card bg-white text-black">
      <h4 className="card-header ml-4">Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item my-2">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full block focus:outline-none focus:shadow-outline-blue"
            to="/admin/create/category"
          >
            Create Categories
          </Link>
        </li>
        <li className="list-group-item my-2">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full block focus:outline-none focus:shadow-outline-blue"
            to="/admin/categories"
          >
            Manage Categories
          </Link>
        </li>
        <li className="list-group-item my-2">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full block focus:outline-none focus:shadow-outline-blue"
            to="/admin/create/product"
          >
            Create Product
          </Link>
        </li>
        <li className="list-group-item my-2">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full block focus:outline-none focus:shadow-outline-blue"
            to="/admin/products"
          >
            Manage Products
          </Link>
        </li>
        <li className="list-group-item my-2">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full block focus:outline-none focus:shadow-outline-blue"
            to="/admin/orders"
          >
            Manage Orders
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminRightSide = () => (
    <div className="flex-none w-full md:w-3/4">
      <div className="card bg-success text-black mb-4 rounded shadow-md p-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item my-2">
            <span className="badge badge bg-info">Name: </span> {name}
          </li>
          <li className="list-group-item my-2">
            <span className="badge badge bg-info">Email: </span> {email}
          </li>
          <li className="list-group-item my-2">
            <span className="badge badge bg-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <Base
      title="Welcome To Admin Area"
      description="You can manage all products here"
      className="container bg-white text-black p-4"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">{adminLeftSide()}</div>
        <div className="w-full md:w-3/4">{adminRightSide()}</div>
      </div>
    </Base>
  );
}
