// Import other necessary files
import React, { useEffect, useState } from "react";
import "../index.css"; // Import the generated tailwind.css file
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base
      title="Home Page"
      description="Welcome to the T-Shirt Store"
      className="bg-white text-blue-800"
    >
      <div className="text-left">
        <h1 className="text-2xl font-bold text-blue-500 mb-8">All T-Shirts</h1>
        <div className="flex flex-wrap justify-center">
          {products.map((product, index) => (
            <div key={index} className="max-w-sm mx-4 mb-8">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
