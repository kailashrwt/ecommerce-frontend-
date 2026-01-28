import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Payment = ({ theme = "light", setCartCount }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const query = new URLSearchParams(location.search);
  const productId = query.get("productId");

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [suggestedQty, setSuggestedQty] = useState([1, 2, 3, 5]);

  useEffect(() => {
    if (productId) fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://ecommerce-backend-s1l7.onrender.com/api/products/${productId}`);
      if (res.data.success) setProduct(res.data.product);
    } catch (err) {
      console.log("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please Login first");
      return navigate("/login");
    }

    setProcessing(true);
    try {
      const res = await axios.post("https://ecommerce-backend-s1l7.onrender.com/api/payment/create-order", {
        amount: qty * product.price,
      });

      const order = res.data.order;
      if (!order) {
        alert("Error creating order");
        return;
      }

      await loadRazorpay();

      const options = {
        key: "rzp_test_Rl9ik50h8bQyK0",
        amount: order.amount,
        currency: "INR",
        name: "Lara Store",
        description: `Payment for ${product.name}`,
        order_id: order.id,
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#4ECDC4"
        },

        handler: async function (response) {
          await axios.post(
            "https://ecommerce-backend-s1l7.onrender.com/api/order/create",
            {
              productId,
              qty,
              totalAmount: qty * product.price,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          // Update cart count if setCartCount exists
          if (setCartCount) {
            const cartRes = await axios.get("https://ecommerce-backend-s1l7.onrender.com/api/cart/me", {
              headers: { Authorization: `Bearer ${token}` }
            });
            setCartCount(cartRes.data.totalItems || 0);
          }

          alert("Payment Successful!");
          navigate("/my-orders");
        },

        modal: {
          ondismiss: function() {
            setProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(
        "https://ecommerce-backend-s1l7.onrender.com/api/cart/add",
        { productId, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Added to Cart!");
        if (setCartCount) {
          setCartCount((prev) => prev + qty);
        }
      }
    } catch (err) {
      console.log("Add to Cart Error:", err);
    }
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div className="pt-28 px-4 md:px-12 pb-12 min-h-screen"
        style={{
          background: isDark ? "#0F172A" : "#F8FAFC",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 mx-auto"></div>
          </div>
          <div className="p-6 rounded-xl"
            style={{
              background: isDark ? "#1E293B" : "#ffffff",
            }}
          >
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 px-4 md:px-12 pb-12 min-h-screen flex items-center justify-center"
        style={{
          background: isDark ? "#0F172A" : "#F8FAFC",
          color: isDark ? "#F8FAFC" : "#0F172A",
        }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="opacity-70 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
              color: "#fff",
            }}
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = qty * product.price;
  const discount = Math.floor(product.price * 0.1 * qty); // 10% discount
  const finalPrice = totalPrice - discount;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 md:pt-28 px-4 sm:px-6 md:px-12 pb-12 min-h-screen"
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
          >
            🧾 Complete Your Purchase
          </motion.h1>
          <p className="opacity-70 text-sm sm:text-base">
            Secure checkout • Fast delivery • Easy returns
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Column - Product Info */}
          <div className="lg:w-2/3">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="p-4 sm:p-6 rounded-xl"
              style={{
                background: isDark ? "#1E293B" : "#ffffff",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Product Card */}
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-center md:items-start">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-[280px] h-auto md:w-48 md:h-48 lg:w-56 lg:h-56 object-cover rounded-xl shadow-lg cursor-pointer"
                    onClick={() => navigate(`/product/${product._id}`)}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-500 text-white">
                      🔥 HOT
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 w-full">
                  <h2 
                    className="text-xl sm:text-2xl font-bold mb-2 cursor-pointer hover:text-green-500 transition-colors"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h2>
                  <p className="opacity-70 text-sm sm:text-base mb-3">
                    {product.category}
                  </p>

                  {/* Price Display */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-bold text-green-500">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-sm line-through opacity-60">
                        ₹{Math.round(product.price * 1.2).toLocaleString()}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold">
                        Save 20%
                      </span>
                    </div>
                    <p className="text-sm opacity-70">Per piece</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <p className="font-medium mb-3">Quantity</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                          disabled={qty <= 1}
                          className="w-10 h-10 rounded-lg disabled:opacity-40 transition-all hover:scale-110 flex items-center justify-center"
                          style={{
                            background: isDark ? "#334155" : "#e2e8f0",
                          }}
                        >
                          <span className="text-lg font-bold">-</span>
                        </button>

                        <span className="font-bold text-xl w-12 text-center">
                          {qty}
                        </span>

                        <button
                          onClick={() => setQty(qty + 1)}
                          className="w-10 h-10 rounded-lg transition-all hover:scale-110 flex items-center justify-center"
                          style={{
                            background: isDark ? "#334155" : "#e2e8f0",
                          }}
                        >
                          <span className="text-lg font-bold">+</span>
                        </button>
                      </div>

                      {/* Quick Quantity Buttons */}
                      <div className="flex gap-2">
                        {suggestedQty.map(num => (
                          <button
                            key={num}
                            onClick={() => setQty(num)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                              qty === num 
                                ? 'text-white' 
                                : isDark ? 'text-gray-300' : 'text-gray-700'
                            }`}
                            style={{
                              background: qty === num 
                                ? "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)"
                                : isDark ? "#334155" : "#e2e8f0",
                            }}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 mb-3"
                    style={{
                      background: isDark ? "#334155" : "#e2e8f0",
                      color: isDark ? "#F8FAFC" : "#0F172A",
                    }}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 pt-6 border-t"
                style={{
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                }}
              >
                <h3 className="font-bold mb-3">📦 Delivery Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500">🚚</span>
                    <div>
                      <p className="font-medium">Free Delivery</p>
                      <p className="text-sm opacity-70">Delivery in 3-5 days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500">🔄</span>
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p className="text-sm opacity-70">30 days return policy</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="sticky top-24"
              style={{
                background: isDark ? "#1E293B" : "#ffffff",
                borderRadius: "1rem",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="p-4 sm:p-6">
                <h2 className="text-xl font-bold mb-4 pb-3 border-b"
                  style={{
                    borderColor: isDark ? "#334155" : "#e2e8f0",
                  }}
                >
                  Order Summary
                </h2>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="opacity-70">Price ({qty} items)</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Discount</span>
                    <span className="font-medium text-green-500">-₹{discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Delivery</span>
                    <span className="font-medium text-green-500">FREE</span>
                  </div>
                </div>

                {/* Total */}
                <div className="py-4 border-y mb-4"
                  style={{
                    borderColor: isDark ? "#334155" : "#e2e8f0",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-green-500">
                        ₹{finalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm opacity-70">
                        You save ₹{discount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <p className="font-medium mb-2">💳 Payment Methods</p>
                  <div className="flex gap-2">
                    {['💳', '🏦', '📱', '🔗'].map((icon, idx) => (
                      <div key={idx} className="p-2 rounded-lg"
                        style={{
                          background: isDark ? "#334155" : "#e2e8f0",
                        }}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pay Now Button */}
                <button
                  onClick={handlePayment}
                  disabled={processing}
                  className="w-full py-3 sm:py-4 rounded-lg font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
                    color: "#fff",
                    boxShadow: "0 8px 32px rgba(255, 107, 107, 0.3)",
                  }}
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      💳 Pay ₹{finalPrice.toLocaleString()}
                    </>
                  )}
                </button>

                {/* Security Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm opacity-70 mb-1">🔒 Secure SSL Encryption</p>
                  <p className="text-xs opacity-50">
                    Your payment is 100% secure
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{
              background: isDark ? "#334155" : "#e2e8f0",
            }}
          >
            ← Back to Product
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;