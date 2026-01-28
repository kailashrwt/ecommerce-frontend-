import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

const CartPage = ({ theme = "light", setCartCount }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedForCheckout, setSelectedForCheckout] = useState([]);
  const navigate = useNavigate();
  const { toggleWishlist, wishlist } = useWishlist();
  
  const isDark = theme === "dark";

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get("https://ecommerce-backend-s1l7.onrender.com/api/cart/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.items || []);
      setCartCount(res.data.totalItems || 0);
      setSelectedForCheckout(res.data.items?.map(item => item.productId) || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId, qty) => {
    if (qty < 1) return;
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "https://ecommerce-backend-s1l7.onrender.com/api/cart/update",
        { productId, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data.items);
      setCartCount(res.data.totalItems);
    } catch (err) {
      console.log(err);
      alert("Failed to update quantity");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    if (!window.confirm("Remove this item from cart?")) return;
    
    try {
      setUpdating(true);
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `https://ecommerce-backend-s1l7.onrender.com/api/cart/item/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data.items);
      setCartCount(res.data.totalItems);
      setSelectedForCheckout(prev => prev.filter(id => id !== productId));
    } catch (err) {
      console.log(err);
      alert("Failed to remove item");
    } finally {
      setUpdating(false);
    }
  };

  const toggleSelectItem = (productId) => {
    setSelectedForCheckout(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedForCheckout.length === items.length) {
      setSelectedForCheckout([]);
    } else {
      setSelectedForCheckout(items.map(item => item.productId));
    }
  };

  const moveToWishlist = (item) => {
    toggleWishlist(item);
    removeItem(item.productId);
  };

  // Calculate totals
  const selectedItems = items.filter(item => 
    selectedForCheckout.includes(item.productId)
  );
  
  const selectedTotalPrice = selectedItems.reduce(
    (s, it) => s + it.price * it.quantity, 0
  );
  
  const totalItemsCount = selectedItems.reduce(
    (s, it) => s + it.quantity, 0
  );

  const totalPrice = items.reduce((s, it) => s + it.price * it.quantity, 0);
  const totalItems = items.reduce((s, it) => s + it.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout");
      return;
    }
    
    const productIds = selectedItems.map(item => item.productId).join(',');
    navigate(`/checkout?items=${productIds}`);
  };

  // Simple Icons (to avoid import errors)
  const MinusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  );

  const PlusIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );

  const HeartIcon = ({ filled = false }) => (
    <svg className="w-4 h-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );

  const TrashIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="rounded-xl p-4 animate-pulse"
          style={{ background: isDark ? "#1E293B" : "#f3f4f6" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-24 bg-gray-400 dark:bg-gray-600 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="w-8 h-8 bg-gray-400 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="pt-28 px-4 sm:px-6 md:px-12 pb-12 min-h-screen"
        style={{
          background: isDark ? "#0F172A" : "#F8FAFC",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-24 px-4 sm:px-6 md:px-12 pb-12 min-h-screen"
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4"
          >
            🛒 Shopping Cart
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <p className="text-base sm:text-lg opacity-70">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all hover:scale-105"
                style={{
                  background: isDark ? "#334155" : "#e2e8f0",
                }}
              >
                Continue Shopping
              </button>
              
              {items.length > 0 && (
                <button
                  onClick={toggleSelectAll}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all hover:scale-105"
                  style={{
                    background: selectedForCheckout.length === items.length 
                      ? "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)"
                      : isDark ? "#334155" : "#e2e8f0",
                    color: selectedForCheckout.length === items.length ? "#fff" : "inherit",
                  }}
                >
                  {selectedForCheckout.length === items.length ? 'Deselect All' : 'Select All'}
                </button>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-16 md:py-20 px-4"
            >
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Your cart is empty</h3>
              <p className="opacity-70 mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base">
                Looks like you haven't added anything to your cart yet.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 12px rgba(78,205,196,0.3)",
                  }}
                >
                  Start Shopping
                </button>
                
                <button
                  onClick={() => navigate('/flavors')}
                  className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base border-2 transition-all hover:scale-105"
                  style={{
                    borderColor: isDark ? "#475569" : "#cbd5e1",
                  }}
                >
                  Explore Collections
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
              {/* Cart Items */}
              <motion.div 
                layout
                className="lg:w-2/3 space-y-4"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className={`rounded-xl md:rounded-2xl overflow-hidden transition-all ${
                      selectedForCheckout.includes(item.productId) 
                        ? 'ring-2 ring-green-500' 
                        : ''
                    }`}
                    style={{
                      background: isDark ? "#1E293B" : "#ffffff",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="p-3 sm:p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        {/* Selection Checkbox */}
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedForCheckout.includes(item.productId)}
                            onChange={() => toggleSelectItem(item.productId)}
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300 text-green-500 focus:ring-green-500"
                          />
                        </div>

                        {/* Image */}
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg object-cover cursor-pointer"
                            onClick={() => navigate(`/product/${item.productId}`)}
                          />
                          {item.quantity > 1 && (
                            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                              {item.quantity}
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 
                                className="font-bold text-base sm:text-lg mb-0.5 sm:mb-1 cursor-pointer hover:text-green-500 transition-colors truncate"
                                onClick={() => navigate(`/product/${item.productId}`)}
                                title={item.name}
                              >
                                {item.name}
                              </h3>
                              <p className="text-xs sm:text-sm opacity-70 mb-1 sm:mb-2 truncate">
                                {item.category}
                              </p>
                              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                <span className="text-lg sm:text-xl font-bold text-green-500">
                                  ₹{item.price.toLocaleString()}
                                </span>
                                {item.quantity > 1 && (
                                  <span className="text-xs sm:text-sm opacity-70">
                                    × {item.quantity}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Total for this item */}
                            <div className="text-right">
                              <p className="text-xl sm:text-2xl font-bold text-green-500 whitespace-nowrap">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-xs opacity-70">
                                  ₹{item.price.toLocaleString()} each
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mt-3 sm:mt-4">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <button
                                onClick={() => updateQty(item.productId, item.quantity - 1)}
                                disabled={item.quantity <= 1 || updating}
                                className="p-1.5 sm:p-2 rounded-lg disabled:opacity-40 transition-all hover:scale-110"
                                style={{
                                  background: isDark ? "#334155" : "#e2e8f0",
                                }}
                              >
                                <MinusIcon />
                              </button>

                              <span className="font-bold text-base sm:text-lg w-6 sm:w-8 text-center">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQty(item.productId, item.quantity + 1)}
                                disabled={updating}
                                className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-110"
                                style={{
                                  background: isDark ? "#334155" : "#e2e8f0",
                                }}
                              >
                                <PlusIcon />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3">
                              {/* Move to Wishlist */}
                              <button
                                onClick={() => moveToWishlist(item)}
                                disabled={updating}
                                className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-110"
                                style={{
                                  background: isDark ? "#334155" : "#e2e8f0",
                                  color: wishlist.some(w => w._id === item.productId) ? "#ef4444" : "inherit",
                                }}
                                title="Move to Wishlist"
                              >
                                <HeartIcon filled={wishlist.some(w => w._id === item.productId)} />
                              </button>

                              {/* Remove */}
                              <button
                                onClick={() => removeItem(item.productId)}
                                disabled={updating}
                                className="p-1.5 sm:p-2 rounded-lg transition-all hover:scale-110"
                                style={{
                                  background: isDark ? "#334155" : "#e2e8f0",
                                  color: "#ef4444",
                                }}
                                title="Remove from Cart"
                              >
                                <TrashIcon />
                              </button>

                              {/* Quick Buy */}
                              <button
                                onClick={() => navigate(`/payment?productId=${item.productId}`)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all hover:scale-105 flex items-center gap-1 sm:gap-2"
                                style={{
                                  background: "linear-gradient(135deg, #F43F5E, #FB7185)",
                                  color: "#fff",
                                }}
                              >
                                <span className="hidden sm:inline">⚡</span>
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Order Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:w-1/3"
              >
                <div className="sticky top-24 sm:top-28"
                  style={{
                    background: isDark ? "#1E293B" : "#ffffff",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 pb-3 border-b"
                      style={{
                        borderColor: isDark ? "#334155" : "#e2e8f0",
                      }}
                    >
                      Order Summary
                    </h2>

                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="opacity-70">Selected Items</span>
                        <span className="font-bold">{selectedItems.length}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="opacity-70">Total Quantity</span>
                        <span className="font-bold">{totalItemsCount}</span>
                      </div>
                      <div className="flex justify-between text-sm sm:text-base">
                        <span className="opacity-70">Items Subtotal</span>
                        <span className="font-bold">₹{selectedTotalPrice.toLocaleString()}</span>
                      </div>
                      
                      <div className="pt-3 sm:pt-4 border-t"
                        style={{
                          borderColor: isDark ? "#334155" : "#e2e8f0",
                        }}
                      >
                        <div className="flex justify-between text-lg sm:text-xl font-bold">
                          <span>Total Amount</span>
                          <span className="text-green-500">
                            ₹{selectedTotalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>


                    {/* Cart Total (All items) */}
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg"
                      style={{
                        background: isDark ? "#334155" : "#f3f4f6",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-sm sm:text-base">Cart Total ({totalItems} items)</p>
                          <p className="text-xs sm:text-sm opacity-70">All items in cart</p>
                        </div>
                        <p className="text-lg sm:text-xl font-bold text-green-500">
                          ₹{totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Security Info */}
                    <div className="mt-4 sm:mt-6 text-center">
                      <p className="text-xs sm:text-sm opacity-70 mb-1 sm:mb-2">🔒 Secure Checkout</p>
                      <p className="text-xs opacity-50">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CartPage;