import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, Crown, Gem } from "lucide-react";
import { FlashIcon, StarIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const Necklace = ({ theme = "light" }) => {
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const navigate = useNavigate();

  // ✅ Wishlist context
  const { wishlist, toggleWishlist } = useWishlist();

  // Materials filter
  const materials = ["All", "Gold", "Silver", "Diamond", "Pearl", "Platinum"];

  useEffect(() => {
    const fetchNecklace = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Necklace"
        );

        if (res.data.success) {
          // Simulate delay for better UX
          setTimeout(() => {
            setProducts(res.data.products);
            setLoading(false);
          }, 700);
        }
      } catch (err) {
        console.error("Necklace Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchNecklace();
  }, []);

  const handleQuickView = (productId) => {
    navigate(`/product/${productId}?quickview=true`);
  };

  // Filter products by material
  const filteredProducts = selectedMaterial === "All" 
    ? products 
    : products.filter(item => 
        item.name?.toLowerCase().includes(selectedMaterial.toLowerCase()) ||
        item.description?.toLowerCase().includes(selectedMaterial.toLowerCase())
      );

  // Premium Skeleton Loader
  if (loading) {
    return (
      <div 
        className="px-4 sm:px-6 md:px-10 py-8 min-h-screen"
        style={{ 
          background: isDark 
            ? "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)" 
            : "linear-gradient(135deg, #F8FAFC 0%, #FDF4FF 100%)" 
        }}
      >
        {/* Animated Header Skeleton */}
        <div className="text-center mb-12">
          <div className="animate-pulse inline-flex items-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full" />
            <div className="h-12 w-64 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded-2xl" />
            <div className="w-10 h-10 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-full" />
          </div>
          <div className="h-5 w-80 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto" />
        </div>

        {/* Filter Skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
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
                  ? "linear-gradient(145deg, #1E293B 0%, #312E81 30%)" 
                  : "linear-gradient(145deg, #FFFFFF 0%, #FAF5FF 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
            >
              <div className="h-72 bg-gradient-to-br from-gray-200 via-amber-100 to-yellow-100 dark:from-gray-700 dark:via-amber-900/30 dark:to-yellow-900/30 rounded-2xl mb-6" />
              <div className="space-y-4">
                <div className="h-6 bg-gradient-to-r from-gray-300 to-amber-200 dark:from-gray-600 dark:to-amber-800/50 rounded-lg w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                <div className="h-12 bg-gradient-to-r from-amber-400 to-yellow-500 dark:from-amber-600 dark:to-yellow-700 rounded-xl w-2/3" />
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
      transition={{ duration: 1 }}
      className="px-4 sm:px-6 md:px-10 py-8 lg:py-12"
      style={{
        background: isDark 
          ? "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)" 
          : "linear-gradient(135deg, #F8FAFC 0%, #FDF4FF 50%, #F8FAFC 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Luxury Header with Crown */}
      <motion.div 
        initial={{ y: -50, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="text-center mb-16 relative"
      >
        {/* Animated Crown Background */}
        <div className="absolute inset-0 flex justify-center items-center opacity-10">
          <Crown className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative inline-flex items-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Gem className="w-12 h-12 text-amber-500" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-300 bg-clip-text text-transparent">
            Necklace Collection
          </h1>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Gem className="w-12 h-12 text-yellow-500" />
          </motion.div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Royal elegance crafted for the extraordinary
        </motion.p>
      </motion.div>

      {/* Material Filter Chips */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {materials.map((material) => (
          <motion.button
            key={material}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMaterial(material)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedMaterial === material
                ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-2xl"
                : "bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 shadow-lg backdrop-blur-sm"
            }`}
            style={{
              border: "1px solid rgba(255,255,255,0.2)"
            }}
          >
            {material === "Diamond" ? "💎 " : material === "Gold" ? "🌟 " : ""}
            {material}
          </motion.button>
        ))}
      </motion.div>

      {/* Collection Stats */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16"
      >
        {[
          { icon: "👑", label: "Royal Designs", value: products.length, color: "from-amber-500 to-yellow-500" },
          { icon: "💎", label: "Premium Stones", value: "100%", color: "from-blue-400 to-cyan-400" },
          { icon: "✨", label: "Handcrafted", value: "Yes", color: "from-purple-500 to-pink-500" },
          { icon: "🏆", label: "Certified", value: "24K", color: "from-emerald-500 to-teal-500" }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05, y: -8 }}
            className={`p-6 rounded-3xl bg-gradient-to-br ${stat.color} shadow-2xl`}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{stat.icon}</span>
              <div>
                <div className="text-sm font-medium text-white/90">{stat.label}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
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
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
              <Crown className="w-20 h-20 text-amber-400" />
            </div>
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Royal Collection Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              Our artisans are crafting exquisite necklaces for you
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item, index) => {
              const isLiked = wishlist.some(w => w._id === item._id);
              const isRoyal = item.price > 5000;

              return (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 60, rotateY: 90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    y: -20,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onMouseEnter={() => setHoveredCard(item._id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative group cursor-pointer"
                  style={{ perspective: 1000 }}
                >
                  {/* Royal Badge */}
                  {isRoyal && (
                    <div className="absolute -top-3 -right-3 z-30">
                      <div className="px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-2xl flex items-center gap-2">
                        <Crown className="w-4 h-4" />
                        ROYAL
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
                    className="absolute left-4 top-4 z-20 p-3 rounded-full backdrop-blur-md"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      background: "rgba(255, 215, 0, 0.3)"
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
                        ? "linear-gradient(145deg, #1E293B 0%, #312E81 100%)" 
                        : "linear-gradient(145deg, #FFFFFF 0%, #FEFCE8 100%)",
                      border: "2px solid transparent",
                      backgroundImage: isDark 
                        ? "linear-gradient(145deg, #1E293B 0%, #312E81 100%), linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)"
                        : "linear-gradient(145deg, #FFFFFF 0%, #FEFCE8 100%), linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                      boxShadow: hoveredCard === item._id
                        ? "0 40px 80px -20px rgba(251, 191, 36, 0.3), 0 0 60px rgba(245, 158, 11, 0.2)"
                        : "0 25px 50px -12px rgba(0,0,0,0.25)",
                      transform: hoveredCard === item._id ? "translateZ(40px)" : "none",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    {/* Gold Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.2) 0%, transparent 70%)"
                      }}
                    />

                    {/* Image Container with Reflection */}
                    <div className="relative overflow-hidden rounded-2xl mb-6 group">
                      <div className="aspect-square relative">
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.8 }}
                        />
                        {/* Reflection Effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      {/* Quick View Overlay */}
                      {hoveredCard === item._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-6"
                        >
                          <motion.button
                            initial={{ y: 20 }}
                            animate={{ y: 0 }}
                            onClick={() => handleQuickView(item._id)}
                            className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 transition-all shadow-2xl"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            ✨ Quick Look
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
                          <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-600 dark:text-amber-400">
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
                        {item.description || "Exquisite necklace with premium craftsmanship"}
                      </p>

                      {/* Price & Rating */}
                      <div className="flex items-center justify-between pt-4 border-t border-amber-500/20">
                        <div>
                          <motion.p 
                            className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            ₹{item.price}
                          </motion.p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                            🚚 Free Insured Shipping
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold flex items-center gap-1">
                            <span className="text-amber-400">⭐</span> 5.0
                          </div>
                          <div className="text-xs text-gray-500">Luxury Rated</div>
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
                            background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
                            boxShadow: "0 8px 25px rgba(245, 158, 11, 0.4)"
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
                            background: "linear-gradient(135deg, #B45309 0%, #F59E0B 100%)",
                            boxShadow: "0 8px 25px rgba(180, 83, 9, 0.4)"
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

      {/* Luxury CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-24 pt-16 border-t border-amber-500/20"
      >
      </motion.div>
    </motion.div>
  );
};

export default Necklace;