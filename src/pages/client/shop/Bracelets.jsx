import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap,  Palette, Layers, Shield } from "lucide-react";
import { FlashIcon, StarIcon, Wristwatch } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const Bracelets = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("All");
  const navigate = useNavigate();

  // ✅ Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  // Bracelet styles filter
  const styles = ["All", "Charm", "Bangle", "Chain"];

  useEffect(() => {
    const fetchBracelets = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Bracelets"
        );

        if (res.data.success) {
          // Simulate delay for better UX
          setTimeout(() => {
            setProducts(res.data.products);
            setLoading(false);
          }, 600);
        }
      } catch (err) {
        console.error("Bracelets Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchBracelets();
  }, []);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}?quickview=true`);
  };

  // Filter products by style
  const filteredProducts = selectedStyle === "All" 
    ? products 
    : products.filter(item => 
        item.name?.toLowerCase().includes(selectedStyle.toLowerCase()) ||
        item.description?.toLowerCase().includes(selectedStyle.toLowerCase())
      );

  // Premium Skeleton Loader
  if (loading) {
    return (
      <div 
        className="px-4 sm:px-6 md:px-10 py-8 min-h-screen"
        style={{ 
          background: isDark 
            ? "linear-gradient(135deg, #0F172A 0%, #164E63 100%)" 
            : "linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 100%)" 
        }}
      >
        {/* Animated Header Skeleton */}
        <div className="text-center mb-12">
          <div className="animate-pulse inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full" />
            <div className="h-14 w-72 bg-gradient-to-r from-gray-300 to-teal-400 dark:from-gray-700 dark:to-teal-600 rounded-2xl" />
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
          </div>
          <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </div>

        {/* Style Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl p-6"
              style={{
                background: isDark 
                  ? "linear-gradient(145deg, #1E293B 0%, #155E75 30%)" 
                  : "linear-gradient(145deg, #FFFFFF 0%, #F0FDFA 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <div className="h-72 bg-gradient-to-br from-gray-200 via-teal-100 to-emerald-100 dark:from-gray-700 dark:via-teal-900/30 dark:to-emerald-900/30 rounded-2xl mb-6" />
              <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-300 to-teal-300 dark:from-gray-600 dark:to-teal-800/50 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-12 bg-gradient-to-r from-teal-400 to-emerald-500 dark:from-teal-600 dark:to-emerald-700 rounded-xl w-2/3" />
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
          ? "linear-gradient(135deg, #0F172A 0%, #164E63 50%, #0F172A 100%)" 
          : "linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 50%, #F8FAFC 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Animated Header with Wrist Icons */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-4 mb-6 relative">
          {/* Animated Wrist Icon */}
          <motion.div
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Wristwatch className="w-14 h-14 text-teal-500" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
            Bracelets Collection
          </h1>
          
          <motion.div
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          >
            <Layers className="w-14 h-14 text-emerald-500" />
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Wrap your wrist in elegance with our curated bracelet collection
        </motion.p>
      </motion.div>

      {/* Style Filter Chips */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-12 px-4"
      >
        {styles.map((style) => (
          <motion.button
            key={style}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStyle(style)}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              selectedStyle === style
                ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-2xl"
                : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 shadow-lg backdrop-blur-sm"
            }`}
            style={{
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            {
             style === "Charm" ? "🔮 " : 
             style === "Bangle" ? "💍 " : 
             style === "Chain" ? "⛓️ " :""
             }
            {style}
          </motion.button>
        ))}
      </motion.div>

      {/* Collection Features */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto"
      >
        {[
          { icon: <Shield className="w-8 h-8" />, label: "Water Resistant", value: "Yes", color: "from-blue-500 to-cyan-500" },
          { icon: <Palette className="w-8 h-8" />, label: "Color Options", value: "8+", color: "from-purple-500 to-pink-500" },
          { icon: <Sparkles className="w-8 h-8" />, label: "Adjustable Fit", value: "Custom", color: "from-amber-500 to-yellow-500" },
          { icon: <Wristwatch className="w-8 h-8" />, label: "Comfort Wear", value: "All Day", color: "from-emerald-500 to-teal-500" }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -8 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl backdrop-blur-sm`}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <div className="text-sm font-medium text-white/90">{feature.label}</div>
                <div className="text-xl font-bold text-white">{feature.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Products Grid */}
      <AnimatePresence>
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
              <Wristwatch className="w-20 h-20 text-teal-400" />
            </div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Curated Bracelets Arriving Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Our collection is being updated with handcrafted bracelets
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item, index) => {
              const isLiked = wishlist.some(w => w._id === item._id);
              const isTrending = index % 3 === 0;

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
                    rotateY: 3,
                    transition: { type: "spring", stiffness: 400, damping: 25 }
                  }}
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                  style={{ perspective: 1000 }}
                >
                  {/* Trending Badge */}
                  {isTrending && (
                    <div className="absolute -top-3 -left-3 z-30">
                      <div className="px-4 py-2 text-xs font-bold rounded-tr-lg rounded-bl-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xl flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        TRENDING
                      </div>
                    </div>
                  )}

                  {/* Wishlist Heart */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                    className="absolute right-4 top-4 z-20 p-3 rounded-full backdrop-blur-md"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      background: "rgba(45, 212, 191, 0.3)"
                    }}
                  >
                    <Heart
                      size={22}
                      className={`transition-all duration-300 ${
                        isLiked 
                          ? "fill-red-500 text-red-500" 
                          : "text-white"
                      }`}
                    />
                  </motion.button>

                  {/* Main Card */}
                  <div
                    className="relative overflow-hidden rounded-3xl p-6 h-full"
                    style={{
                      background: isDark 
                        ? "linear-gradient(145deg, #1E293B 0%, #0F766E 30%, #1E293B 100%)" 
                        : "linear-gradient(145deg, #FFFFFF 0%, #F0FDFA 100%)",
                      border: "2px solid transparent",
                      backgroundImage: isDark 
                        ? "linear-gradient(145deg, #1E293B 0%, #0F766E 30%, #1E293B 100%), linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)"
                        : "linear-gradient(145deg, #FFFFFF 0%, #F0FDFA 100%), linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      boxShadow: hoveredCard === item._id
                        ? "0 35px 70px -15px rgba(13, 148, 136, 0.3), 0 0 50px rgba(45, 212, 191, 0.2)"
                        : "0 20px 45px -12px rgba(0,0,0,0.2)",
                      transform: hoveredCard === item._id ? "translateZ(30px)" : "none",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {/* Teal Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(45, 212, 191, 0.15) 0%, transparent 70%)"
                      }}
                    />

                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-2xl mb-6 group">
                      <div className="aspect-square relative">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.7 }}
                        />
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>
                      
                      {/* Quick View Overlay */}
                      {hoveredCard === item._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-6"
                        >
                          <motion.button
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            onClick={() => handleQuickView(item._id)}
                            className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 transition-all shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            👁️ Try On Preview
                          </motion.button>
                        </motion.div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-5">
                      {/* Title & Category */}
                      <div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-1">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 text-teal-600 dark:text-teal-400">
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
                        {item.description || "Handcrafted bracelet for everyday elegance"}
                      </p>

                      {/* Price & Features */}
                      <div className="flex items-center justify-between pt-4 border-t border-teal-500/20">
                        <div>
                          <motion.p 
                            className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            ₹{item.price}
                          </motion.p>
                          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Hypoallergenic & Adjustable
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold flex items-center gap-1">
                            <span className="text-amber-400">⭐</span> 4.8
                          </div>
                          <div className="text-xs text-gray-500">Best Seller</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/product/${item._id}`)}
                          className="flex-1 py-4 rounded-xl font-bold text-white transition-all shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)",
                            boxShadow: "0 8px 25px rgba(13, 148, 136, 0.4)"
                          }}
                        >
                          View Details
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/payment?productId=${item._id}`)}
                          className="px-6 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg"
                          style={{
                            background: "linear-gradient(135deg, #047857 0%, #10B981 100%)",
                            boxShadow: "0 8px 25px rgba(4, 120, 87, 0.4)"
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

      {/* Size Guide & CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-24 pt-16 border-t border-teal-500/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Size Guide */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 backdrop-blur-sm border border-teal-500/20"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Wristwatch className="w-8 h-8 text-teal-500" />
                Size Guide
              </h3>
              <div className="space-y-4">
                {[
                  { size: "Small", measurement: "6-6.5 inches", icon: "📏" },
                  { size: "Medium", measurement: "6.5-7 inches", icon: "📐" },
                  { size: "Large", measurement: "7-7.5 inches", icon: "📊" }
                ].map((guide, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{guide.icon}</span>
                      <span className="font-semibold">{guide.size}</span>
                    </div>
                    <span className="text-teal-600 dark:text-teal-400">{guide.measurement}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Bracelets;