import React, { useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";

const AddToCart = ({ productId, onAdded, setCartCount, style = {} }) => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      setLoading(true);
      const res = await axios.post(
        "https://ecommerce-backend-s1l7.onrender.com/api/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLoading(false);
      const total = res.data.totalItems ?? (res.data.cart?.items.reduce((s,i)=>s+i.quantity,0) || 0);

      // update top-level count
      if (setCartCount) setCartCount(total);
      if (onAdded) onAdded(res.data.cart);

      // small nice toast
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart err", err);
      setLoading(false);
      alert("Unable to add to cart");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      style={{
        background: loading ? "#FFD3D3" : "linear-gradient(135deg,#22C55E,#10B981)",
        padding: "10px 14px",
        borderRadius: 12,
        color: "#fff",
        border: "none",
        cursor: loading ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        ...style,
      }}
    >
      {loading ? (
        "⏳ Adding..."
      ) : (
        <>
          <ShoppingCart size={18} />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCart;