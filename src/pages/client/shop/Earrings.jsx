import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, Gem } from "lucide-react";
import { FlashIcon, SimpleMagic, StarIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const Earrings = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  // ✅ Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchEarrings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Earrings"
        );

        if (res.data.success) {
          // Simulate delay for better UX
          setTimeout(() => {
            setProducts(res.data.products);
            setLoading(false);
          }, 600);
        }
      } catch (err) {
        console.error("Earrings Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchEarrings();
  }, []);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}?quickview=true`);
  };

  // Premium Skeleton Loader
  if (loading) {
    return (
      <div 
        className="px-4 sm:px-6 md:px-10 py-6 min-h-screen"
        style={{ background: isDark ? "#0F172A" : "#F8FAFC" }}
      >
        <div className="animate-pulse mb-12">
          <div className="h-12 w-72 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-lg mx-auto mb-3" />
          <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-5"
              style={{
                background: isDark ? "#1E293B" : "#FFFFFF",
                border: isDark ? "1px solid #334155" : "1px solid #E5E7EB"
              }}
            >
              <div className="h-64 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-xl w-2/3" />
              </div>
            </motion.div>
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
      className="px-4 sm:px-6 md:px-10 py-8 lg:py-12"
      style={{
        background: isDark 
          ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #0A0F1C 100%)" 
          : "radial-gradient(circle at 50% 0%, #F8FAFC 0%, #F1F5F9 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Animated Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center mb-12 sm:mb-16"
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <Gem className="w-8 h-8 text-purple-500 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Earrings Collection
          </h1>
          <Gem className="w-8 h-8 text-pink-500 animate-pulse" />
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl"
        >
          Timeless elegance meets modern craftsmanship
        </motion.p>
      </motion.div>

      {/* Collection Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12"
      >
        {[
          { 
            label: "Designs", 
            value: products.length,
            icon: "✨",
            color: "from-purple-500 to-pink-500"
          },
          { 
            label: "Materials", 
            value: "4+",
            icon: "💎",
            color: "from-blue-500 to-cyan-500"
          },
          { 
            label: "Styles", 
            value: "Modern",
            icon: "🎨",
            color: "from-green-500 to-emerald-500"
          },
          { 
            label: "Delivery", 
            value: "2-3 Days",
            icon: "🚚",
            color: "from-orange-500 to-red-500"
          }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`px-4 sm:px-6 py-3 rounded-2xl backdrop-blur-sm bg-gradient-to-br ${stat.color}`}
            style={{
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{stat.icon}</span>
              <div>
                <span className="block text-sm font-medium text-white/90">{stat.label}</span>
                <span className="block text-lg sm:text-xl font-bold text-white">{stat.value}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence>
        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Gem className="w-16 h-16 text-purple-400" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">No Earrings Available</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Our collection is being updated with new designs. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((item, index) => {
              const isLiked = wishlist.some(w => w._id === item._id);
              const isFeatured = index % 4 === 0; // Every 4th item is featured

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.07,
                    type: "spring",
                    stiffness: 120 
                  }}
                  whileHover={{ 
                    y: -15,
                    scale: 1.03,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                  style={{ perspective: 1000 }}
                >
                  {/* Featured Ribbon */}
                  {isFeatured && (
                    <div className="absolute -top-2 -left-2 z-30">
                      <div className="px-4 py-1 text-xs font-bold rounded-tr-lg rounded-bl-lg bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-xl">
                        FEATURED
                      </div>
                      <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-4 border-l-rose-600 border-t-4 border-t-transparent" />
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute right-3 top-3 z-20 p-3 rounded-full backdrop-blur-md"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                    }}
                    whileHover={{ 
                      scale: 1.2,
                      background: "rgba(255, 255, 255, 0.25)"
                    }}
                  >
                    <Heart
                      size={22}
                      className={`transition-all duration-300 ${
                        isLiked 
                          ? "fill-red-500 text-red-500 animate-heartBeat" 
                          : "text-white"
                      }`}
                    />
                  </motion.button>

                  {/* Main Card */}
                  <div
                    className="relative overflow-hidden rounded-3xl p-5 h-full"
                    style={{
                      background: isDark 
                        ? "linear-gradient(145deg, #1E293B 0%, #0F172A 100%)" 
                        : "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)",
                      border: isDark 
                        ? "1px solid rgba(255,255,255,0.15)" 
                        : "1px solid rgba(0,0,0,0.08)",
                      boxShadow: isDark
                        ? hoveredCard === item._id
                          ? "0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 50px rgba(147, 51, 234, 0.3)"
                          : "0 15px 40px rgba(0,0,0,0.25)"
                        : hoveredCard === item._id
                          ? "0 30px 60px -15px rgba(147, 51, 234, 0.2), 0 0 40px rgba(236, 72, 153, 0.2)"
                          : "0 15px 40px rgba(0,0,0,0.1)",
                      transformStyle: "preserve-3d",
                      transform: hoveredCard === item._id 
                        ? "translateZ(30px) rotateY(5deg)" 
                        : "translateZ(0) rotateY(0)",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)"
                      }}
                    />

                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-2xl mb-6">
                      <div className="aspect-square relative">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                          style={{ transform: "translateX(-100%) translateY(-100%)" }} />
                      </div>
                      
                      {/* Quick View Overlay */}
                      {hoveredCard === item._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                        >
                          <motion.button
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            onClick={() => handleQuickView(item._id)}
                            className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            👁️ Quick Preview
                          </motion.button>
                        </motion.div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      {/* Title & Category */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-1 mb-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm opacity-70 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className="w-4 h-4 fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm opacity-80 line-clamp-2 min-h-[40px]">
                        {item.description || "Elegant design perfect for any occasion"}
                      </p>

                      {/* Price & Rating */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-300/20">
                        <div>
                          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Free Shipping</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold">⭐ 4.9</div>
                          <div className="text-xs text-gray-500">(42 reviews)</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-5">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="flex-1 py-3 rounded-xl font-semibold text-white transition-all shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                            boxShadow: "0 6px 20px rgba(139, 92, 246, 0.4)"
                          }}
                        >
                          View Details
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/payment?productId=${item._id}`)}
                          className="px-6 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)",
                            boxShadow: "0 6px 20px rgba(236, 72, 153, 0.4)"
                          }}
                        >
                          <Zap size={18} />
                          Buy Now
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-20 pt-12 border-t border-gray-300/20"
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Need Something Special?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            We create custom earrings tailored to your style and occasion
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/custom-design")}
            className="px-10 py-4 rounded-full font-bold text-white inline-flex items-center gap-3 transition-all shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #9333EA 0%, #DB2777 100%)",
              boxShadow: "0 15px 40px rgba(147, 51, 234, 0.4)"
            }}
          >
            <Sparkles size={20} />
            Design Your Own Earrings
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Earrings;