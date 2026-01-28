import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    ShoppingCart,
    ArrowUp,
    Heart,
    X,
    Package
} from "lucide-react";

const FloatingActions = ({
    isDark = false,
    wishlistCount = 0,
    cartCount = 0,
    ordersCount = 0,
    onSearchClick,
    onWishlistClick,
    onCartClick,
    onOrdersClick,
    showLabels = false,
}) => {
    const navigate = useNavigate();
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showMenu, setShowMenu] = useState(false);

    // Handle scroll to show/hide back to top button
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show back to top button when scrolled down 300px
            setShowBackToTop(currentScrollY > 300);

            // Hide floating actions when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
                setShowMenu(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Handle search submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Main actions array - Now 5 options with orders
    const mainActions = [
        {
            id: "search",
            icon: isSearchOpen ? <X size={20} /> : <Search size={20} />,
            label: "Search",
            color: "#3B82F6",
            onClick: () => setIsSearchOpen(!isSearchOpen),
            badge: null,
            alwaysShow: true,
        },
        {
            id: "orders",
            icon: <Package size={20} />,
            label: "My Orders",
            color: "#F59E0B",
            onClick: onOrdersClick || (() => navigate("/my-orders")),
            badge: ordersCount > 0 ? ordersCount : null,
            alwaysShow: false,
        },
        {
            id: "wishlist",
            icon: <Heart size={20} />,
            label: "Wishlist",
            color: "#EF4444",
            onClick: onWishlistClick || (() => navigate("/wishlist")),
            badge: wishlistCount > 0 ? wishlistCount : null,
            alwaysShow: false,
        },
        {
            id: "cart",
            icon: <ShoppingCart size={20} />,
            label: "Cart",
            color: "#10B981",
            onClick: onCartClick || (() => navigate("/cart")),
            badge: cartCount > 0 ? cartCount : null,
            alwaysShow: false,
        },
        {
            id: "top",
            icon: <ArrowUp size={20} />,
            label: "Back to Top",
            color: "#8B5CF6",
            onClick: scrollToTop,
            badge: null,
            visible: showBackToTop,
            alwaysShow: false,
        },
    ];

    // Always visible actions (Search + Menu)
    const alwaysVisibleActions = mainActions.filter(action => action.alwaysShow);
    
    // Actions that appear in menu
    const menuActions = mainActions.filter(action => !action.alwaysShow && action.visible !== false);

    return (
        <>
            {/* Search Modal/Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSearchOpen(false)}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: isDark
                                ? "rgba(15, 23, 42, 0.95)"
                                : "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                            zIndex: 9998,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: "90%",
                                maxWidth: "500px",
                                padding: "2rem",
                                borderRadius: "20px",
                                background: isDark
                                    ? "linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))"
                                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))",
                                border: isDark
                                    ? "1px solid rgba(255, 255, 255, 0.1)"
                                    : "1px solid rgba(0, 0, 0, 0.1)",
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <form onSubmit={handleSearchSubmit}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "1rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <Search
                                        size={24}
                                        color={isDark ? "#94A3B8" : "#64748B"}
                                    />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for products, categories, or brands..."
                                        autoFocus
                                        style={{
                                            flex: 1,
                                            background: "transparent",
                                            border: "none",
                                            outline: "none",
                                            fontSize: "1.1rem",
                                            color: isDark ? "#F8FAFC" : "#0F172A",
                                            padding: "0.5rem 0",
                                        }}
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery("")}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                color: isDark ? "#94A3B8" : "#64748B",
                                                cursor: "pointer",
                                                padding: "0.5rem",
                                            }}
                                        >
                                            <X size={20} />
                                        </button>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        width: "100%",
                                        padding: "1rem",
                                        borderRadius: "12px",
                                        border: "none",
                                        background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
                                        color: "white",
                                        fontWeight: "600",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                        transition: "all 0.3s",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
                                    onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                                >
                                    Search Products
                                </button>
                            </form>

                            {/* Quick Search Suggestions */}
                            <div style={{ marginTop: "2rem" }}>
                                <p style={{
                                    color: isDark ? "#94A3B8" : "#64748B",
                                    fontSize: "0.9rem",
                                    marginBottom: "0.5rem"
                                }}>
                                    Popular Searches:
                                </p>
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem"
                                }}>
                                    {["Earrings", "Necklace", "Rings", "Summer", "Sassy"].map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => {
                                                navigate(`/shop?search=${encodeURIComponent(tag)}`);
                                                setIsSearchOpen(false);
                                                setSearchQuery("");
                                            }}
                                            style={{
                                                padding: "0.5rem 1rem",
                                                borderRadius: "20px",
                                                border: "none",
                                                background: isDark
                                                    ? "rgba(255, 255, 255, 0.1)"
                                                    : "rgba(0, 0, 0, 0.05)",
                                                color: isDark ? "#E2E8F0" : "#475569",
                                                fontSize: "0.85rem",
                                                cursor: "pointer",
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = isDark
                                                ? "rgba(255, 255, 255, 0.2)"
                                                : "rgba(0, 0, 0, 0.1)"
                                            }
                                            onMouseLeave={(e) => e.target.style.background = isDark
                                                ? "rgba(255, 255, 255, 0.1)"
                                                : "rgba(0, 0, 0, 0.05)"
                                            }
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Actions Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    y: isVisible ? 0 : 20
                }}
                transition={{ duration: 0.3 }}
                style={{
                    position: "fixed",
                    bottom: "2rem",
                    right: "2rem",
                    zIndex: 9999,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: "1rem",
                }}
            >
                {/* Menu Actions (Orders, Wishlist, Cart, Back to Top) */}
                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                alignItems: "flex-end",
                            }}
                        >
                            {menuActions.map((action) => (
                                <motion.div
                                    key={action.id}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ delay: menuActions.indexOf(action) * 0.05 }}
                                    style={{ position: "relative" }}
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={action.onClick}
                                        style={{
                                            width: "56px",
                                            height: "56px",
                                            borderRadius: "28px",
                                            border: "none",
                                            background: `linear-gradient(135deg, ${action.color}, ${action.color}DD)`,
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            boxShadow: `0 8px 25px ${action.color}40`,
                                            position: "relative",
                                            zIndex: 1,
                                        }}
                                    >
                                        {action.icon}

                                        {/* Badge for notifications */}
                                        {action.badge !== null && action.badge > 0 && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                style={{
                                                    position: "absolute",
                                                    top: "-5px",
                                                    right: "-5px",
                                                    background: "#EF4444",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    width: "22px",
                                                    height: "22px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "0.7rem",
                                                    fontWeight: "bold",
                                                    border: `2px solid ${isDark ? "#0F172A" : "#FFFFFF"}`,
                                                }}
                                            >
                                                {action.badge > 9 ? "9+" : action.badge}
                                            </motion.div>
                                        )}
                                    </motion.button>

                                    {/* Optional Labels - Appear on hover */}
                                    {showLabels && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 0 }}
                                            whileHover={{ opacity: 1, x: 0 }}
                                            style={{
                                                position: "absolute",
                                                right: "70px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                background: isDark
                                                    ? "rgba(15, 23, 42, 0.9)"
                                                    : "rgba(255, 255, 255, 0.9)",
                                                backdropFilter: "blur(10px)",
                                                padding: "0.5rem 1rem",
                                                borderRadius: "8px",
                                                border: isDark
                                                    ? "1px solid rgba(255, 255, 255, 0.1)"
                                                    : "1px solid rgba(0, 0, 0, 0.1)",
                                                color: isDark ? "#F8FAFC" : "#0F172A",
                                                fontSize: "0.85rem",
                                                fontWeight: "500",
                                                whiteSpace: "nowrap",
                                                pointerEvents: "none",
                                            }}
                                        >
                                            {action.label}
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    right: "-6px",
                                                    top: "50%",
                                                    transform: "translateY(-50%)",
                                                    width: "0",
                                                    height: "0",
                                                    borderTop: "6px solid transparent",
                                                    borderBottom: "6px solid transparent",
                                                    borderLeft: `6px solid ${isDark
                                                        ? "rgba(15, 23, 42, 0.9)"
                                                        : "rgba(255, 255, 255, 0.9)"
                                                        }`,
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Always Visible Actions (Search + Menu Toggle) */}
                <motion.div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "flex-end",
                    }}
                >
                    {/* Menu Toggle Button */}
                    <motion.div style={{ position: "relative" }}>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowMenu(!showMenu)}
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "28px",
                                border: "none",
                                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {showMenu ? (
                                <X size={20} />
                            ) : (
                                <motion.div
                                    animate={{ rotate: showMenu ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div style={{ fontSize: "24px" }}>☰</div>
                                </motion.div>
                            )}
                        </motion.button>

                        {/* Menu Label */}
                        {showLabels && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 0 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                style={{
                                    position: "absolute",
                                    right: "70px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: isDark
                                        ? "rgba(15, 23, 42, 0.9)"
                                        : "rgba(255, 255, 255, 0.9)",
                                    backdropFilter: "blur(10px)",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "8px",
                                    border: isDark
                                        ? "1px solid rgba(255, 255, 255, 0.1)"
                                        : "1px solid rgba(0, 0, 0, 0.1)",
                                    color: isDark ? "#F8FAFC" : "#0F172A",
                                    fontSize: "0.85rem",
                                    fontWeight: "500",
                                    whiteSpace: "nowrap",
                                    pointerEvents: "none",
                                }}
                            >
                                {showMenu ? "Close Menu" : "Quick Actions"}
                                <div
                                    style={{
                                        position: "absolute",
                                        right: "-6px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "0",
                                        height: "0",
                                        borderTop: "6px solid transparent",
                                        borderBottom: "6px solid transparent",
                                        borderLeft: `6px solid ${isDark
                                            ? "rgba(15, 23, 42, 0.9)"
                                            : "rgba(255, 255, 255, 0.9)"
                                            }`,
                                    }}
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Search Button */}
                    {alwaysVisibleActions.map((action) => (
                        <motion.div
                            key={action.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ position: "relative" }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={action.onClick}
                                style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "28px",
                                    border: "none",
                                    background: `linear-gradient(135deg, ${action.color}, ${action.color}DD)`,
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    boxShadow: `0 8px 25px ${action.color}40`,
                                    position: "relative",
                                    zIndex: 1,
                                }}
                            >
                                {action.icon}
                            </motion.button>

                            {/* Optional Labels - Appear on hover */}
                            {showLabels && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 0 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    style={{
                                        position: "absolute",
                                        right: "70px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        background: isDark
                                            ? "rgba(15, 23, 42, 0.9)"
                                            : "rgba(255, 255, 255, 0.9)",
                                        backdropFilter: "blur(10px)",
                                        padding: "0.5rem 1rem",
                                        borderRadius: "8px",
                                        border: isDark
                                            ? "1px solid rgba(255, 255, 255, 0.1)"
                                            : "1px solid rgba(0, 0, 0, 0.1)",
                                        color: isDark ? "#F8FAFC" : "#0F172A",
                                        fontSize: "0.85rem",
                                        fontWeight: "500",
                                        whiteSpace: "nowrap",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {action.label}
                                    <div
                                        style={{
                                            position: "absolute",
                                            right: "-6px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            width: "0",
                                            height: "0",
                                            borderTop: "6px solid transparent",
                                            borderBottom: "6px solid transparent",
                                            borderLeft: `6px solid ${isDark
                                                ? "rgba(15, 23, 42, 0.9)"
                                                : "rgba(255, 255, 255, 0.9)"
                                                }`,
                                        }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </>
    );
};

export default FloatingActions;