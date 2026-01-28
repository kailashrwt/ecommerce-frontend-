import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, Citrus } from "lucide-react";
import { FlashIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const CitrusChic = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // ✅ Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchCitrusChic = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Citrus Chic"
        );

        if (res.data.success) {
          // Simulate delay for better UX
          setTimeout(() => {
            setProducts(res.data.products);
            setLoading(false);
          }, 600);
        }
      } catch (err) {
        console.error("Citrus Chic Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchCitrusChic();
  }, []);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}?quickview=true`);
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div 
        className="px-4 sm:px-6 md:px-10 py-6 min-h-screen"
        style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}
      >
        <div className="animate-pulse mb-10">
          <div className="h-10 w-64 bg-gradient-to-r from-orange-300 to-amber-300 dark:from-orange-700 dark:to-amber-700 rounded-lg mx-auto mb-2" />
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-5"
              style={{
                background: isDark ? "#1E293B" : "#FFFFFF",
                border: isDark ? "1px solid #334155" : "1px solid #E5E7EB"
              }}
            >
              <div className="h-64 bg-gradient-to-br from-orange-200 to-amber-200 dark:from-orange-800 dark:to-amber-700 rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-8 bg-gradient-to-r from-orange-300 to-amber-300 dark:from-orange-700 dark:to-amber-700 rounded w-1/3" />
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
          ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #1a0f0c 100%)" 
          : "radial-gradient(circle at 50% 0%, #FFFBEB 0%, #FEF3C7 100%)",
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
          <Citrus className="w-8 h-8 text-orange-500 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Citrus Chic Collection
          </h1>
          <Citrus className="w-8 h-8 text-amber-500 animate-pulse" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Fresh, vibrant, and full of zest! Explore our citrus-inspired collection that brings sunshine to your style
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
          { label: "Citrus Items", value: products.length },
          { label: "From ₹399", value: "Fresh Start" },
          { label: "Vibrant", value: "Colors" },
          { label: "Zesty", value: "Designs" }
        ].map((stat, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-full backdrop-blur-sm"
            style={{
              background: isDark 
                ? "rgba(255,165,0,0.1)" 
                : "rgba(255,247,237,0.7)",
              border: isDark 
                ? "1px solid rgba(255,165,0,0.2)" 
                : "1px solid rgba(251,191,36,0.3)"
            }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
            <span className="block text-lg font-semibold text-amber-600 dark:text-amber-400">{stat.value}</span>
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
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 flex items-center justify-center">
              <Citrus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No Citrus Items Found</h3>
            <p className="text-gray-500">Check back soon for fresh arrivals!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((item, index) => {
              const isLiked = wishlist.some(w => w._id === item._id);
              const isNew = index < 3; // First 3 items marked as new
              const isPopular = item.price > 800; // Premium items

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
                  {/* Citrus Badges */}
                  <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                    {isNew && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                        FRESH
                      </span>
                    )}
                    {isPopular && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
                        POPULAR
                      </span>
                    )}
                    {item.category?.includes("Citrus") && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                        🍊 CITRUS
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
                        ? "rgba(255,165,0,0.15)" 
                        : "rgba(255,247,237,0.9)",
                      boxShadow: "0 8px 32px rgba(251,191,36,0.2)"
                    }}
                  >
                    <Heart
                      size={20}
                      className={`transition-all duration-300 ${
                        isLiked 
                          ? "fill-red-500 text-red-500" 
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    />
                  </motion.button>

                  {/* Card Container */}
                  <div
                    className="relative overflow-hidden rounded-2xl p-5 h-full"
                    style={{
                      background: isDark 
                        ? "linear-gradient(145deg, #1E293B 0%, #2c1a0f 100%)" 
                        : "linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 100%)",
                      border: isDark 
                        ? "1px solid rgba(251,191,36,0.2)" 
                        : "1px solid rgba(251,191,36,0.3)",
                      boxShadow: isDark
                        ? hoveredCard === item._id
                          ? "0 25px 50px -12px rgba(251,191,36,0.2)"
                          : "0 10px 30px rgba(0,0,0,0.2)"
                        : hoveredCard === item._id
                          ? "0 25px 50px -12px rgba(251,191,36,0.3)"
                          : "0 10px 30px rgba(251,191,36,0.1)",
                      transform: hoveredCard === item._id ? "translateZ(20px)" : "none",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
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
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Quick View Overlay */}
                      {hoveredCard === item._id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <button
                            onClick={() => handleQuickView(item._id)}
                            className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-md bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-all transform hover:scale-105 shadow-2xl"
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
                        <div className="flex items-center text-amber-500">
                          <span className="text-sm">🍊</span>
                          <span className="ml-1 text-sm">Citrus Fresh</span>
                        </div>
                      </div>

                      <p className="text-sm opacity-70 line-clamp-2">
                        {item.description || "Vibrant citrus-inspired design with fresh colors"}
                      </p>

                      {/* Price & Rating */}
                      <div className="flex items-center justify-between pt-3 border-t border-amber-100 dark:border-amber-900">
                        <div>
                          <p className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm line-through text-gray-500">
                              ₹{item.originalPrice}
                            </p>
                          )}
                        </div>
                        <div className="text-sm text-amber-600 dark:text-amber-400">
                          ⭐ 4.7 (96)
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
                            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                            boxShadow: "0 4px 15px rgba(245,158,11,0.4)"
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
                            background: "linear-gradient(135deg, #ea580c 0%, #dc2626 100%)",
                            boxShadow: "0 4px 15px rgba(234,88,12,0.4)"
                          }}
                        >
                          <FlashIcon className="w-5 h-5" />
                          Buy Now
                        </motion.button>
                      </div>
                    </div>

                    {/* Citrus Hover Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.15) 0%, transparent 70%)"
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>


    </motion.div>
  );
};

export default CitrusChic;