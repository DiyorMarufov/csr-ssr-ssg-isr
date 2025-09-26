"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Product } from "../page";

interface CsrDetailProps {
  id: string;
}

export const CsrDetail = ({ id }: CsrDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const json = await res.json();
      setProduct(json);
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={400}
            height={300}
            className="rounded-xl object-contain"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-4 capitalize">
            {product.category}
          </p>

          <div className="space-y-2 mb-6">
            <p className="text-2xl font-semibold text-green-600">
              ${product.price}
            </p>
            <p className="text-lg text-yellow-500">⭐ {product.rating}</p>
          </div>

          <button className="mt-2 w-full bg-blue-600 text-white py-3 px-5 rounded-lg hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

