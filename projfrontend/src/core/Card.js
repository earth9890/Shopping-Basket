import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/CardHelper";
import ImageHelper from "./helper/ImageHelper";
import "../index.css";

export default function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) {
  const cardTitle = product ? product.name : "A photo from the Internet";
  const cardDescription = product ? product.description : "Default";
  const cardPrice = product ? product.price : "5$ Default";

  const [redirect, setRedirect] = useState(false);

  const addtoCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Navigate to="/cart" />;
    }
  };

  const buttonStyles = "text-white font-bold py-2 px-4 rounded-full mt-2 mb-2";

  const showAddToCart = (addToCart) => {
    return (
      addToCart && (
        <button
          onClick={addtoCart}
          className={`bg-blue-500 hover:bg-blue-700 ${buttonStyles}`}
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className={`bg-red-500 hover:bg-red-700 ${buttonStyles}`}
        >
          Remove from Cart
        </button>
      )
    );
  };

  return (
    <div className="card text-black bg-white border border-info hover:scale-110 text-center">
      <div className="card-header text-sm font-bold">{cardTitle}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />
        <p className="text-sm bg-white whitespace-pre-line font-bold">
          {cardDescription}
        </p>
        <p className="bg-blue-400 rounded-full text-white font-bold text-center py-2 px-1 m-1">
          {"₹ " + cardPrice}
        </p>
        <div className="grid grid-cols-1 gap-4 m-1">
          <div>{showAddToCart(addToCart)}</div>
          <div>{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
}
