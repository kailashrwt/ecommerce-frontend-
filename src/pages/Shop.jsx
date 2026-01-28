import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  CartIcon,
  SimpleMagic,
  HeartIcon,
  EyeIcon,
  FilterIcon,
  SortIcon,
  CloseIcon
} from "../components/Icons";
import { LucideShoppingBag, ShoppingBagIcon, ShoppingBasketIcon, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

const Shop = ({ theme = "light", setCartCount }) => {
  const { wishlist, toggleWishlist } = useWishlist(); 
  const isDark = theme === "dark";
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();

  // Filters state
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [categories, setCategories] = useState([]);

  // Read search query
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  // Load all products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://ecommerce-backend-s1l7.onrender.com/api/products");
        if (res.data.success) {
          setProducts(res.data.products);
          setFilteredProducts(res.data.products);

          // Extract unique categories
          const uniqueCategories = [...new Set(res.data.products.map(p => p.category))];
          setCategories(["all", ...uniqueCategories]);

          // Set max price
          const maxPrice = Math.max(...res.data.products.map(p => p.price));
          setPriceRange([0, maxPrice]);
        }
      } catch (err) {
        console.log("Shop Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);


  // Apply filters and sorting
  const applyFilters = useCallback(() => {
    let result = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategory === "all" || product.category === selectedCategory)
    );

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Featured - keep as is
        break;
    }

    setFilteredProducts(result);
  }, [products, searchQuery, sortBy, selectedCategory, priceRange]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // 🛒 Add to Cart
  const handleAddToCart = async (productId) => {
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
        setCartCount((prev) => prev + 1);
      }
    } catch (err) {
      console.log("Add to Cart Error:", err);
      alert("Failed to add item.");
    }
  };



  // 🔄 Reset Filters
  const resetFilters = () => {
    setSortBy("featured");
    setSelectedCategory("all");
    setPriceRange([0, Math.max(...products.map(p => p.price))]);
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl p-4 shadow-lg animate-pulse"
          style={{ background: isDark ? "#1E293B" : "#f3f4f6" }}
        >
          <div className="w-full aspect-square bg-gray-400 dark:bg-gray-600 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 dark:bg-gray-600 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="pt-28 px-6 md:px-12 transition-all relative"
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
        minHeight: "100vh",
      }}
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold mb-3 animate-fade-in">
          ✨ Find something you'll love
        </h1>
        <p className="opacity-70 font-medium">
          Handpicked jewelry crafted with passion
          <SimpleMagic className="inline ml-2 h-5 w-5 text-yellow-400 animate-pulse" />
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <div
        className={`sticky top-20 z-40 mb-8 py-4 transition-all duration-300 ${isDark ? "bg-slate-900/95 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm"
          } shadow-lg rounded-xl px-6`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                background: isDark ? "#334155" : "#e2e8f0",
                color: isDark ? "#F8FAFC" : "#0F172A",
              }}
            >
              <FilterIcon className="w-5 h-5" />
              Filters
            </button>

            <div className="hidden md:flex items-center gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  border: "none",
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <span className="font-medium">Price:</span>
                <span className="text-green-500 font-bold">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SortIcon className="w-5 h-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  border: "none",
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name-a-z">Name: A to Z</option>
                <option value="name-z-a">Name: Z to A</option>
              </select>
            </div>

            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #f472b6 0%, #d946ef 100%)",
                color: "#fff",
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 rounded-lg border transition-all animate-slide-down"
            style={{
              background: isDark ? "#1E293B" : "#ffffff",
              borderColor: isDark ? "#334155" : "#e2e8f0",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg"
                  style={{
                    background: isDark ? "#334155" : "#e2e8f0",
                    color: isDark ? "#F8FAFC" : "#0F172A",
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map(p => p.price))}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="font-medium opacity-80">
          Showing {filteredProducts.length} of {products.length} products
          {searchQuery && (
            <span> for "<span className="font-bold">{searchQuery}</span>"</span>
          )}
        </p>
      </div>

      {/* Products Grid */}
      {loading ? (
        <SkeletonLoader />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-4"><CartIcon /></div>
          <h3 className="text-2xl font-bold mb-2">No matching products found</h3>
          <p className="opacity-70 mb-6">
            {searchQuery
              ? `We couldn't find any products matching "${searchQuery}"`
              : "Try adjusting your filters to find what you're looking for"}
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((item, index) => (
            <div
              key={item._id}
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 animate-fade-up"
              style={{
                background: isDark ? "#1E293B" : "#ffffff",
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredProduct(item._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container with Hover Overlay */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />

                {/* Hover Overlay with Quick Actions */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-4 transition-opacity duration-300 ${hoveredProduct === item._id ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <button
                    onClick={() => setQuickViewProduct(item)}
                    className="p-3 rounded-full bg-white/90 hover:bg-white transform hover:scale-110 transition-all duration-200"
                    title="Quick View"
                  >
                    <EyeIcon className="w-6 h-6 text-gray-800" />
                  </button>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="p-3 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-500 hover:to-cyan-500 transform hover:scale-110 transition-all duration-200"
                    title="Add to Cart"
                  >
                    <CartIcon className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`p-3 rounded-full transform hover:scale-110 transition-all duration-200 ${wishlist.some(w => w._id === item._id)
                      ? "bg-gradient-to-r from-pink-400 to-rose-400"
                      : "bg-white/90 hover:bg-white"
                      }`}
                    title={
                      wishlist.some(w => w._id === item._id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    <HeartIcon
                      className={`w-6 h-6 ${wishlist.some(w => w._id === item._id)
                        ? "text-white"
                        : "text-gray-800"
                        }`}
                      filled={wishlist.some(w => w._id === item._id)}
                    />
                  </button>
                </div>

                {/* Wishlist Heart in Corner */}
                <button
                  onClick={() => toggleWishlist(item)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all duration-200"
                >
                  <HeartIcon
                    className="w-5 h-5 text-rose-500"
                    filled={wishlist.some(w => w._id === item._id)}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-bold line-clamp-1">{item.name}</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                    {item.category}
                  </span>
                </div>

                <p className="text-sm opacity-70 mb-3 line-clamp-2">
                  {item.description || "Premium quality product"}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-green-500">
                    ₹ {item.price.toLocaleString()}
                  </p>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                    }}
                  >
                    Add to Bag <ShoppingCartIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
                  <CloseIcon className="w-6 h-6" />
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
                  </div>

                  <p className="text-3xl font-bold text-green-500 mb-4">
                    ₹ {quickViewProduct.price.toLocaleString()}
                  </p>

                  <p className="opacity-80 mb-6">
                    {quickViewProduct.description || "A premium quality product with exceptional craftsmanship and attention to detail."}
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
                      onClick={() => handleWishlist(quickViewProduct)}
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
                        // Navigate to product detail page
                        window.location.href = `/product/${quickViewProduct._id}`;
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
    </div>
  );
};

// Add these CSS animations to your global styles
const styles = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fade-up {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from { 
    opacity: 0;
    transform: translateY(-10px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

.animate-fade-up {
  animation: fade-up 0.6s ease-out forwards;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out;
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
`;

// Add styles to document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Shop;