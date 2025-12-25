"use client";
import { Order, Product } from "@/lib/types";
import React, { useState } from "react";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:7000/shop/${product.id}/purchase/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: "user@user.com", // replace with logged-in user's email
            quantity,
          }),
        }
      );

      if (!response.ok) {
        const err = await response.json();
        setError(err.detail || "Purchase failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setOrder(data.order);
      setLoading(false);
    } catch (err: any) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <img
        src={product.merchImage || "/placeholder.jpg"}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-700 font-semibold mt-2">${product.price}</p>
      <p className="text-gray-500 text-sm">Stock: {product.stock}</p>

      <div className="mt-4 flex gap-2">
        <input
          type="number"
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border p-1 w-16 rounded"
        />
        <button
          onClick={handlePurchase}
          className="bg-green-600 text-black font-bold  border px-4 rounded hover:bg-green-700"
          disabled={loading || quantity > product.stock}
        >
          {loading ? "Buying..." : "Buy"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {order && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <h4 className="font-semibold">Order Successful!</h4>
          <p>Product: {order.item.product}</p>
          <p>Quantity: {order.item.quantity}</p>
          <p>Total: ${order.item.price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
