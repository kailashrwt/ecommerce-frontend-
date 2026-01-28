import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FlashIcon,
    HeartIcon,
    ShoppingCartIcon,
    EyeIcon,
    TrendingUpIcon,
    ClockIcon,
    FireIcon
} from "../components/Icons";
import { useWishlist } from "../context/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const Sale = ({ theme = "light", setCartCount }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useWishlist();

    // Sale countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // 🛒 Add to Cart Function
    const handleAddToCart = async (productId, e) => {
        if (e) e.stopPropagation();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first!");
            return;
        }

        try {
            const res = await axios.post(
                "https://ecommerce-backend-s1l7.onrender.com/api/cart/add",
                { productId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.success) {
                alert("Added to Cart!");
                if (setCartCount) {
                    setCartCount((prev) => prev + 1);
                }
            }
        } catch (err) {
            console.log("Add to Cart Error:", err);
            alert("Failed to add item.");
        }
    };

    // ❤️ Handle Wishlist
    const handleWishlistToggle = (item, e) => {
        if (e) e.stopPropagation();
        toggleWishlist(item);
    };

    // 👁️ Quick View
    const handleQuickView = (item, e) => {
        if (e) e.stopPropagation();
        setQuickViewProduct(item);
    };

    useEffect(() => {
        const fetchSaleProducts = async () => {
            try {
                const res = await axios.get(
                    "https://ecommerce-backend-s1l7.onrender.com/api/products/price/0/2000"
                );

                if (res.data.success) {
                    const productsWithDiscount = res.data.products.map(product => ({
                        ...product,
                        originalPrice: Math.round(product.price * 1.4), // 40% discount simulation
                        discountPercent: Math.floor(Math.random() * 30) + 20 // 20-50% discount
                    }));

                    // Sort by discount (highest first)
                    productsWithDiscount.sort((a, b) => b.discountPercent - a.discountPercent);

                    setProducts(productsWithDiscount);
                    setFilteredProducts(productsWithDiscount);
                }
            } catch (err) {
                console.error("Sale Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleProducts();
    }, []);

    // Skeleton Loader Component
    const SkeletonLoader = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl overflow-hidden"
                    style={{
                        background: isDark ? "#1E293B" : "#ffffff",
                        border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                    }}
                >
                    <div className="aspect-square bg-gray-300 dark:bg-gray-700 animate-pulse relative">
                        <div className="absolute top-3 left-3 w-16 h-6 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
                    </div>
                    <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        <div className="flex justify-between">
                            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                            <div className="h-10 bg-gray-400 dark:bg-gray-500 rounded w-24"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );

    // Empty State Component
    const EmptyState = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
        >
            <div className="text-6xl mb-4">🔥</div>
            <h3 className="text-2xl font-bold mb-2">Sale Ended!</h3>
            <p className="opacity-70 mb-6 max-w-md mx-auto">
                The summer sale has concluded. Don't worry! New exciting offers are coming soon.
            </p>
            <button
                onClick={() => navigate('/shop')}
                className="px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
                style={{
                    background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                }}
            >
                Continue Shopping
            </button>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-28 px-6 md:px-12 pb-12"
            style={{
                background: isDark ? "#0F172A" : "#F8FAFC",
                minHeight: "100vh",
                color: isDark ? "white" : "black",
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* 🔥 Sale Header with Countdown */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                        style={{
                            background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                            color: "white",
                        }}
                    >
                        <FireIcon className="w-5 h-5" />
                        <span className="font-bold">LIMITED TIME OFFER</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        🔥 SUMMER SALE 🔥
                    </h1>

                    <p className="text-lg opacity-80 mb-6 max-w-2xl mx-auto">
                        Grab the hottest deals with up to 50% OFF! Limited stock available.
                    </p>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-4 px-6 py-3 rounded-xl mb-8"
                        style={{
                            background: isDark ? "#1E293B" : "#ffffff",
                            boxShadow: "0 8px 32px rgba(244, 63, 94, 0.1)",
                            border: "2px solid rgba(244, 63, 94, 0.2)",
                        }}
                    >
                        <ClockIcon className="w-5 h-5 text-red-500" />
                        <div className="flex gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-500">{String(timeLeft.hours).padStart(2, '0')}</div>
                                <div className="text-xs opacity-70">HOURS</div>
                            </div>
                            <div className="text-2xl text-gray-400">:</div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-500">{String(timeLeft.minutes).padStart(2, '0')}</div>
                                <div className="text-xs opacity-70">MIN</div>
                            </div>
                            <div className="text-2xl text-gray-400">:</div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-500">{String(timeLeft.seconds).padStart(2, '0')}</div>
                                <div className="text-xs opacity-70">SEC</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-500">{filteredProducts.length}</div>
                            <div className="text-sm opacity-70">Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-500">UPTO 50%</div>
                            <div className="text-sm opacity-70">Discount</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-500">₹0-2000</div>
                            <div className="text-sm opacity-70">Price Range</div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <SkeletonLoader />
                ) : filteredProducts.length === 0 ? (
                    <EmptyState />
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
                    >
                        {filteredProducts.map((item, index) => (
                            <motion.div
                                key={item._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                                className="rounded-2xl overflow-hidden cursor-pointer group relative"
                                style={{
                                    background: isDark
                                        ? "rgba(30, 41, 59, 0.8)"
                                        : "rgba(255, 255, 255, 0.9)",
                                    backdropFilter: "blur(10px)",
                                    border: isDark
                                        ? "1px solid rgba(255, 255, 255, 0.1)"
                                        : "1px solid rgba(0, 0, 0, 0.1)",
                                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                }}
                                onClick={() => navigate(`/product/${item._id}`)}
                                onMouseEnter={() => setHoveredProduct(item._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                {/* 🔥 Sale Badge */}
                                <div className="absolute top-3 left-3 z-10">
                                    <div className="flex flex-col gap-1">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="px-3 py-1 rounded-lg text-white font-bold text-sm"
                                            style={{
                                                background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                                                boxShadow: "0 4px 12px rgba(244, 63, 94, 0.4)",
                                            }}
                                        >
                                            🔥 {item.discountPercent}% OFF
                                        </motion.div>
                                        {item.discountPercent > 35 && (
                                            <div className="px-2 py-1 rounded bg-yellow-500 text-white text-xs font-bold">
                                                ⚡ HOT DEAL
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ❤️ Wishlist Button */}
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => handleWishlistToggle(item, e)}
                                    className="absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm"
                                    style={{
                                        background: wishlist.some(w => w._id === item._id)
                                            ? "rgba(239, 68, 68, 0.9)"
                                            : "rgba(255, 255, 255, 0.9)",
                                    }}
                                >
                                    <HeartIcon
                                        className="w-5 h-5"
                                        style={{
                                            color: wishlist.some(w => w._id === item._id) ? "white" : "#ef4444",
                                            fill: wishlist.some(w => w._id === item._id) ? "#ef4444" : "none",
                                        }}
                                    />
                                </motion.button>

                                {/* Image Container */}
                                <div className="relative aspect-square overflow-hidden">
                                    <motion.img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Category Tag */}
                                    <div className="absolute bottom-3 left-3">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium"
                                            style={{
                                                background: isDark ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)",
                                            }}
                                        >
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Hover Overlay with Quick Actions */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: hoveredProduct === item._id ? 1 : 0 }}
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4"
                                    >
                                        <div className="space-y-2">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={(e) => handleAddToCart(item._id, e)}
                                                className="w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                                                style={{
                                                    background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                                    color: "#fff",
                                                    boxShadow: "0 4px 20px rgba(78,205,196,0.5)",
                                                }}
                                            >
                                                <ShoppingCartIcon className="w-5 h-5" />
                                                Add to Cart
                                            </motion.button>

                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={(e) => handleQuickView(item, e)}
                                                    className="flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                                                    style={{
                                                        background: "rgba(255, 255, 255, 0.9)",
                                                        color: "#333",
                                                    }}
                                                >
                                                    <EyeIcon className="w-4 h-4" />
                                                    Quick View
                                                </motion.button>

                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => navigate(`/payment?productId=${item._id}`)}
                                                    className="flex-1 py-2 rounded-lg font-medium flex items-center justify-center gap-2"
                                                    style={{
                                                        background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                                                        color: "#fff",
                                                    }}
                                                >
                                                    <FlashIcon className="w-4 h-4" />
                                                    Buy Now
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg line-clamp-1 mb-2 group-hover:text-red-500 transition-colors">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm opacity-70 mb-3 line-clamp-2">
                                        {item.description || "Special sale item - Limited stock!"}
                                    </p>

                                    {/* Price Section */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-green-500">
                                                    ₹{item.price.toLocaleString()}
                                                </span>
                                                <span className="text-sm line-through opacity-60">
                                                    ₹{item.originalPrice?.toLocaleString()}
                                                </span>
                                                <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold">
                                                    Save ₹{(item.originalPrice - item.price).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1">
                                                <TrendingUpIcon className="w-4 h-4 text-green-500" />
                                                <span className="text-xs opacity-70">{item.discountPercent}% cheaper than market</span>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => handleAddToCart(item._id, e)}
                                            className="px-4 py-2 rounded-lg font-semibold transition-all"
                                            style={{
                                                background: "linear-gradient(135deg, #f472b6 0%, #d946ef 100%)",
                                                color: "#fff",
                                                boxShadow: "0 4px 12px rgba(244, 114, 182, 0.3)",
                                            }}
                                        >
                                            <ShoppingCartIcon className="inline mr-1 h-4 w-4" />
                                            Add
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* CTA Banner */}
                {filteredProducts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 p-8 rounded-2xl text-center"
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)",
                        }}
                    >
                        <h2 className="text-3xl font-bold mb-3">🎉 Don't Miss Out!</h2>
                        <p className="opacity-90 mb-6 max-w-2xl mx-auto">
                            These deals won't last forever! Shop now and save big on summer essentials.
                        </p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="px-8 py-3 rounded-lg font-bold transition-all hover:scale-105"
                            style={{
                                background: "rgba(255, 255, 255, 0.2)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.3)",
                            }}
                        >
                            Explore All Products →
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickViewProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        style={{
                            background: "rgba(0, 0, 0, 0.8)",
                            backdropFilter: "blur(10px)",
                        }}
                        onClick={() => setQuickViewProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            style={{
                                background: isDark ? "#1E293B" : "#ffffff",
                                color: isDark ? "#F8FAFC" : "#0F172A",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold">{quickViewProduct.name}</h2>
                                        <p className="opacity-70">{quickViewProduct.category}</p>
                                    </div>
                                    <button
                                        onClick={() => setQuickViewProduct(null)}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="aspect-square rounded-xl overflow-hidden">
                                        <img
                                            src={quickViewProduct.image}
                                            alt={quickViewProduct.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-6">
                                            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold mr-2">
                                                🔥 SALE {quickViewProduct.discountPercent}% OFF
                                            </span>
                                            <span className="text-sm opacity-70">Limited Time Offer</span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-3xl font-bold text-green-500">
                                                    ₹{quickViewProduct.price.toLocaleString()}
                                                </span>
                                                <span className="text-lg line-through opacity-60">
                                                    ₹{quickViewProduct.originalPrice?.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-green-600 dark:text-green-400 font-medium">
                                                You save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString()}!
                                            </p>
                                        </div>

                                        <p className="opacity-80 mb-6">
                                            {quickViewProduct.description || "Special summer sale item! This exclusive offer won't last long."}
                                        </p>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => {
                                                    handleAddToCart(quickViewProduct._id);
                                                    setQuickViewProduct(null);
                                                }}
                                                className="w-full py-3 rounded-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                                                style={{
                                                    background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                                    color: "#fff",
                                                    boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                                                }}
                                            >
                                                🛍️ Add to Cart
                                            </button>

                                            <button
                                                onClick={() => navigate(`/payment?productId=${quickViewProduct._id}`)}
                                                className="w-full py-3 rounded-lg font-bold transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                                                style={{
                                                    background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                                                    color: "#fff",
                                                }}
                                            >
                                                ⚡ Buy Now
                                            </button>

                                            <button
                                                onClick={() => handleWishlistToggle(quickViewProduct)}
                                                className="w-full py-3 rounded-lg font-bold border-2 transition-all hover:scale-[1.02]"
                                                style={{
                                                    borderColor: isDark ? "#475569" : "#cbd5e1",
                                                    color: wishlist.some(w => w._id === quickViewProduct._id) ? "#ef4444" : "inherit",
                                                }}
                                            >
                                                {wishlist.some(w => w._id === quickViewProduct._id) ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Styles */}
            <style>
                {`
          .line-clamp-1 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
          
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        `}
            </style>
        </motion.div>
    );
};

export default Sale;