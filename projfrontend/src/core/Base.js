import React from "react";
import Menu from "./Menu";
import "../index.css";

export default function Base({
  title = "MY Title",
  description = "My description",
  className = "bg-white text-black p-4",
  children,
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Menu />
      <div className="flex-grow container mx-auto">
        <div className="jumbotron bg-white text-black text-center">
          <h2 className="text-3xl font-bold text-blue-800">{title}</h2>
          <p className="text-xl">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="bg-blue-100 text-black text-center py-3 rounded-full">
        <div className="container mx-auto bg-white p-3 rounded-full">
          <h4 className="text-lg">
            If you have any questions, feel free to reach out
          </h4>
          <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-full mt-2">
            Contact Us
          </button>
        </div>
        <div className="container mx-auto">
          <span className="text-black">An Amazing T-Shirt Site</span>
        </div>
      </footer>
    </div>
  );
}
