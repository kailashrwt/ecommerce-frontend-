import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  BerryMinimum, 
  CitrusChic, 
  ClassicVanilla, 
  LuxuriusLime, 
  SorbetSensation, 
  SummerFling 
} from "../components/Icons";
import { Diamond, ShoppingCartIcon, HeartIcon } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const Flavors = ({ theme = "light", setCartCount }) => {
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const [flavorProducts, setFlavorProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const flavorList = [
    { label: "Citrus Chic", path: "/client/flavors/citruschic", icon: <CitrusChic /> },
    { label: "Berry Minimum", path: "/client/flavors/berryminimum", icon: <BerryMinimum /> },
    { label: "Classic Vanilla", path: "/client/flavors/classicvanilla", icon: <ClassicVanilla /> },
    { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime", icon: <LuxuriusLime /> },
    { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation", icon: <SorbetSensation /> },
    { label: "Summer Fling", path: "/client/flavors/summerfling", icon: <SummerFling /> }
  ];

  // 🛒 Add to Cart Function
  const handleAddToCart = async (productId, e) => {
    e.stopPropagation(); // Prevent navigation to product page
    
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

  // ❤️ Handle Wishlist (with stopPropagation)
  const handleWishlistToggle = (item, e) => {
    e.stopPropagation();
    toggleWishlist(item);
  };

  useEffect(() => {
    const loadAllCategories = async () => {
      try {
        const results = {};

        for (const flavor of flavorList) {
          const res = await axios.get(
            `https://ecommerce-backend-s1l7.onrender.com/api/products/category/${flavor.label}`
          );

          if (res.data.success) {
            results[flavor.label] = res.data.products.slice(0, 4);
          }
        }

        setFlavorProducts(results);
      } catch (error) {
        console.error("Flavors fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllCategories();
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
        <h2 className="text-xl">Loading Flavors...</h2>
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
            <Diamond className="text-pink-400" /> Flavors Collection
          </h1>
          <p className="opacity-70 text-lg">
            Discover our exclusive jewelry flavors - each with a unique personality!
          </p>
        </div>

        {flavorList.map((flavor) => (
          <div key={flavor.label} className="mb-16">
            {/* Flavor Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 mb-3 sm:mb-0">
                <span className="text-3xl">{flavor.icon}</span>
                {flavor.label}
              </h2>
              
              <button
                onClick={() => navigate(flavor.path)}
                className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                }}
              >
                View All →
              </button>
            </div>

            {/* Products Grid */}
            {(!flavorProducts[flavor.label] || flavorProducts[flavor.label].length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed rounded-xl mb-6"
                style={{
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                }}
              >
                <p className="opacity-70">No products found for this flavor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {(flavorProducts[flavor.label] || []).map((item) => (
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
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      
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

                      {/* Add to Cart Overlay */}
                      <div
                        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                          hoveredProduct === item._id ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <button
                          onClick={(e) => handleAddToCart(item._id, e)}
                          className="px-6 py-3 rounded-full font-bold transition-all duration-200 transform hover:scale-110"
                          style={{
                            background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                            color: "#fff",
                            boxShadow: "0 4px 20px rgba(78,205,196,0.5)",
                          }}
                        >
                          <ShoppingCartIcon className="inline mr-2" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg line-clamp-1">{item.name}</h3>
                        <span className="text-xs px-2 py-1 rounded-full"
                          style={{
                            background: isDark ? "#334155" : "#e2e8f0",
                          }}
                        >
                          {item.category || flavor.label}
                        </span>
                      </div>
                      
                      <p className="text-sm opacity-70 mb-3 line-clamp-2">
                        {item.description || "Premium quality product"}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-green-500">
                          ₹{item.price.toLocaleString()}
                        </p>
                        
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
            {flavor.label !== flavorList[flavorList.length - 1].label && (
              <hr className="my-10" style={{
                borderColor: isDark ? "#334155" : "#e2e8f0",
              }} />
            )}
          </div>
        ))}

        {/* Quick View Modal (optional - if you want to implement) */}
        {/* You can reuse the quick view modal from your Shop component here */}
        
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
      </div>
    </div>
  );
};

export default Flavors;