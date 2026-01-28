import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, IceCream, Star } from "lucide-react";
import { FlashIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const ClassicVanilla = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    // ✅ Wishlist context
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const fetchVanilla = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Classic Vanilla"
                );

                if (res.data.success) {
                    // Simulate delay for better UX
                    setTimeout(() => {
                        setProducts(res.data.products);
                        setLoading(false);
                    }, 600);
                }
            } catch (err) {
                console.error("Classic Vanilla Fetch Error:", err);
                setLoading(false);
            }
        };

        fetchVanilla();
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
                        ? "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)"
                        : "linear-gradient(135deg, #fefce8 0%, #f8fafc 100%)"
                }}
            >
                <div className="animate-pulse mb-10">
                    <div className="h-10 w-72 bg-gradient-to-r from-amber-200 to-yellow-200 dark:from-amber-800 dark:to-yellow-800 rounded-lg mx-auto mb-2" />
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
                                boxShadow: "0 10px 25px rgba(245, 158, 11, 0.05)"
                            }}
                        >
                            <div className="h-64 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-800 dark:to-yellow-700 rounded-xl mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                                <div className="h-8 bg-gradient-to-r from-amber-300 to-yellow-300 dark:from-amber-700 dark:to-yellow-700 rounded w-1/3" />
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
                    ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #1a150f 100%)"
                    : "radial-gradient(circle at 50% 0%, #FEFCE8 0%, #FEF9C3 100%)",
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
                    <IceCream className="w-8 h-8 text-amber-500 animate-pulse" />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                        Classic Vanilla Collection
                    </h1>
                    <IceCream className="w-8 h-8 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    Timeless elegance meets creamy perfection. Our vanilla collection brings classic sophistication to modern style
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
                    { label: "Vanilla Items", value: products.length, icon: "🍦" },
                    { label: "From ₹299", value: "Classic", icon: "👑" },
                    { label: "Creamy", value: "Texture", icon: "✨" },
                    { label: "Elegant", value: "Design", icon: "💎" }
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className="px-5 py-3 rounded-xl backdrop-blur-sm flex flex-col items-center"
                        style={{
                            background: isDark
                                ? "rgba(245,158,11,0.1)"
                                : "rgba(255,251,235,0.8)",
                            border: isDark
                                ? "1px solid rgba(245,158,11,0.2)"
                                : "1px solid rgba(251,191,36,0.3)",
                            boxShadow: "0 8px 32px rgba(245,158,11,0.1)"
                        }}
                    >
                        <span className="text-2xl mb-1">{stat.icon}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                        <span className="block text-lg font-semibold text-amber-700 dark:text-amber-300">{stat.value}</span>
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
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 flex items-center justify-center">
                            <IceCream className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">No Vanilla Items Found</h3>
                        <p className="text-gray-500">Our classic collection is currently brewing!</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((item, index) => {
                            const isLiked = wishlist.some(w => w._id === item._id);
                            const isNew = index < 2; // First 2 items marked as new
                            const isBestSeller = item.price > 500;

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
                                    {/* Vanilla Badges */}
                                    <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                                        {isNew && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg">
                                                NEW
                                            </span>
                                        )}
                                        {isBestSeller && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                                                BESTSELLER
                                            </span>
                                        )}
                                        {item.category?.includes("Vanilla") && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-800 shadow-lg">
                                                🍦 CLASSIC
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
                                                ? "rgba(245,158,11,0.15)"
                                                : "rgba(255,251,235,0.9)",
                                            boxShadow: "0 8px 32px rgba(251,191,36,0.2)"
                                        }}
                                    >
                                        <Heart
                                            size={20}
                                            className={`transition-all duration-300 ${isLiked
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
                                                ? "linear-gradient(145deg, #1E293B 0%, #2c241a 100%)"
                                                : "linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 100%)",
                                            border: isDark
                                                ? "1px solid rgba(245,158,11,0.2)"
                                                : "1px solid rgba(251,191,36,0.3)",
                                            boxShadow: isDark
                                                ? hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(245,158,11,0.2)"
                                                    : "0 10px 30px rgba(0,0,0,0.2)"
                                                : hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(245,158,11,0.2)"
                                                    : "0 10px 30px rgba(245,158,11,0.08)",
                                            transform: hoveredCard === item._id ? "translateZ(20px)" : "none",
                                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                        }}
                                    >
                                        {/* Image Container with Creamy Effect */}
                                        <div className="relative overflow-hidden rounded-xl mb-5">
                                            <motion.img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-64 object-cover"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ duration: 0.6 }}
                                            />
                                            {/* Creamy Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Quick View Overlay */}
                                            {hoveredCard === item._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <button
                                                        onClick={() => handleQuickView(item._id)}
                                                        className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-md bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-2xl"
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
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={16}
                                                            className="fill-amber-400 text-amber-400"
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-sm opacity-70 line-clamp-2">
                                                {item.description || "Classic vanilla design with timeless elegance"}
                                            </p>

                                            {/* Price & Rating */}
                                            <div className="flex items-center justify-between pt-3 border-t border-amber-100 dark:border-amber-900">
                                                <div>
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                                        ₹{item.price}
                                                    </p>
                                                    {item.originalPrice && (
                                                        <p className="text-sm line-through text-gray-500">
                                                            ₹{item.originalPrice}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-amber-600 dark:text-amber-400">
                                                    ⭐ 4.9 (112)
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
                                                        background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                                                        boxShadow: "0 4px 15px rgba(217,119,6,0.4)"
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
                                                        background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
                                                        boxShadow: "0 4px 15px rgba(245,158,11,0.4)"
                                                    }}
                                                >
                                                    <FlashIcon className="w-5 h-5" />
                                                    Buy Now
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Vanilla Cream Hover Effect */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.1) 0%, transparent 70%)"
                                            }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Ice Cream */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="fixed bottom-10 right-10 hidden lg:block"
            >
                <div className="p-4 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 shadow-xl">
                    <IceCream className="w-8 h-8 text-amber-600" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ClassicVanilla;