"use client";
import { memo, useEffect, useState } from "react";

const Ssr = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/recipes", {
        cache: "no-store",
      });
      const json = await res.json();
      setData(json.recipes);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-4 gap-6 max-md:grid-cols-3 max-sm:grid-cols-2">
      {data.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 bg-white cursor-pointer"
        >
          <div className="h-48 w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-lg font-semibold text-gray-800 line-clamp-1">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 capitalize">
              {product.cuisine}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-green-600 font-bold text-lg">
                {product.difficulty}
              </span>
              <span className="text-yellow-500 font-medium">
                ⭐ {product.rating}
              </span>
            </div>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(Ssr);
