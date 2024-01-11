import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CardHelper";
import PaymentPaypal from "./PaymentPaypal";
import { isAuthenticated } from "../auth/helper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load all the products</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2 className="text-white">This section is for checkout</h2>
      </div>
    );
  };

const showCartContent = () => {
  if (!isAuthenticated()) {
    return (
      <div>
        <h3 className="text-white">Please login to view your cart.</h3>
        <button
          onClick={() => navigate("/signin")}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 m-2 rounded-full focus:outline-none focus:shadow-outline-blue"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="lg:flex lg:space-x-6">
      <div className="lg:w-1/2">
        {products && products.length > 0 ? (
          loadAllProducts(products)
        ) : (
          <h3>No products in cart</h3>
        )}
      </div>
      <div className="lg:w-1/2 mt-4 lg:mt-0">
        <PaymentPaypal products={products} setReload={setReload} />
      </div>
    </div>
  );
};

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="container mx-auto p-4 text-white">
        {showCartContent()}
      </div>
    </Base>
  );
};

export default Cart;
