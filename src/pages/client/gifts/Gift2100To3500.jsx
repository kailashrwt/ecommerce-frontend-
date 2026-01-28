import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gift, Zap, Package } from "lucide-react";
import { FlashIcon, Gift2100To3500Icon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const Gift2100To3500 = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // ✅ Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce-backend-s1l7.onrender.com/api/products/price/2100/3500"
        );

        if (res.data.success) {
          // Simulate delay for better UX
          setTimeout(() => {
            setProducts(res.data.products);
            setLoading(false);
          }, 600);
        }
      } catch (err) {
        console.log("Gift 2100-3500 fetch error:", err);
        setLoading(false);
      }
    };

    fetchGifts();
  }, []);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}?quickview=true`);
  };

  // Calculate price savings
  const calculateSavings = (price) => {
    const original = price * 1.25; // 25% more
    return Math.round(original - price);
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div
        className="px-4 sm:px-6 md:px-10 py-6 min-h-screen"
        style={{
          background: isDark
            ? "#0F172A"
            : "linear-gradient(135deg, #F8FAFC 0%, #E0F2FE 100%)"
        }}
      >
        <div className="animate-pulse mb-10">
          <div className="h-10 w-72 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-700 dark:to-pink-700 rounded-lg mx-auto mb-2" />
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{
                background: isDark ? "#1E293B" : "#FFFFFF",
                border: isDark ? "1px solid #334155" : "1px solid #E5E7EB",
                boxShadow: "0 10px 25px rgba(168, 85, 247, 0.1)"
              }}
            >
              <div className="h-64 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-700 rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-8 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-700 dark:to-pink-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="px-4 sm:px-6 md:px-10 py-6 lg:py-8"
      style={{
        background: isDark
          ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #1a0a1a 100%)"
          : "radial-gradient(circle at 50% 0%, #FDF4FF 0%, #FAE8FF 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 mb-3">
          <Gift className="w-8 h-8 text-purple-500 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Premium Gifts ₹2100 – ₹3500
          </h1>
          <Gift2100To3500Icon className="w-8 h-8 text-pink-500" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Curated premium gifts perfect for special occasions. Thoughtful, elegant, and unforgettable.
        </p>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-10"
      >
        {[
          { label: "Premium Gifts", value: products.length, icon: "🎁" },
          { label: "Price Range", value: "₹2100-₹3500", icon: "💰" },
          { label: "Best Value", value: "Up to 25% OFF", icon: "🔥" },
          { label: "Free Shipping", value: "On All", icon: "🚚" }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="px-4 py-3 rounded-xl backdrop-blur-sm"
            style={{
              background: isDark
                ? "rgba(168, 85, 247, 0.1)"
                : "rgba(245, 208, 254, 0.5)",
              border: isDark
                ? "1px solid rgba(168, 85, 247, 0.2)"
                : "1px solid rgba(216, 180, 254, 0.3)",
              boxShadow: "0 8px 32px rgba(168, 85, 247, 0.1)"
            }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {stat.icon} {stat.label}
            </span>
            <span className="block text-lg font-semibold text-purple-600 dark:text-purple-400">{stat.value}</span>
          </div>
        ))}
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence>
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 flex items-center justify-center">
              <Gift className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No Gifts Found</h3>
            <p className="text-gray-500">Check other price ranges for amazing gifts!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((item, index) => {
              const isLiked = wishlist.some(w => w._id === item._id);
              const isNew = index < 2; // First 2 items marked as new
              const savings = calculateSavings(item.price);
              const isBestSeller = item.price > 2800;

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Gift Badges */}
                  <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                    {isNew && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                        NEW ARRIVAL
                      </span>
                    )}
                    {isBestSeller && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
                        BESTSELLER
                      </span>
                    )}
                    {savings > 500 && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg">
                        SAVE ₹{savings}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart with Animation */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute right-3 top-3 z-20 p-3 rounded-full backdrop-blur-md hover:scale-110 transition-all duration-300"
                    style={{
                      background: isDark
                        ? "rgba(168, 85, 247, 0.2)"
                        : "rgba(245, 208, 254, 0.8)",
                      boxShadow: "0 8px 32px rgba(168, 85, 247, 0.2)"
                    }}
                  >
                    <Heart
                      size={20}
                      className={`transition-all duration-300 ${isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-purple-600 dark:text-purple-400"
                        }`}
                    />
                  </motion.button>

                  {/* Card Container */}
                  <div
                    className="relative overflow-hidden rounded-2xl p-5 h-full"
                    style={{
                      background: isDark
                        ? "linear-gradient(145deg, #1E293B 0%, #2d1b3b 100%)"
                        : "linear-gradient(145deg, #FFFFFF 0%, #FDF4FF 100%)",
                      border: isDark
                        ? "1px solid rgba(168, 85, 247, 0.3)"
                        : "1px solid rgba(216, 180, 254, 0.4)",
                      boxShadow: isDark
                        ? hoveredCard === item._id
                          ? "0 25px 50px -12px rgba(168, 85, 247, 0.3)"
                          : "0 10px 30px rgba(0,0,0,0.2)"
                        : hoveredCard === item._id
                          ? "0 25px 50px -12px rgba(168, 85, 247, 0.25)"
                          : "0 10px 30px rgba(168, 85, 247, 0.15)",
                      transform: hoveredCard === item._id ? "translateZ(20px)" : "none",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {/* Gift Ribbon */}
                    <div className="absolute -right-8 top-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-1 rotate-45 shadow-lg z-10">
                      <span className="text-xs font-bold">GIFT</span>
                    </div>

                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-xl mb-5">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Quick View Overlay */}
                      {hoveredCard === item._id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <button
                            onClick={() => handleQuickView(item._id)}
                            className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-2xl"
                          >
                            Quick View
                          </button>
                        </motion.div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <Package size={16} className="text-purple-500" />
                          <span className="text-xs text-purple-600 dark:text-purple-400">Gift Ready</span>
                        </div>
                      </div>

                      <p className="text-sm opacity-70 line-clamp-2">
                        {item.description || "Perfect premium gift for special occasions"}
                      </p>

                      {/* Price & Savings */}
                      <div className="flex items-center justify-between pt-3 border-t border-purple-100 dark:border-purple-900">
                        <div>
                          <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm line-through text-gray-500">
                              ₹{Math.round(item.price * 1.25)}
                            </p>
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                              Save ₹{savings}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-purple-600 dark:text-purple-400">
                          ⭐ 4.9 (142)
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="flex-1 py-3 rounded-xl font-semibold text-white transition-all"
                          style={{
                            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)"
                          }}
                        >
                          View Details
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/payment?productId=${item._id}`)}
                          className="px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
                          style={{
                            background: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
                            boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)"
                          }}
                        >
                          <FlashIcon className="w-5 h-5" />
                          Gift Now
                        </motion.button>
                      </div>
                    </div>

                    {/* Gift Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.15) 0%, transparent 70%)"
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Price Range Info */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 p-6 rounded-2xl text-center"
        style={{
          background: isDark
            ? "linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)"
            : "linear-gradient(135deg, rgba(245, 208, 254, 0.4) 0%, rgba(254, 240, 255, 0.6) 100%)",
          border: isDark
            ? "1px solid rgba(168, 85, 247, 0.2)"
            : "1px solid rgba(216, 180, 254, 0.4)"
        }}
      >
        <h3 className="text-xl font-bold mb-3 text-purple-700 dark:text-purple-300">
          🎯 Perfect Price Range for Special Gifts
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          ₹2100-₹3500 is the ideal range for premium gifts that make a statement without breaking the bank.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {["Weddings", "Anniversaries", "Birthdays", "Corporate Gifts", "Festivals"].map((occasion, idx) => (
            <span
              key={idx}
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.7)",
                color: isDark ? "#ddd" : "#666"
              }}
            >
              🎁 {occasion}
            </span>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Gift2100To3500;