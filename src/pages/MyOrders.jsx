import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ShoppingBag,
    Package,
    CheckCircle,
    Clock,
    Truck,
    Home,
    RefreshCw,
    AlertCircle,
    XCircle,
    ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MyOrders = ({ theme = "light" }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const navigate = useNavigate();

    const isDark = theme === "dark";

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.get("https://ecommerce-backend-s1l7.onrender.com/api/order/my-orders", {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Sort by latest first
            const sortedOrders = (res.data.orders || []).sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setOrders(sortedOrders);
        } catch (err) {
            console.log("Orders fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Filter orders based on status
    const filteredOrders = orders.filter(order => {
        if (filter === "all") return true;
        if (filter === "pending") return order.status === "pending";
        if (filter === "processing") return order.status === "processing";
        if (filter === "shipped") return order.status === "shipped";
        if (filter === "delivered") return order.status === "delivered";
        if (filter === "cancelled") return order.status === "cancelled";
        return true;
    });

    // Get status icon and color
    const getStatusInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { icon: <Clock size={16} />, color: "#F59E0B", bg: "bg-yellow-500/10", text: "text-yellow-600" };
            case 'processing':
                return { icon: <RefreshCw size={16} />, color: "#3B82F6", bg: "bg-blue-500/10", text: "text-blue-600" };
            case 'shipped':
                return { icon: <Truck size={16} />, color: "#8B5CF6", bg: "bg-purple-500/10", text: "text-purple-600" };
            case 'delivered':
                return { icon: <CheckCircle size={16} />, color: "#10B981", bg: "bg-green-500/10", text: "text-green-600" };
            case 'cancelled':
                return { icon: <XCircle size={16} />, color: "#EF4444", bg: "bg-red-500/10", text: "text-red-600" };
            default:
                return { icon: <Package size={16} />, color: "#6B7280", bg: "bg-gray-500/10", text: "text-gray-600" };
        }
    };

    // Get payment status info
    const getPaymentInfo = (status) => {
        switch (status?.toLowerCase()) {
            case 'paid':
                return { icon: <CheckCircle size={16} />, color: "#10B981", text: "text-green-600" };
            case 'pending':
                return { icon: <Clock size={16} />, color: "#F59E0B", text: "text-yellow-600" };
            case 'failed':
                return { icon: <AlertCircle size={16} />, color: "#EF4444", text: "text-red-600" };
            default:
                return { icon: <Clock size={16} />, color: "#6B7280", text: "text-gray-600" };
        }
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Calculate total items in order
    const calculateTotalItems = (order) => {
        return order.items.reduce((total, item) => total + item.quantity, 0);
    };

    // Skeleton Loader
    const SkeletonLoader = () => (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="rounded-xl p-6 animate-pulse"
                    style={{
                        background: isDark ? "#1E293B" : "#f3f4f6",
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-48"></div>
                        <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-24"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-28 px-4 sm:px-6 md:px-12 pb-12 min-h-screen"
            style={{
                background: isDark ? "#0F172A" : "#F8FAFC",
                color: isDark ? "#F8FAFC" : "#0F172A",
            }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3"
                    >
                        <ShoppingBag className="text-green-500" /> My Orders
                    </motion.h1>
                    <p className="opacity-70 text-base sm:text-lg max-w-2xl mx-auto">
                        Track your purchases, view order history, and manage your shipments
                    </p>
                </div>

                {/* Stats and Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="px-3 py-1.5 rounded-lg"
                            style={{
                                background: isDark ? "#334155" : "#e2e8f0",
                            }}
                        >
                            <span className="font-bold text-lg">{orders.length}</span>
                            <span className="opacity-70 ml-1">Orders</span>
                        </div>

                        <div className="px-3 py-1.5 rounded-lg"
                            style={{
                                background: isDark ? "#334155" : "#e2e8f0",
                            }}
                        >
                            <span className="font-bold text-lg">
                                {orders.filter(o => o.status === 'delivered').length}
                            </span>
                            <span className="opacity-70 ml-1">Delivered</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchOrders}
                            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
                            style={{
                                background: isDark ? "#334155" : "#e2e8f0",
                            }}
                        >
                            <RefreshCw size={16} />
                            Refresh
                        </button>

                        <button
                            onClick={() => navigate('/shop')}
                            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
                            style={{
                                background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                color: "#fff",
                            }}
                        >
                            <Home size={16} />
                            Continue Shopping
                        </button>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { id: "all", label: "All Orders", count: orders.length },
                        { id: "pending", label: "Pending", count: orders.filter(o => o.status === "pending").length },
                        { id: "processing", label: "Processing", count: orders.filter(o => o.status === "processing").length },
                        { id: "shipped", label: "Shipped", count: orders.filter(o => o.status === "shipped").length },
                        { id: "delivered", label: "Delivered", count: orders.filter(o => o.status === "delivered").length },
                        { id: "cancelled", label: "Cancelled", count: orders.filter(o => o.status === "cancelled").length },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${filter === tab.id
                                    ? "text-white"
                                    : isDark ? "text-gray-300" : "text-gray-700"
                                }`}
                            style={{
                                background: filter === tab.id
                                    ? "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)"
                                    : isDark ? "#334155" : "#e2e8f0",
                            }}
                        >
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.id
                                        ? "bg-white/20"
                                        : isDark ? "bg-gray-600" : "bg-gray-300"
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Orders List */}
                {loading ? (
                    <SkeletonLoader />
                ) : filteredOrders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 sm:py-20"
                    >
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-2xl font-bold mb-2">No orders found</h3>
                        <p className="opacity-70 mb-6 max-w-md mx-auto">
                            {filter === "all"
                                ? "You haven't placed any orders yet. Start shopping!"
                                : `No ${filter} orders found.`}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/shop')}
                                className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                                style={{
                                    background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                    color: "#fff",
                                }}
                            >
                                Start Shopping
                            </button>

                            {filter !== "all" && (
                                <button
                                    onClick={() => setFilter("all")}
                                    className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:scale-105"
                                    style={{
                                        borderColor: isDark ? "#475569" : "#cbd5e1",
                                    }}
                                >
                                    View All Orders
                                </button>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <div className="space-y-4">
                            {filteredOrders.map((order, index) => {
                                const statusInfo = getStatusInfo(order.status);
                                const paymentInfo = getPaymentInfo(order.paymentStatus);
                                const totalItems = calculateTotalItems(order);

                                return (
                                    <motion.div
                                        key={order._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.005] transition-transform"
                                        style={{
                                            background: isDark ? "#1E293B" : "#ffffff",
                                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                                        }}
                                        onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                    >
                                        <div className="p-4 sm:p-6">
                                            {/* Order Header */}
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-lg">
                                                            Order #{order._id.slice(-8).toUpperCase()}
                                                        </h3>
                                                        <span className="text-xs opacity-70">
                                                            {formatDate(order.createdAt)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm opacity-70">
                                                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    {/* Status Badge */}
                                                    <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 ${statusInfo.bg}`}>
                                                        {statusInfo.icon}
                                                        <span className={`text-sm font-medium ${statusInfo.text}`}>
                                                            {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                                                        </span>
                                                    </div>

                                                    {/* Payment Status */}
                                                    <div className="flex items-center gap-1">
                                                        {paymentInfo.icon}
                                                        <span className={`text-sm ${paymentInfo.text}`}>
                                                            {order.paymentStatus}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Items Preview */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                                {order.items.slice(0, 3).map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg"
                                                        style={{
                                                            background: isDark ? "#334155" : "#f3f4f6",
                                                        }}
                                                    >
                                                        <img
                                                            src={item.product?.image}
                                                            alt={item.product?.name}
                                                            className="w-16 h-16 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium truncate">{item.product?.name}</p>
                                                            <div className="flex justify-between items-center mt-1">
                                                                <p className="text-green-500 font-bold">
                                                                    ₹{item.product?.price?.toLocaleString()}
                                                                </p>
                                                                <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {order.items.length > 3 && (
                                                    <div className="flex items-center justify-center p-3 rounded-lg"
                                                        style={{
                                                            background: isDark ? "#334155" : "#f3f4f6",
                                                        }}
                                                    >
                                                        <p className="opacity-70">
                                                            +{order.items.length - 3} more items
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Order Footer */}
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t"
                                                style={{
                                                    borderColor: isDark ? "#334155" : "#e2e8f0",
                                                }}
                                            >
                                                <div>
                                                    <p className="font-bold text-lg text-green-500">
                                                        ₹{order.totalAmount?.toLocaleString()}
                                                    </p>
                                                    <p className="text-sm opacity-70">
                                                        Payment ID: {order.paymentId?.slice(-8) || "N/A"}
                                                    </p>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Implement download invoice
                                                            alert("Invoice download feature coming soon!");
                                                        }}
                                                        className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                                                        style={{
                                                            background: isDark ? "#334155" : "#e2e8f0",
                                                        }}
                                                    >
                                                        📄 Invoice
                                                    </button>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Implement track order
                                                            alert("Track order feature coming soon!");
                                                        }}
                                                        className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
                                                        style={{
                                                            background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        <Truck size={16} />
                                                        Track Order
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Expand for more details */}
                                            {selectedOrder?._id === order._id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-4 pt-4 border-t"
                                                    style={{
                                                        borderColor: isDark ? "#334155" : "#e2e8f0",
                                                    }}
                                                >
                                                    <h4 className="font-bold mb-3">Order Details</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="font-medium mb-1">Shipping Address</p>
                                                            <p className="text-sm opacity-70">
                                                                {order.shippingAddress || "No address provided"}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="font-medium mb-1">Contact Information</p>
                                                            <p className="text-sm opacity-70">
                                                                {order.contactInfo || "No contact info"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* All Items */}
                                                    <div className="mt-4">
                                                        <p className="font-medium mb-2">All Items ({order.items.length})</p>
                                                        <div className="space-y-2">
                                                            {order.items.map((item, idx) => (
                                                                <div key={idx} className="flex items-center justify-between p-2 rounded"
                                                                    style={{
                                                                        background: isDark ? "#334155" : "#f3f4f6",
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <img
                                                                            src={item.product?.image}
                                                                            alt={item.product?.name}
                                                                            className="w-12 h-12 rounded object-cover"
                                                                        />
                                                                        <div>
                                                                            <p className="font-medium">{item.product?.name}</p>
                                                                            <p className="text-sm opacity-70">{item.product?.category}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-bold text-green-500">
                                                                            ₹{(item.product?.price * item.quantity).toLocaleString()}
                                                                        </p>
                                                                        <p className="text-sm opacity-70">Qty: {item.quantity}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </AnimatePresence>
                )}

                {/* Order Summary Stats */}
                {orders.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 p-6 rounded-2xl"
                        style={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            boxShadow: "0 20px 60px rgba(102, 126, 234, 0.4)",
                        }}
                    >
                        <h3 className="text-xl font-bold mb-4">📊 Order Summary</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold">{orders.length}</p>
                                <p className="opacity-90">Total Orders</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-300">
                                    ₹{orders.reduce((sum, order) => sum + order.totalAmount, 0).toLocaleString()}
                                </p>
                                <p className="opacity-90">Total Spent</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {orders.filter(o => o.status === 'delivered').length}
                                </p>
                                <p className="opacity-90">Delivered</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    {orders.reduce((sum, order) => sum + calculateTotalItems(order), 0)}
                                </p>
                                <p className="opacity-90">Items Purchased</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Quick Help */}
            <div className="mt-8 max-w-6xl mx-auto p-4 rounded-lg"
                style={{
                    background: isDark ? "#1E293B" : "#ffffff",
                    border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
                }}
            >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="font-bold mb-1">Need help with your order?</p>
                        <p className="text-sm opacity-70">Contact our support team for assistance</p>
                    </div>
                    <button
                        onClick={() => alert("Support: support@larastore.com | Phone: +91 98765 43210")}
                        className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                        style={{
                            background: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
                            color: "#fff",
                        }}
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default MyOrders;