import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, FolderInput, Droplets } from "lucide-react";
import { FlashIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const BerryMinimum = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    // ✅ Wishlist context
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const fetchBerry = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Berry Minimum"
                );

                if (res.data.success) {
                    // Simulate delay for better UX
                    setTimeout(() => {
                        setProducts(res.data.products);
                        setLoading(false);
                    }, 600);
                }
            } catch (err) {
                console.error("Berry Minimum Fetch Error:", err);
                setLoading(false);
            }
        };

        fetchBerry();
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
                    <div className="h-10 w-64 bg-gradient-to-r from-pink-300 to-rose-300 dark:from-pink-700 dark:to-rose-700 rounded-lg mx-auto mb-2" />
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
                            <div className="h-64 bg-gradient-to-br from-pink-200 to-rose-200 dark:from-pink-800 dark:to-rose-700 rounded-xl mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                                <div className="h-8 bg-gradient-to-r from-pink-300 to-rose-300 dark:from-pink-700 dark:to-rose-700 rounded w-1/3" />
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
                    ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #1a0f14 100%)"
                    : "radial-gradient(circle at 50% 0%, #FDF2F8 0%, #FCE7F3 100%)",
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
                    <Droplets className="w-8 h-8 text-pink-500 animate-bounce" />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
                        Berry Minimum Collection
                    </h1>
                    <FolderInput className="w-8 h-8 text-rose-500 animate-bounce" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    Minimal elegance with berry-inspired hues. Simple, sophisticated, and stunningly beautiful
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
                    { label: "Berry Items", value: products.length },
                    { label: "From ₹299", value: "Minimal" },
                    { label: "Elegant", value: "Designs" },
                    { label: "Fast", value: "Delivery" }
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className="px-4 py-2 rounded-full backdrop-blur-sm"
                        style={{
                            background: isDark
                                ? "rgba(244,114,182,0.1)"
                                : "rgba(253,242,248,0.7)",
                            border: isDark
                                ? "1px solid rgba(244,114,182,0.2)"
                                : "1px solid rgba(236,72,153,0.3)"
                        }}
                    >
                        <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                        <span className="block text-lg font-semibold text-rose-600 dark:text-rose-400">{stat.value}</span>
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
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 flex items-center justify-center">
                            <Droplets className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">No Berry Items Found</h3>
                        <p className="text-gray-500">Check back soon for new minimal arrivals!</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((item, index) => {
                            const isLiked = wishlist.some(w => w._id === item._id);
                            const isNew = index < 3; // First 3 items marked as new
                            const isPremium = item.price > 700; // Premium items

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
                                    {/* Berry Badges */}
                                    <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                                        {isNew && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg">
                                                NEW
                                            </span>
                                        )}
                                        {isPremium && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg">
                                                PREMIUM
                                            </span>
                                        )}
                                        {item.category?.includes("Berry") && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg">
                                                🍓 BERRY
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
                                                ? "rgba(244,114,182,0.15)"
                                                : "rgba(253,242,248,0.9)",
                                            boxShadow: "0 8px 32px rgba(236,72,153,0.2)"
                                        }}
                                    >
                                        <Heart
                                            size={20}
                                            className={`transition-all duration-300 ${isLiked
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-rose-600 dark:text-rose-400"
                                                }`}
                                        />
                                    </motion.button>

                                    {/* Card Container */}
                                    <div
                                        className="relative overflow-hidden rounded-2xl p-5 h-full"
                                        style={{
                                            background: isDark
                                                ? "linear-gradient(145deg, #1E293B 0%, #2c0f1a 100%)"
                                                : "linear-gradient(145deg, #FFFFFF 0%, #FDF2F8 100%)",
                                            border: isDark
                                                ? "1px solid rgba(236,72,153,0.2)"
                                                : "1px solid rgba(236,72,153,0.3)",
                                            boxShadow: isDark
                                                ? hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(236,72,153,0.2)"
                                                    : "0 10px 30px rgba(0,0,0,0.2)"
                                                : hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(236,72,153,0.3)"
                                                    : "0 10px 30px rgba(236,72,153,0.1)",
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
                                            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Quick View Overlay */}
                                            {hoveredCard === item._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <button
                                                        onClick={() => handleQuickView(item._id)}
                                                        className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-md bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 transition-all transform hover:scale-105 shadow-2xl"
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
                                                <div className="flex items-center text-pink-500">
                                                    <span className="text-sm">🍓</span>
                                                    <span className="ml-1 text-sm">Minimal</span>
                                                </div>
                                            </div>

                                            <p className="text-sm opacity-70 line-clamp-2">
                                                {item.description || "Minimal berry-inspired design with elegant simplicity"}
                                            </p>

                                            {/* Price & Rating */}
                                            <div className="flex items-center justify-between pt-3 border-t border-pink-100 dark:border-pink-900">
                                                <div>
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                                                        ₹{item.price}
                                                    </p>
                                                    {item.originalPrice && (
                                                        <p className="text-sm line-through text-gray-500">
                                                            ₹{item.originalPrice}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-rose-600 dark:text-rose-400">
                                                    ⭐ 4.6 (84)
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
                                                        background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
                                                        boxShadow: "0 4px 15px rgba(236,72,153,0.4)"
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
                                                        background: "linear-gradient(135deg, #be185d 0%, #9d174d 100%)",
                                                        boxShadow: "0 4px 15px rgba(190,24,93,0.4)"
                                                    }}
                                                >
                                                    <FlashIcon className="w-5 h-5" />
                                                    Buy Now
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Berry Hover Glow Effect */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at 50% 0%, rgba(236,72,153,0.15) 0%, transparent 70%)"
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

export default BerryMinimum;