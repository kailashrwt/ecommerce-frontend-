import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // ✅ Load once from localStorage
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(saved);
        setIsLoaded(true);
    }, []);

    // ✅ Sync ONLY after load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }
    }, [wishlist, isLoaded]);

    const addToWishlist = (product) => {
        setWishlist((prev) =>
            prev.some((p) => p._id === product._id) ? prev : [...prev, product]
        );
    };

    const removeFromWishlist = (id) => {
        setWishlist((prev) => prev.filter((p) => p._id !== id));
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) =>
            prev.some((p) => p._id === product._id)
                ? prev.filter((p) => p._id !== product._id)
                : [...prev, product]
        );
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistCount: wishlist.length,
                addToWishlist,
                removeFromWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
