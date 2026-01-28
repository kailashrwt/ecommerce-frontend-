import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    GiftIcon,
    ShoppingCartIcon,
    HeartIcon,
    EyeIcon
} from "lucide-react";
import {
    Gift2100To3500Icon,
    Gift3600To5000Icon,
    GiftUnder2000Icon,
} from "../components/Icons";
import { useWishlist } from "../context/WishlistContext";

const Gifts = ({ theme = "light", setCartCount }) => {
    const isDark = theme === "dark";
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useWishlist();
    const [giftProducts, setGiftProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [quickViewProduct, setQuickViewProduct] = useState(null);

    const giftCategories = [
        {
            label: "Gift under ₹2000",
            min: 0,
            max: 2000,
            path: "/gifts/giftunder2000",
            icon: <GiftUnder2000Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-blue-400 to-cyan-400",
        },
        {
            label: "Gift ₹2100-₹3500",
            min: 2100,
            max: 3500,
            path: "/gifts/gift2100to3500",
            icon: <Gift2100To3500Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-purple-400 to-pink-400",
        },
        {
            label: "Gift ₹3600 – ₹5000",
            min: 3600,
            max: 5000,
            path: "/gifts/gift3600to5000",
            icon: <Gift3600To5000Icon className="w-7 h-7 sm:w-8 sm:h-8" />,
            gradient: "from-orange-400 to-red-400",
        },
    ];

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
        const fetchGiftRanges = async () => {
            try {
                const results = {};

                for (const range of giftCategories) {
                    const res = await axios.get(
                        `https://ecommerce-backend-s1l7.onrender.com/api/products/price/${range.min}/${range.max}`
                    );

                    if (res.data.success) {
                        results[range.label] = res.data.products.slice(0, 4);
                    }
                }

                setGiftProducts(results);
            } catch (err) {
                console.error("Gift fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftRanges();
    }, []);

    if (loading)
        return (
            <div
                className="flex justify-center items-center min-h-[60vh]"
                style={{
                    background: isDark ? "#0F172A" : "#F8FAFC",
                    color: isDark ? "white" : "black",
                }}
            >
                <h2 className="text-xl">Loading Gift Collections...</h2>
            </div>
        );

    return (
        <div
            className="pt-28 px-6 md:px-12 pb-12"
            style={{
                background: isDark ? "#0F172A" : "#F8FAFC",
                minHeight: "100vh",
                color: isDark ? "white" : "black",
            }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold mb-3 flex items-center justify-center gap-3">
                        <GiftIcon className="text-yellow-400" /> Perfect Gift Collections
                    </h1>
                    <p className="opacity-70 text-lg">
                        Handpicked gifts for every occasion and budget
                    </p>
                </div>

                {giftCategories.map((range, index) => (
                    <div key={range.label} className="mb-16">
                        {/* Category Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 mb-3 sm:mb-0">
                                <span className="text-3xl">{range.icon}</span>
                                {range.label}
                                <span className="text-sm font-normal opacity-70">
                                    ({range.min === 0 ? `Under ₹${range.max}` : `₹${range.min} - ₹${range.max}`})
                                </span>
                            </h2>

                            <button
                                onClick={() => navigate(range.path)}
                                className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                                    backgroundImage: `linear-gradient(135deg, ${range.gradient.replace('from-', '').replace('to-', '').split(' ').map(c => `var(--color-${c})`).join(', ')})`,
                                    color: "#fff",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                            >
                                View All →
                            </button>
                        </div>

                        {/* Products Grid */}
                        {(!giftProducts[range.label] || giftProducts[range.label].length === 0) ? (
                            <div className="text-center py-8 border-2 border-dashed rounded-xl mb-6"
                                style={{
                                    borderColor: isDark ? "#334155" : "#e2e8f0",
                                }}
                            >
                                <p className="opacity-70">No products found in this price range.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                {(giftProducts[range.label] || []).map((item) => (
                                    <div
                                        key={item._id}
                                        className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer"
                                        style={{
                                            background: isDark ? "#1E293B" : "#ffffff",
                                        }}
                                        onClick={() => navigate(`/product/${item._id}`)}
                                        onMouseEnter={() => setHoveredProduct(item._id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                    >
                                        {/* Image Container */}
                                        <div className="relative aspect-square overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            />

                                            {/* Category Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="text-xs px-2 py-1 rounded-full bg-black/70 text-white">
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Wishlist Button */}
                                            <button
                                                onClick={(e) => handleWishlistToggle(item, e)}
                                                className="absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10"
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
                                            </button>

                                            {/* Hover Overlay with Actions */}
                                            <div
                                                className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 p-4 ${hoveredProduct === item._id ? "opacity-100" : "opacity-0"
                                                    }`}
                                            >
                                                <button
                                                    onClick={(e) => handleAddToCart(item._id, e)}
                                                    className="w-full max-w-[180px] py-3 rounded-full font-bold transition-all duration-200 transform hover:scale-105"
                                                    style={{
                                                        background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                                        color: "#fff",
                                                        boxShadow: "0 4px 20px rgba(78,205,196,0.5)",
                                                    }}
                                                >
                                                    <ShoppingCartIcon className="inline mr-2" />
                                                    Add to Cart
                                                </button>

                                                <button
                                                    onClick={(e) => handleQuickView(item, e)}
                                                    className="w-full max-w-[180px] py-3 rounded-full font-bold transition-all duration-200 transform hover:scale-105"
                                                    style={{
                                                        background: "rgba(255, 255, 255, 0.9)",
                                                        color: "#333",
                                                    }}
                                                >
                                                    <EyeIcon className="inline mr-2" />
                                                    Quick View
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg line-clamp-1 mb-2">
                                                {item.name}
                                            </h3>

                                            <p className="text-sm opacity-70 mb-3 line-clamp-2">
                                                {item.description || "A perfect gift for your loved ones"}
                                            </p>

                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-xl font-bold text-green-500">
                                                        ₹{item.price.toLocaleString()}
                                                    </p>
                                                    <p className="text-xs opacity-70">
                                                        {item.price <= 2000 ? "🎁 Budget Friendly" :
                                                            item.price <= 3500 ? "✨ Premium Pick" : "💎 Luxury Choice"}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(item._id, e);
                                                    }}
                                                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                                                    style={{
                                                        background: "linear-gradient(135deg, #f472b6 0%, #d946ef 100%)",
                                                        color: "#fff",
                                                        boxShadow: "0 4px 12px rgba(244, 114, 182, 0.3)",
                                                    }}
                                                >
                                                    <ShoppingCartIcon className="inline mr-1 h-4 w-4" />
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Divider */}
                        {index !== giftCategories.length - 1 && (
                            <hr className="my-10" style={{
                                borderColor: isDark ? "#334155" : "#e2e8f0",
                            }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fade-in">
                    <div
                        className="rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        style={{
                            background: isDark ? "#1E293B" : "#ffffff",
                            color: isDark ? "#F8FAFC" : "#0F172A",
                        }}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold">{quickViewProduct.name}</h2>
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
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-sm font-bold">
                                            {quickViewProduct.category}
                                        </span>
                                        <span className="ml-2 text-sm opacity-70">
                                            Perfect Gift!
                                        </span>
                                    </div>

                                    <p className="text-3xl font-bold text-green-500 mb-4">
                                        ₹ {quickViewProduct.price.toLocaleString()}
                                    </p>

                                    <p className="opacity-80 mb-6">
                                        {quickViewProduct.description || "This makes a wonderful gift for any occasion. Crafted with care and attention to detail."}
                                    </p>

                                    <div className="space-y-3">
                                        <button
                                            onClick={() => {
                                                handleAddToCart(quickViewProduct._id);
                                                setQuickViewProduct(null);
                                            }}
                                            className="w-full py-3 rounded-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                            style={{
                                                background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                                color: "#fff",
                                                boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                                            }}
                                        >
                                            🛍️ Add to Bag
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

                                        <button
                                            onClick={() => {
                                                navigate(`/product/${quickViewProduct._id}`);
                                                setQuickViewProduct(null);
                                            }}
                                            className="w-full py-3 rounded-lg font-bold transition-all hover:scale-[1.02]"
                                            style={{
                                                background: isDark ? "#334155" : "#e2e8f0",
                                            }}
                                        >
                                            👁 View Full Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Styles */}
            <style>
                {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
          
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
        </div>
    );
};

export default Gifts;