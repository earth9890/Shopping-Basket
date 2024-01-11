import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import { signout, isAuthenticated } from "../auth/helper";
import "../index.css";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#blue" };
  } else {
    return { color: "#000" };
  }
};

export default function Menu() {
  const history = createBrowserHistory();
  const navigate = useNavigate();

  return (
    <div>
      <ul className="flex justify-end bg-blue-100 p-4">
        <li className="mr-4">
          <Link
            style={currentTab(history, "/")}
            className="text-blue-800 hover:text-blue-300"
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="mr-4">
          <Link
            style={currentTab(history, "/cart")}
            className="text-blue-800 hover:text-blue-300"
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="mr-4">
            <Link
              style={currentTab(history, "/user/dashboard")}
              className="text-blue-800 hover:text-blue-300"
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="mr-4">
            <Link
              style={currentTab(history, "/admin/dashboard")}
              className="text-blue-800 hover:text-blue-300"
              to="/admin/dashboard"
            >
              A. Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="mr-4">
              <Link
                style={currentTab(history, "/signup")}
                className="text-white hover:text-blue-300"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="mr-4">
              <Link
                style={currentTab(history, "/signin")}
                className="text-blue-800 hover:text-blue-300"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li>
            <span
              className="text-yellow-500 cursor-pointer"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Sign Out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
