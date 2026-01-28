import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star, Truck, RefreshCw, Shield, Heart, ShoppingCart,
  Zap, CheckCircle, Clock, Share2, Eye, ChevronLeft,
  ChevronRight, ZoomIn, Package, Calendar, X
} from "lucide-react";
import AddToCart from "../AddToCart";
import { useWishlist } from "../../context/WishlistContext";
const ProductDetails = ({ theme, setCartCount, setWishlistCount }) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { id } = useParams();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [isStickyBar, setIsStickyBar] = useState(false);
  const [stock, setStock] = useState(15); // Mock stock count

  // Product images (mock - in real app these would come from API)
  const productImages = [
    product?.image,
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070",
    "https://i.etsystatic.com/37597298/r/il/1a91ac/4275814608/il_1080xN.4275814608_6vry.jpg",
  ];

  // Delivery dates
  const deliveryDates = [
    { city: "Delhi", date: "Tomorrow, 10 AM - 2 PM" },
    { city: "Mumbai", date: "Tomorrow, 11 AM - 3 PM" },
    { city: "Bangalore", date: "2 days, 9 AM - 1 PM" },
  ];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-s1l7.onrender.com/api/products/${id}`
        );
        if (res.data.success) {
          setProduct(res.data.product);

          // Add to recently viewed
          const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
          const updatedRecent = [
            { _id: res.data.product._id, name: res.data.product.name, image: res.data.product.image },
            ...recent.filter(item => item._id !== res.data.product._id)
          ].slice(0, 5);
          localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
          setRecentlyViewed(updatedRecent);

          // Load related products
          if (res.data.product.category) {
            const relatedRes = await axios.get(
              `https://ecommerce-backend-s1l7.onrender.com/api/products/category/${res.data.product.category}`
            );
            if (relatedRes.data.success) {
              setRelatedProducts(relatedRes.data.products.filter(p => p._id !== id).slice(0, 4));
            }
          }
        }
      } catch (err) {
        console.log("Single Product Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsStickyBar(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleImageZoom = (e) => {
    if (!zoom) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const shareProduct = () => {
    const url = window.location.href;
    const text = `Check out ${product.name} on our store!`;

    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
    setShowShare(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        fill={i < rating ? "#FACC15" : "none"}
        color={i < rating ? "#FACC15" : "#CBD5E1"}
      />
    ));
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
    </div>
  );

  if (!product) return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <h2 className="text-xl">Product Not Found</h2>
    </div>
  );

  const isLiked = wishlist.some(w => w._id === product?._id);


  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button onClick={() => navigate(-1)} className="hover:text-teal-500">
            ← Back
          </button>
          <span>/</span>
          <button onClick={() => navigate("/shop")} className="hover:text-teal-500">
            Shop
          </button>
          <span>/</span>
          <span className="opacity-70">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* IMAGE SECTION */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative overflow-hidden rounded-2xl cursor-zoom-in"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleImageZoom}
              onClick={() => setZoom(!zoom)}
            >
              <img
                src={productImages[currentImage] || product.image}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />

              {/* Zoom Overlay */}
              {zoom && (
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={productImages[currentImage] || product.image}
                    alt="Zoomed"
                    className="absolute w-[200%] h-[200%] object-cover"
                    style={{
                      left: `-${zoomPosition.x}%`,
                      top: `-${zoomPosition.y}%`,
                      transform: 'scale(2)',
                    }}
                  />
                </div>
              )}

              {/* Zoom Indicator */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full">
                <ZoomIn size={20} />
              </div>

              {/* Image Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev - 1 + productImages.length) % productImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImage((prev) => (prev + 1) % productImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
              >
                <ChevronRight size={24} />
              </button>

              {/* Stock Status */}
              <div className="absolute top-4 left-4">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${currentImage === idx ? 'border-teal-500' : 'border-transparent'}`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(4)}
                    <span className="text-sm ml-2 opacity-70">(124 reviews)</span>
                  </div>
                  <div className="text-sm opacity-70">
                    <Package size={16} className="inline mr-1" />
                    SKU: {product._id?.slice(-8).toUpperCase()}
                  </div>
                </div>

                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <Share2 size={20} />
                  </button>

                  {showShare && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 p-3">
                      <button
                        onClick={shareProduct}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Share on WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                ₹{product.price}
              </p>
              <span className="line-through text-gray-500">₹{Math.round(product.price * 1.2)}</span>
              <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded text-sm">
                20% OFF
              </span>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Truck size={20} className="text-teal-500" />
                <span className="font-semibold">Delivery Options</span>
              </div>
              <select className="w-full p-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 mb-3">
                <option>Select your location</option>
                {deliveryDates.map((item, idx) => (
                  <option key={idx} value={item.city}>
                    {item.city} - {item.date}
                  </option>
                ))}
              </select>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <Clock size={14} className="inline mr-1" />
                Order within 5 hours for next day delivery
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="opacity-80 leading-relaxed">
                {product.description || "No description available."}
              </p>
            </div>

            {/* Trust Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Truck size={24} className="text-teal-500 mb-2" />
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <RefreshCw size={24} className="text-teal-500 mb-2" />
                <span className="text-sm font-medium">10-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Shield size={24} className="text-teal-500 mb-2" />
                <span className="text-sm font-medium">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <CheckCircle size={24} className="text-teal-500 mb-2" />
                <span className="text-sm font-medium">Authentic</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate(`/payment?productId=${id}`)}
                disabled={stock <= 0}
                className="flex-1 py-3 rounded-xl text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
                  boxShadow: "0 6px 20px rgba(255,107,107,0.35)",
                }}
              >
                {stock > 0 ? 'Buy Now' : 'Out of Stock'}
              </button>

              <AddToCart
                productId={id}
                disabled={stock <= 0}
                setCartCount={setCartCount}
                className="flex-1 py-3 rounded-xl font-semibold text-lg border flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </AddToCart>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${isLiked
                ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
                : "border hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
            >
              <Heart size={20} fill={isLiked ? "#EF4444" : "none"} color="#EF4444" />
              {isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-teal-600 dark:text-teal-400 font-bold mt-2">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECENTLY VIEWED */}
        {recentlyViewed.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {recentlyViewed.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="flex-shrink-0 w-40 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h4 className="text-sm font-medium truncate">{item.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STICKY BUY BAR (Mobile) */}
        {isStickyBar && (
          <div className={`fixed bottom-0 left-0 right-0 ${isDark ? 'bg-gray-800' : 'bg-white'} border-t shadow-lg lg:hidden z-50 p-4`}>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div>
                <p className="font-bold text-lg">₹{product.price}</p>
                <p className="text-sm opacity-70">{stock} left in stock</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-3 rounded-full border"
                >
                  <Heart size={20} fill={isLiked ? "#EF4444" : "none"} color="#EF4444" />
                </button>

                <AddToCart
                  productId={id}
                  className="px-6 py-3 rounded-lg bg-teal-500 text-white font-semibold"
                >
                  Add to Cart
                </AddToCart>
                <button
                  onClick={() => navigate(`/payment?productId=${id}`)}
                  className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;