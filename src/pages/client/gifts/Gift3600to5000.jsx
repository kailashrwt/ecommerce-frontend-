import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, Gift, Package, Crown, Star } from "lucide-react";
import { FlashIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const Gift3600To5000 = ({ theme = "light" }) => {
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
                    "https://ecommerce-backend-s1l7.onrender.com/api/products/price/3600/5000"
                );

                if (res.data.success) {
                    // Simulate delay for better UX
                    setTimeout(() => {
                        setProducts(res.data.products);
                        setLoading(false);
                    }, 600);
                }
            } catch (err) {
                console.log("Gift 3600-5000 fetch error:", err);
                setLoading(false);
            }
        };

        fetchGifts();
    }, []);

    const handleQuickView = (productId) => {
        navigate(`/product/${productId}?quickview=true`);
    };

    // Skeleton Loader
    if (loading) {
        return (
            <div
                className="px-4 sm:px-6 md:px-10 py-6 min-h-screen"
                style={{
                    background: isDark
                        ? "#0F172A"
                        : "linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)"
                }}
            >
                <div className="animate-pulse mb-10">
                    <div className="h-10 w-72 bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700 rounded-lg mx-auto mb-2" />
                    <div className="h-4 w-56 bg-gray-200 dark:bg-gray-600 rounded mx-auto" />
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
                            <div className="h-64 bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-emerald-800 dark:to-teal-700 rounded-xl mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                                <div className="h-8 bg-gradient-to-r from-emerald-300 to-teal-300 dark:from-emerald-700 dark:to-teal-700 rounded w-1/3" />
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
                    ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #0c1a14 100%)"
                    : "radial-gradient(circle at 50% 0%, #F0F9FF 0%, #CCFBF1 100%)",
                minHeight: "100vh",
            }}
        >
            {/* Premium Header Section */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-3 mb-3">
                    <Gift className="w-8 h-8 text-emerald-500 animate-bounce" />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                        Premium Gifts Collection
                    </h1>
                    <Crown className="w-8 h-8 text-amber-500" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    Exquisite gifts priced between ₹3600 – ₹5000, perfect for special occasions and luxury gifting
                </p>

                {/* Price Range Badge */}
                <div className="inline-flex items-center gap-2 mt-4 px-6 py-2 rounded-full"
                    style={{
                        background: isDark
                            ? "rgba(6, 95, 70, 0.2)"
                            : "rgba(167, 243, 208, 0.4)",
                        border: isDark
                            ? "1px solid rgba(16, 185, 129, 0.3)"
                            : "1px solid rgba(16, 185, 129, 0.4)"
                    }}
                >
                    <Package className="w-4 h-4 text-emerald-500" />
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹3,600 – ₹5,000 Range
                    </span>
                </div>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
            >
                {[
                    { label: "Premium Gifts", value: products.length, icon: <Gift className="w-4 h-4" /> },
                    { label: "Avg Rating", value: "4.9⭐", icon: <Star className="w-4 h-4" /> },
                    { label: "Luxury", value: "Quality", icon: <Crown className="w-4 h-4" /> },
                    { label: "Gift Wrap", value: "Free", icon: <Package className="w-4 h-4" /> }
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className="px-4 py-3 rounded-xl backdrop-blur-sm flex items-center gap-2"
                        style={{
                            background: isDark
                                ? "rgba(6, 78, 59, 0.2)"
                                : "rgba(167, 243, 208, 0.3)",
                            border: isDark
                                ? "1px solid rgba(16, 185, 129, 0.2)"
                                : "1px solid rgba(16, 185, 129, 0.3)"
                        }}
                    >
                        <div className="text-emerald-500">{stat.icon}</div>
                        <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                            <span className="block text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                                {stat.value}
                            </span>
                        </div>
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
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
                            <Gift className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">No Premium Gifts Found</h3>
                        <p className="text-gray-500">Explore other price ranges for amazing gifts!</p>
                        <button
                            onClick={() => navigate("/gifts")}
                            className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                        >
                            Browse All Gifts
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((item, index) => {
                            const isLiked = wishlist.some(w => w._id === item._id);
                            const isPremiumGift = item.price > 4000;
                            const isBestSeller = index < 2;

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
                                    {/* Premium Badges */}
                                    <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                                        {isBestSeller && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg flex items-center gap-1">
                                                <Crown className="w-3 h-3" />
                                                BESTSELLER
                                            </span>
                                        )}
                                        {isPremiumGift && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
                                                ⭐ PREMIUM
                                            </span>
                                        )}
                                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                                            ₹{item.price}
                                        </span>
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
                                                ? "rgba(16, 185, 129, 0.15)"
                                                : "rgba(167, 243, 208, 0.8)",
                                            boxShadow: "0 8px 32px rgba(16, 185, 129, 0.2)"
                                        }}
                                    >
                                        <Heart
                                            size={20}
                                            className={`transition-all duration-300 ${isLiked
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-emerald-600 dark:text-emerald-400"
                                                }`}
                                        />
                                    </motion.button>

                                    {/* Gift Card Container */}
                                    <div
                                        className="relative overflow-hidden rounded-2xl p-5 h-full"
                                        style={{
                                            background: isDark
                                                ? "linear-gradient(145deg, #1E293B 0%, #0f2c22 100%)"
                                                : "linear-gradient(145deg, #FFFFFF 0%, #F0FDF4 100%)",
                                            border: isDark
                                                ? "1px solid rgba(16, 185, 129, 0.2)"
                                                : "1px solid rgba(167, 243, 208, 0.5)",
                                            boxShadow: isDark
                                                ? hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(16, 185, 129, 0.2)"
                                                    : "0 10px 30px rgba(0,0,0,0.2)"
                                                : hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(16, 185, 129, 0.3)"
                                                    : "0 10px 30px rgba(167, 243, 208, 0.2)",
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Gift Tag */}
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                GIFT READY
                                            </div>

                                            {/* Quick View Overlay */}
                                            {hoveredCard === item._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <button
                                                        onClick={() => handleQuickView(item._id)}
                                                        className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-md bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-2"
                                                    >
                                                        <Gift className="w-4 h-4" />
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
                                                <div className="flex items-center text-emerald-500">
                                                    <Star className="w-4 h-4 fill-emerald-500" />
                                                    <span className="ml-1 text-sm">4.9</span>
                                                </div>
                                            </div>

                                            <p className="text-sm opacity-70 line-clamp-2">
                                                {item.description || "Premium gift item perfect for special occasions"}
                                            </p>

                                            {/* Price Range Highlight */}
                                            <div className="pt-3 border-t border-emerald-100 dark:border-emerald-900">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
                                                            ₹{item.price}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {item.originalPrice ? `Was ₹${item.originalPrice}` : 'Premium Price Range'}
                                                        </p>
                                                    </div>
                                                    <div className="text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400">
                                                        Luxury Gift
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3 pt-4">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => navigate(`/product/${item._id}`)}
                                                    className="flex-1 py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                                                    style={{
                                                        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                                                        boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)"
                                                    }}
                                                >
                                                    <Package className="w-4 h-4" />
                                                    View Details
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => navigate(`/payment?productId=${item._id}`)}
                                                    className="px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all"
                                                    style={{
                                                        background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                                                        boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)"
                                                    }}
                                                >
                                                    <FlashIcon className="w-5 h-5" />
                                                    Buy Now
                                                </motion.button>
                                            </div>

                                            {/* Gift Note */}
                                            <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 pt-2">
                                                🎁 Free gift wrapping included
                                            </p>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)"
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

export default Gift3600To5000;