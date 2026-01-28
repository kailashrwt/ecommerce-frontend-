import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gem, Crown, Zap, Eye } from "lucide-react";
import { FlashIcon, StarIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const Rings = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchRings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Rings"
        );

        if (res.data.success) {
          // Simulate loading for better UX
          setTimeout(() => {
            setProducts(res.data.products);
            setLoading(false);
          }, 600);
        }
      } catch (err) {
        console.error("Rings Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchRings();
  }, []);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}?quickview=true`);
  };

  // Premium Skeleton Loader
  if (loading) {
    return (
      <div 
        className="px-4 sm:px-6 md:px-10 py-6 min-h-screen"
        style={{ 
          background: isDark 
            ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #0A0F1C 100%)" 
            : "radial-gradient(circle at 50% 0%, #F8FAFC 0%, #F1F5F9 100%)" 
        }}
      >
        {/* Animated Header Skeleton */}
        <div className="text-center mb-12">
          <div className="animate-pulse inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 opacity-20" />
            <div className="h-12 w-64 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-rose-500 opacity-20" />
          </div>
          <div className="h-4 w-96 max-w-full mx-auto bg-gray-200 dark:bg-gray-600 rounded" />
        </div>

        {/* Product Grid Skeleton */}
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
              <div className="relative overflow-hidden rounded-xl mb-5">
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl" />
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
              
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-8 bg-gradient-to-r from-pink-400 to-rose-500 opacity-20 rounded w-1/3" />
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
          ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #0A0F1C 100%)" 
          : "radial-gradient(ellipse at top, #FDF2F8 0%, #F8FAFC 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Premium Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-4 mb-4">
          <Gem className="w-8 h-8 text-rose-500 animate-pulse" />
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent"
          >
            Rings Collection
          </motion.h1>
          <Crown className="w-8 h-8 text-amber-500 animate-pulse" />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
        >
          Exquisite rings that tell your story. Handcrafted with precision and passion.
        </motion.p>

        {/* Collection Stats */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 mt-8"
        >
          {[
            { icon: "💎", label: "Premium", value: "Quality" },
            { icon: "✨", label: "Handmade", value: "Crafted" },
            { icon: "⭐", label: "Rating", value: "4.9+" },
            { icon: "🚚", label: "Delivery", value: "Free" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="px-4 py-3 rounded-2xl backdrop-blur-sm transform hover:scale-105 transition-all"
              style={{
                background: isDark 
                  ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" 
                  : "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
                border: isDark 
                  ? "1px solid rgba(255,255,255,0.1)" 
                  : "1px solid rgba(255,255,255,0.5)",
                boxShadow: isDark 
                  ? "0 8px 32px rgba(0,0,0,0.2)" 
                  : "0 8px 32px rgba(236, 72, 153, 0.1)"
              }}
            >
              <span className="block text-2xl mb-1">{stat.icon}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
              <span className="block text-lg font-semibold">{stat.value}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence>
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 flex items-center justify-center">
              <Gem className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">No Rings Found</h3>
            <p className="text-gray-500">We're crafting new designs. Check back soon!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((item, index) => {
              const isLiked = wishlist.some(w => w._id === item._id);
              const isPremium = item.price > 2000;
              const isTrending = index < 4;

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 40, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 80,
                    damping: 15
                  }}
                  whileHover={{ 
                    y: -16,
                    scale: 1.03,
                    rotateY: 5,
                    transition: { 
                      type: "spring", 
                      stiffness: 400,
                      damping: 25 
                    }
                  }}
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group perspective-1000"
                >
                  {/* Premium Badges */}
                  <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                    {isTrending && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg flex items-center gap-1"
                      >
                        <Sparkles size={12} />
                        TRENDING
                      </motion.span>
                    )}
                    {isPremium && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg flex items-center gap-1"
                      >
                        <Crown size={12} />
                        LUXURY
                      </motion.span>
                    )}
                  </div>

                  {/* Wishlist Heart */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute right-3 top-3 z-20 p-3 rounded-full backdrop-blur-md hover:scale-110 transition-all duration-300"
                    style={{
                      background: isDark 
                        ? "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)" 
                        : "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.15)"
                    }}
                  >
                    <Heart
                      size={20}
                      className={`transition-all duration-300 ${
                        isLiked 
                          ? "fill-rose-500 text-rose-500 animate-pulse" 
                          : "text-gray-600 dark:text-gray-300 hover:text-rose-500"
                      }`}
                    />
                  </motion.button>

                  {/* Main Card */}
                  <div
                    className="relative overflow-hidden rounded-3xl p-6 h-full transform-gpu"
                    style={{
                      background: isDark 
                        ? "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)" 
                        : "linear-gradient(145deg, #FFFFFF 0%, #FDF2F8 100%)",
                      border: isDark 
                        ? "1px solid rgba(255,255,255,0.1)" 
                        : "1px solid rgba(255,255,255,0.8)",
                      boxShadow: isDark
                        ? hoveredCard === item._id
                          ? "0 30px 60px -12px rgba(236, 72, 153, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
                          : "0 15px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)"
                        : hoveredCard === item._id
                          ? "0 30px 60px -12px rgba(236, 72, 153, 0.25), inset 0 1px 0 rgba(255,255,255,0.9)"
                          : "0 15px 40px rgba(236, 72, 153, 0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Image Container with Ring Glow */}
                    <div className="relative overflow-hidden rounded-2xl mb-6 group/image">
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-600/10 rounded-2xl" />
                      
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-72 object-contain relative z-10 p-4"
                        whileHover={{ 
                          scale: 1.15,
                          rotate: hoveredCard === item._id ? 5 : 0 
                        }}
                        transition={{ 
                          scale: { duration: 0.6, type: "spring" },
                          rotate: { duration: 0.3 }
                        }}
                      />
                      
                      {/* Hover Overlay */}
                      {hoveredCard === item._id && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20"
                          />
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-4 left-0 right-0 z-30 flex justify-center"
                          >
                            <button
                              onClick={() => handleQuickView(item._id)}
                              className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-lg flex items-center gap-2 transform hover:scale-105 transition-all"
                              style={{
                                background: "linear-gradient(135deg, rgba(236, 72, 153, 0.9) 0%, rgba(219, 39, 119, 0.9) 100%)",
                                border: "1px solid rgba(255,255,255,0.2)"
                              }}
                            >
                              <Eye size={16} />
                              Quick Preview
                            </button>
                          </motion.div>
                        </>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold line-clamp-1 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {item.description || "Elegant ring with premium finish"}
                        </p>
                      </div>

                      {/* Rating & Material */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className="w-4 h-4 fill-amber-400 text-amber-400"
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-2">4.8</span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                          Sterling Silver
                        </span>
                      </div>

                      {/* Price */}
                      <motion.div 
                        animate={hoveredCard === item._id ? { scale: 1.05 } : { scale: 1 }}
                        className="pt-4 border-t border-gray-200 dark:border-gray-700"
                      >
                        <p className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                          ₹{item.price}
                        </p>
                        {item.originalPrice && (
                          <p className="text-sm line-through text-gray-500">
                            ₹{item.originalPrice}
                          </p>
                        )}
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="flex-1 py-3 rounded-xl font-semibold text-white transition-all group/btn relative overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <Eye size={18} />
                            View Details
                          </span>
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/payment?productId=${item._id}`)}
                          className="px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all group/btn relative overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <Zap size={18} />
                            Buy Now
                          </span>
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
                        filter: "blur(20px)"
                      }}
                    />
                  </div>

                  {/* Floating Ring Effect */}
                  {hoveredCard === item._id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 blur-md"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Collection CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="text-center mt-20 pt-12 relative"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
        
      </motion.div>
    </motion.div>
  );
};

export default Rings;