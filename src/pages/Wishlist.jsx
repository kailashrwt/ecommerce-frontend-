import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Eye, Trash2, ShoppingCart, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist({ theme, setCartCount }) {
  const { wishlist, toggleWishlist, removeFromWishlist } = useWishlist();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🛒 Add to Cart Function
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "https://ecommerce-backend-s1l7.onrender.com/api/cart/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Added to Cart!");
        if (setCartCount) {
          setCartCount((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.log("Add to Cart Error:", err);
      alert("Failed to add item.");
    } finally {
      setLoading(false);
    }
  };

  // ⚡ Buy Now Function
  const handleBuyNow = (productId) => {
    navigate(`/payment?productId=${productId}`);
  };

  // Quick Move to Cart and Remove
  const handleMoveToCart = (item) => {
    handleAddToCart(item._id);
    removeFromWishlist(item._id);
  };

  if (wishlist.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] px-4"
        style={{
          background: isDark ? "#0F172A" : "#F8FAFC",
          color: isDark ? "#F8FAFC" : "#0F172A",
        }}
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <Heart size={80} className="text-red-500" />
        </motion.div>
        
        <h2 className="text-3xl font-bold mb-4 text-center">Your Wishlist is Empty</h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-md">
          Save your favorite items here to buy them later or compare prices.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
            }}
          >
            Start Shopping
          </button>
          
          <button
            onClick={() => navigate('/flavors')}
            className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
            style={{
              borderColor: isDark ? "#475569" : "#cbd5e1",
              color: isDark ? "#F8FAFC" : "#0F172A",
            }}
          >
            Explore Collections
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-28 px-6 md:px-12 pb-12 min-h-screen"
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3"
          >
            <Heart className="text-red-500" /> My Wishlist
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <p className="text-lg opacity-70">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                style={{
                  background: isDark ? "#334155" : "#e2e8f0",
                }}
              >
                Continue Shopping
              </button>
              
              <button
                onClick={() => {
                  if (window.confirm("Move all items to cart?")) {
                    wishlist.forEach(item => handleAddToCart(item._id));
                  }
                }}
                className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                }}
              >
                <ShoppingCart className="inline mr-2 h-4 w-4" />
                Move All to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <AnimatePresence>
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {wishlist.map((item, index) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="rounded-2xl overflow-hidden cursor-pointer group relative"
                style={{
                  background: isDark 
                    ? "rgba(30, 41, 59, 0.8)" 
                    : "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: isDark 
                    ? "1px solid rgba(255, 255, 255, 0.1)" 
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={() => setHoveredItem(item._id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                        color: isDark ? "#F8FAFC" : "#0F172A",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  
                  {/* Remove Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(item._id)}
                    className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm z-10"
                    style={{
                      background: "rgba(239, 68, 68, 0.9)",
                    }}
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Hover Overlay with Actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item._id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
                  >
                    <div className="space-y-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMoveToCart(item)}
                        className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                        style={{
                          background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                          color: "#fff",
                          boxShadow: "0 4px 20px rgba(78,205,196,0.5)",
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          "Adding..."
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Move to Cart
                          </>
                        )}
                      </motion.button>
                      
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                          style={{
                            background: "rgba(255, 255, 255, 0.9)",
                            color: "#333",
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </motion.button>
                        
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBuyNow(item._id)}
                          className="flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                          style={{
                            background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                            color: "#fff",
                          }}
                        >
                          <Zap className="w-4 h-4" />
                          Buy Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg line-clamp-1 mb-2 group-hover:text-red-500 transition-colors">
                    {item.name}
                  </h3>
                  
                  <p className="text-sm opacity-70 mb-3 line-clamp-2">
                    {item.description || "Your saved item"}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-green-500">
                        ₹{item.price.toLocaleString()}
                      </p>
                      <p className="text-xs opacity-70">
                        Saved in Wishlist
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(item._id)}
                        className="px-3 py-2 rounded-lg font-semibold transition-all"
                        style={{
                          background: "linear-gradient(135deg, #f472b6 0%, #d946ef 100%)",
                          color: "#fff",
                          boxShadow: "0 4px 12px rgba(244, 114, 182, 0.3)",
                        }}
                        disabled={loading}
                      >
                        <ShoppingBag className="inline h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)",
          }}
        >
          <h2 className="text-3xl font-bold mb-3">🎯 Ready to Purchase?</h2>
          <p className="opacity-90 mb-6 max-w-2xl mx-auto">
            Your dream items are waiting! Complete your wishlist journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                wishlist.forEach(item => handleAddToCart(item._id));
              }}
              className="px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
              disabled={loading}
            >
              {loading ? "Processing..." : "Add All to Cart"}
            </button>
            
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#333",
              }}
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style>
        {`
          .line-clamp-1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        `}
      </style>
    </motion.div>
  );
}