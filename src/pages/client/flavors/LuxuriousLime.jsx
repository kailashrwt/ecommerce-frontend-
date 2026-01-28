import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Zap, Leaf } from "lucide-react";
import { FlashIcon } from "../../../components/Icons";
import { useWishlist } from "../../../context/WishlistContext";

const LuxuriousLime = ({ theme = "light" }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    // ✅ Wishlist context
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const fetchLime = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    "https://ecommerce-backend-s1l7.onrender.com/api/products/category/Luxurious Lime"
                );

                if (res.data.success) {
                    // Simulate delay for better UX
                    setTimeout(() => {
                        setProducts(res.data.products);
                        setLoading(false);
                    }, 600);
                }
            } catch (err) {
                console.error("Luxurious Lime Fetch Error:", err);
                setLoading(false);
            }
        };

        fetchLime();
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
                    <div className="h-10 w-64 bg-gradient-to-r from-lime-300 to-emerald-300 dark:from-lime-700 dark:to-emerald-700 rounded-lg mx-auto mb-2" />
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
                            <div className="h-64 bg-gradient-to-br from-lime-200 to-emerald-200 dark:from-lime-800 dark:to-emerald-700 rounded-xl mb-4" />
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                                <div className="h-8 bg-gradient-to-r from-lime-300 to-emerald-300 dark:from-lime-700 dark:to-emerald-700 rounded w-1/3" />
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
                    ? "radial-gradient(circle at 50% 0%, #0F172A 0%, #0a1a0f 100%)"
                    : "radial-gradient(circle at 50% 0%, #F7FEE7 0%, #ECFCCB 100%)",
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
                    <Leaf className="w-8 h-8 text-lime-500 animate-bounce" />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                        Luxurious Lime Collection
                    </h1>
                    <Leaf className="w-8 h-8 text-emerald-500 animate-bounce" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    Fresh, vibrant lime-inspired jewelry that brings nature's luxury to your elegance
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
                    { label: "Luxe Items", value: products.length },
                    { label: "From ₹499", value: "Premium" },
                    { label: "Eco-Friendly", value: "Materials" },
                    { label: "Natural", value: "Elegance" }
                ].map((stat, idx) => (
                    <div
                        key={idx}
                        className="px-4 py-2 rounded-full backdrop-blur-sm"
                        style={{
                            background: isDark
                                ? "rgba(132,204,22,0.1)"
                                : "rgba(236,252,203,0.7)",
                            border: isDark
                                ? "1px solid rgba(132,204,22,0.2)"
                                : "1px solid rgba(163,230,53,0.3)"
                        }}
                    >
                        <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                        <span className="block text-lg font-semibold text-lime-600 dark:text-lime-400">{stat.value}</span>
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
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-lime-500/10 to-emerald-500/10 flex items-center justify-center">
                            <Leaf className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">No Luxurious Lime Items Found</h3>
                        <p className="text-gray-500">Fresh arrivals coming soon!</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                        {products.map((item, index) => {
                            const isLiked = wishlist.some(w => w._id === item._id);
                            const isNew = index < 3; // First 3 items marked as new
                            const isPremium = item.price > 1000; // Premium items

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
                                    {/* Lime Badges */}
                                    <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
                                        {isNew && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                                                NEW ARRIVAL
                                            </span>
                                        )}
                                        {isPremium && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-lg">
                                                LUXURY
                                            </span>
                                        )}
                                        {item.category?.includes("Lime") && (
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg">
                                                🍈 LIME LUXE
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
                                                ? "rgba(132,204,22,0.15)"
                                                : "rgba(236,252,203,0.9)",
                                            boxShadow: "0 8px 32px rgba(163,230,53,0.2)"
                                        }}
                                    >
                                        <Heart
                                            size={20}
                                            className={`transition-all duration-300 ${isLiked
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-lime-600 dark:text-lime-400"
                                                }`}
                                        />
                                    </motion.button>

                                    {/* Card Container */}
                                    <div
                                        className="relative overflow-hidden rounded-2xl p-5 h-full"
                                        style={{
                                            background: isDark
                                                ? "linear-gradient(145deg, #1E293B 0%, #0f2a1a 100%)"
                                                : "linear-gradient(145deg, #FFFFFF 0%, #F7FEE7 100%)",
                                            border: isDark
                                                ? "1px solid rgba(163,230,53,0.2)"
                                                : "1px solid rgba(163,230,53,0.3)",
                                            boxShadow: isDark
                                                ? hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(163,230,53,0.2)"
                                                    : "0 10px 30px rgba(0,0,0,0.2)"
                                                : hoveredCard === item._id
                                                    ? "0 25px 50px -12px rgba(163,230,53,0.3)"
                                                    : "0 10px 30px rgba(163,230,53,0.1)",
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

                                            {/* Quick View Overlay */}
                                            {hoveredCard === item._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="absolute inset-0 flex items-center justify-center"
                                                >
                                                    <button
                                                        onClick={() => handleQuickView(item._id)}
                                                        className="px-6 py-3 rounded-full font-semibold text-white backdrop-blur-md bg-gradient-to-r from-lime-500 to-emerald-600 hover:from-lime-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-2xl"
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
                                                <div className="flex items-center text-lime-500">
                                                    <span className="text-sm">🍈</span>
                                                    <span className="ml-1 text-sm">Lime Fresh</span>
                                                </div>
                                            </div>

                                            <p className="text-sm opacity-70 line-clamp-2">
                                                {item.description || "Luxurious lime-inspired design with elegant green accents"}
                                            </p>

                                            {/* Price & Rating */}
                                            <div className="flex items-center justify-between pt-3 border-t border-lime-100 dark:border-lime-900">
                                                <div>
                                                    <p className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 bg-clip-text text-transparent">
                                                        ₹{item.price}
                                                    </p>
                                                    {item.originalPrice && (
                                                        <p className="text-sm line-through text-gray-500">
                                                            ₹{item.originalPrice}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-lime-600 dark:text-lime-400">
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
                                                        background: "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
                                                        boxShadow: "0 4px 15px rgba(132,204,22,0.4)"
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
                                                        background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                                                        boxShadow: "0 4px 15px rgba(34,197,94,0.4)"
                                                    }}
                                                >
                                                    <FlashIcon className="w-5 h-5" />
                                                    Buy Now
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Lime Hover Glow Effect */}
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at 50% 0%, rgba(163,230,53,0.15) 0%, transparent 70%)"
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

export default LuxuriousLime;