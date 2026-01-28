import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FlashIcon, GirlIcon } from "../components/Icons";
import { ShoppingCartIcon, HeartIcon, EyeIcon } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const SorbetGirl = ({ theme = "light", setCartCount }) => {
    const isDark = theme === "dark";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const navigate = useNavigate();
    const { wishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        const fetchSorbetGirlProducts = async () => {
            try {
                const categories = ["Lil Scoopsies", "Sassy Sorbet"];
                let allProducts = [];

                const requests = categories.map((cat) =>
                    axios.get(
                        `https://ecommerce-backend-s1l7.onrender.com/api/products/category/${encodeURIComponent(cat)}`
                    )
                );

                const results = await Promise.all(requests);

                results.forEach((res) => {
                    if (res.data.success) {
                        allProducts = [...allProducts, ...res.data.products];
                    }
                });

                setProducts(allProducts);
            } catch (err) {
                console.error("Sorbet Girl Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSorbetGirlProducts();
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
        e.stopPropagation();
        toggleWishlist(item);
    };

    // 👁️ Quick View
    const handleQuickView = (item, e) => {
        e.stopPropagation();
        // You can implement quick view modal here
        navigate(`/product/${item._id}`);
    };

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-xl"
                style={{
                    background: isDark ? "#0F172A" : "#F8FAFC",
                    color: isDark ? "white" : "black",
                }}
            >
                Loading Sorbet Girl Collection...
            </div>
        );

    return (
        <div
            className="px-4 sm:px-6 md:px-12 py-8 pt-28"
            style={{
                background: isDark ? "#0F172A" : "#F8FAFC",
                minHeight: "100vh",
                color: isDark ? "white" : "black",
                transition: "0.3s",
            }}
        >
            {/* HEADER */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 flex items-center justify-center gap-3">
                        <GirlIcon className="text-pink-400" />
                        Sorbet Girl Collection
                        <GirlIcon className="text-purple-400" />
                    </h1>
                    <p className="opacity-70 text-lg">
                        Sweet and sassy jewelry for the playful soul!
                    </p>
                </div>

                {/* NO PRODUCTS */}
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🎀</div>
                        <h3 className="text-2xl font-bold mb-2">No products found</h3>
                        <p className="opacity-70 mb-6">
                            We couldn't find any products in Sorbet Girl collection
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div
                                key={item._id}
                                className="rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer group"
                                style={{
                                    background: isDark ? "#1E293B" : "#ffffff",
                                    border: isDark ? "1px solid #334155" : "1px solid #e2e8f0",
                                }}
                                onClick={() => navigate(`/product/${item._id}`)}
                                onMouseEnter={() => setHoveredProduct(item._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                {/* IMAGE CONTAINER */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* WISHLIST BUTTON */}
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

                                    {/* HOVER OVERLAY WITH ACTIONS */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
                                            hoveredProduct === item._id ? "opacity-100" : "opacity-0"
                                        }`}
                                    >
                                        <div className="flex gap-2 mb-3">
                                            <button
                                                onClick={(e) => handleQuickView(item, e)}
                                                className="flex-1 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                                                style={{
                                                    background: "rgba(255, 255, 255, 0.9)",
                                                    color: "#1f2937",
                                                }}
                                            >
                                                <EyeIcon className="inline mr-1 w-4 h-4" />
                                                Quick View
                                            </button>
                                            <button
                                                onClick={(e) => handleAddToCart(item._id, e)}
                                                className="flex-1 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                                                style={{
                                                    background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                                    color: "#fff",
                                                }}
                                            >
                                                <ShoppingCartIcon className="inline mr-1 w-4 h-4" />
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                    {/* CATEGORY BADGE */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-xs px-2 py-1 rounded-full font-bold"
                                            style={{
                                                background: "rgba(255, 255, 255, 0.9)",
                                                color: "#ec4899",
                                            }}
                                        >
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* PRODUCT INFO */}
                                <div className="p-4">
                                    <h2 className="text-lg font-bold line-clamp-1 mb-1">{item.name}</h2>
                                    
                                    <p className="text-sm opacity-70 mb-3 line-clamp-2">
                                        {item.description || "Sweet and sassy jewelry piece"}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-bold text-green-500">
                                            ₹{item.price.toLocaleString()}
                                        </p>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(item._id, e);
                                                }}
                                                className="px-3 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95"
                                                style={{
                                                    background: "linear-gradient(135deg, #f472b6 0%, #d946ef 100%)",
                                                    color: "#fff",
                                                }}
                                            >
                                                <ShoppingCartIcon className="inline mr-1 w-4 h-4" />
                                                Add
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/payment?productId=${item._id}`);
                                                }}
                                                className="px-3 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-1"
                                                style={{
                                                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                                                    color: "#fff",
                                                }}
                                            >
                                                <FlashIcon className="w-4 h-4" />
                                                Buy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ADD GLOBAL STYLES */}
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
                    
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out;
                    }
                `}
            </style>
        </div>
    );
};

export default SorbetGirl;