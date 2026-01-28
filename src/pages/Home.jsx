import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import FloatingActions from "../components/FloatingActions";
import { useWishlist } from "../context/WishlistContext";
import AddToCart from "./AddToCart";
import axios from "axios";
import {
  BerryMinimum,
  BraceletsIcon,
  CitrusChic,
  ClassicVanilla,
  EarringsIcon,
  Gift2100To3500Icon,
  Gift3600To5000Icon,
  GiftIcon,
  HoopsIcon,
  LilScoopsies,
  LuxuriusLime,
  NecklaceIcon,
  RingsIcon,
  SassySorbet,
  SorbetSensation,
  SummerFling,
} from "../components/Icons";
import {
  DiamondMinus,
  SearchIcon,
  ShoppingBag,
  Shield,
  Truck,
  CreditCard,
  RefreshCw,
  Sparkles,
  Award,
  Users,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Home({ theme, setCartCount }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const controls = useAnimation();
  const sectionRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeMobileProduct, setActiveMobileProduct] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [counters, setCounters] = useState({
    customers: 0,
    designs: 0,
    years: 0,
  });
  const [showBanner, setShowBanner] = useState(true);
  const [seasonalBanner, setSeasonalBanner] = useState({
    title: "Valentine Special Collection",
    subtitle: "Express Love with Handcrafted Elegance",
    cta: "Shop Now",
    expires: "2024-02-14",
    image: "https://images.unsplash.com/photo-1512850183-6d8b49e2a2a5?q=80&w=2070",
  });

  // Hero Images Array
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop",
      title: "Discover Your Signature Style ✨",
      subtitle: "Handcrafted jewelry that tells your story with elegance and soul.",
      color: "#4ECDC4"
    },
    {
      url: "https://images.unsplash.com/photo-1594576722512-582d5577dc56?q=80&w=2071&auto=format&fit=crop",
      title: "Elegance Redefined 🌟",
      subtitle: "Premium craftsmanship meets timeless design.",
      color: "#FF6B6B"
    },
    {
      url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2070&auto=format&fit=crop",
      title: "Artistry in Every Detail 🎨",
      subtitle: "Where passion meets precision in jewelry making.",
      color: "#8B5CF6"
    },
    {
      url: "https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?q=80&w=2070&auto=format&fit=crop",
      title: "Luxury Within Reach 💎",
      subtitle: "Exclusive collections at accessible prices.",
      color: "#2DD4BF"
    },
    {
      url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=2070&auto=format&fit=crop",
      title: "Modern Heritage ✨",
      subtitle: "Contemporary designs with traditional soul.",
      color: "#F59E0B"
    },
    {
      url: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=2069&auto=format&fit=crop",
      title: "Personal Expression 🌸",
      subtitle: "Jewelry that speaks your unique language.",
      color: "#06D6A0"
    },
    {
      url: "https://images.unsplash.com/photo-1590940218038-3e1307980f4f?q=80&w=2069&auto=format&fit=crop",
      title: "Crafted with Love 💖",
      subtitle: "Each piece tells a story of dedication.",
      color: "#FFD166"
    },
    {
      url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070&auto=format&fit=crop",
      title: "Timeless Collections ⏳",
      subtitle: "Jewelry that transcends trends.",
      color: "#118AB2"
    }
  ];


  // Random image selection on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setCurrentHeroImage(randomIndex);
    
    // Optional: Change image every 10 seconds (auto-rotation)
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Fetch initial cart count
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get(
            "https://ecommerce-backend-s1l7.onrender.com/api/cart/me",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (res.data.cart?.items) {
            const total = res.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(total);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCartCount();
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Categories with enhanced data
  const categories = [
    { label: "Hoops", path: "/client/shop/hoops", type: "Hoops", icon: <HoopsIcon />, color: "#FF6B6B" },
    { label: "Earrings", path: "/client/shop/earrings", type: "Earrings", icon: <EarringsIcon />, color: "#4ECDC4" },
    { label: "Necklace", path: "/client/shop/necklace", type: "Necklace", icon: <NecklaceIcon />, color: "#FFD166" },
    { label: "Bracelets", path: "/client/shop/bracelets", type: "Bracelets", icon: <BraceletsIcon />, color: "#06D6A0" },
    { label: "Rings", path: "/client/shop/rings", type: "Rings", icon: <RingsIcon />, color: "#118AB2" },
    { label: "Citrus Chic", path: "/client/flavors/citruschic", type: "Citrus Chic", icon: <CitrusChic />, color: "#FFD93D" },
    { label: "Berry Minimum", path: "/client/flavors/berryminimum", type: "Berry Minimum", icon: <BerryMinimum />, color: "#6B5B95" },
    { label: "Classic Vanilla", path: "/client/flavors/classicvanilla", type: "Classic Vanilla", icon: <ClassicVanilla />, color: "#F7B267" },
    { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime", type: "Luxurious Lime", icon: <LuxuriusLime />, color: "#2A9D8F" },
    { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation", type: "Sorbet Sensation", icon: <SorbetSensation />, color: "#E76F51" },
    { label: "Summer Fling", path: "/client/flavors/summerfling", type: "Summer Fling", icon: <SummerFling />, color: "#E9C46A" },
    { label: "Lil Scoopsies", path: "/sorbetgirl/lilscoopsies", type: "Lil Scoopsies", icon: <LilScoopsies />, color: "#9D4EDD" },
    { label: "Sassy Sorbet", path: "/sorbetgirl/sassysorbet", type: "Sassy Sorbet", icon: <SassySorbet />, color: "#FF6B6B" },
    { label: "Gift Under ₹2000", path: "/gifts/giftunder2000", type: "under2000", icon: <GiftIcon />, color: "#4ECDC4" },
    { label: "Gift ₹2100-₹3500", path: "/gifts/gift2100to3500", type: "2100to3500", icon: <Gift2100To3500Icon />, color: "#06D6A0" },
    { label: "Gift ₹3600-₹5000", path: "/gifts/gift3600to5000", type: "3600to5000", icon: <Gift3600To5000Icon />, color: "#118AB2" },
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const newData = {};
        for (const c of categories) {
          let url = "";
          if (c.type === "under2000") {
            url = "https://ecommerce-backend-s1l7.onrender.com/api/products/price/0/2000";
          } else if (c.type === "2100to3500") {
            url = "https://ecommerce-backend-s1l7.onrender.com/api/products/price/2100/3500";
          } else if (c.type === "3600to5000") {
            url = "https://ecommerce-backend-s1l7.onrender.com/api/products/price/3600/5000";
          } else {
            url = `https://ecommerce-backend-s1l7.onrender.com/api/products/category/${c.type}`;
          }
          const res = await axios.get(url);
          if (res.data.success) {
            newData[c.label] = res.data.products.slice(0, isMobile ? 3 : isTablet ? 4 : 5);
          }
        }
        setCategoryProducts(newData);
      } catch (error) {
        console.error("Home categories fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [isMobile, isTablet]);

  // Animated counters on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetCustomers = 10000;
            const targetDesigns = 2000;
            const targetYears = 5;
            const duration = 2000;
            const steps = 60;
            const incrementCustomers = targetCustomers / steps;
            const incrementDesigns = targetDesigns / steps;
            const incrementYears = targetYears / steps;
            let currentCustomers = 0;
            let currentDesigns = 0;
            let currentYears = 0;
            const timer = setInterval(() => {
              currentCustomers += incrementCustomers;
              currentDesigns += incrementDesigns;
              currentYears += incrementYears;
              setCounters({
                customers: Math.min(Math.round(currentCustomers), targetCustomers),
                designs: Math.min(Math.round(currentDesigns), targetDesigns),
                years: Math.min(currentYears.toFixed(1), targetYears),
              });
              if (currentCustomers >= targetCustomers && currentDesigns >= targetDesigns && currentYears >= targetYears) {
                clearInterval(timer);
              }
            }, duration / steps);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (sectionRefs.current[2]) {
      observer.observe(sectionRefs.current[2]);
    }
    return () => observer.disconnect();
  }, []);

  // Horizontal scroll for mobile categories
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(4, 1fr)",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
      {[...Array(isMobile ? 4 : isTablet ? 6 : 8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            background: isDark ? "#1E293B" : "#E2E8F0",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "200px",
              background: isDark ? "#2D3748" : "#CBD5E1",
            }}
          />
          <div style={{ padding: "1rem" }}>
            <div
              style={{
                height: "20px",
                width: "70%",
                background: isDark ? "#2D3748" : "#CBD5E1",
                borderRadius: "4px",
                marginBottom: "0.5rem",
              }}
            />
            <div
              style={{
                height: "16px",
                width: "40%",
                background: isDark ? "#2D3748" : "#CBD5E1",
                borderRadius: "4px",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
                }, transparent)`,
              animation: "shimmer 1.5s infinite",
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  if (loading) {
    return (
      <div style={{ background: isDark ? "#0F172A" : "#F8FAFC", minHeight: "100vh" }}>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        background: isDark ? "#0F172A" : "#F8FAFC",
        color: isDark ? "#F8FAFC" : "#0F172A",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Seasonal Banner */}
      {showBanner && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 20 }}
          style={{
            background: `linear-gradient(135deg, ${isDark ? "#1E1B4B" : "#7C3AED"}, ${isDark ? "#0F172A" : "#4F46E5"})`,
            color: "white",
            padding: "1rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070')",
              backgroundSize: "cover",
              opacity: 0.1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <Heart size={20} />
              <span style={{ fontWeight: "bold", fontSize: isMobile ? "0.9rem" : "1.1rem" }}>{seasonalBanner.title}</span>
              <span style={{ opacity: 0.9 }}>{seasonalBanner.subtitle}</span>
              <button
                onClick={() => navigate("/shop")}
                style={{
                  background: "white",
                  color: "#7C3AED",
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                {seasonalBanner.cta}
              </button>
              <button
                onClick={() => setShowBanner(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1.5rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Section with Rotating Images */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image with Random Selection */}
        <motion.div
          key={currentHeroImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${heroImages[currentHeroImage].url}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
            zIndex: 0,
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.95))"
              : "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(241,245,249,0.9))",
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <motion.div
          key={currentHeroImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "900px",
            padding: isMobile ? "1.5rem" : "2rem",
            color: isDark ? "#F8FAFC" : "#0F172A",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: "800",
              marginBottom: "1rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {heroImages[currentHeroImage].title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: "1.1rem",
              opacity: 0.9,
              marginBottom: "2rem",
              textShadow: "0 1px 5px rgba(0,0,0,0.2)",
            }}
          >
            {heroImages[currentHeroImage].subtitle}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/shop")}
            style={{
              padding: "0.9rem 2rem",
              borderRadius: "30px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
              background: `linear-gradient(135deg, ${heroImages[currentHeroImage].color}, #2DD4BF)`,
              color: "#fff",
              boxShadow: `0 8px 25px rgba(${parseInt(heroImages[currentHeroImage].color.slice(1, 3), 16)}, ${parseInt(heroImages[currentHeroImage].color.slice(3, 5), 16)}, ${parseInt(heroImages[currentHeroImage].color.slice(5, 7), 16)}, 0.35)`,
              transition: "all 0.3s ease",
            }}
            whileHover={{ scale: 1.05, boxShadow: `0 12px 30px rgba(${parseInt(heroImages[currentHeroImage].color.slice(1, 3), 16)}, ${parseInt(heroImages[currentHeroImage].color.slice(3, 5), 16)}, ${parseInt(heroImages[currentHeroImage].color.slice(5, 7), 16)}, 0.5)` }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Collection
          </motion.button>

          {/* Image Indicator Dots */}
          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "2rem",
              }}
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  style={{
                    width: index === currentHeroImage ? "20px" : "10px",
                    height: "10px",
                    borderRadius: "10px",
                    border: "none",
                    background: index === currentHeroImage ? heroImages[currentHeroImage].color : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Optional: Next/Prev Arrows for Desktop */}
        {!isMobile && (
          <>
            <button
              onClick={prevHeroImage}
              style={{
                position: "absolute",
                left: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                zIndex: 3,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.target.style.background = "rgba(255,255,255,0.3)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextHeroImage}
              style={{
                position: "absolute",
                right: "2rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                zIndex: 3,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={e => {
                e.target.style.background = "rgba(255,255,255,0.3)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "rgba(255,255,255,0.2)";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </motion.section>

      {/* Trust Badges */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          padding: isMobile ? "2rem 1rem" : "3rem 1.5rem",
          background: isDark
            ? "linear-gradient(135deg, #1E293B, #0F172A)"
            : "linear-gradient(135deg, #F8FAFC, #FFFFFF)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: "1.5rem",
              textAlign: "center",
            }}
          >
            {[
              { icon: <Shield />, text: "100% Authentic", color: "#10B981" },
              { icon: <Truck />, text: "Free Shipping", color: "#3B82F6" },
              { icon: <CreditCard />, text: "Secure Payments", color: "#8B5CF6" },
              { icon: <RefreshCw />, text: "Easy Returns", color: "#F59E0B" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  padding: "1.5rem",
                  background: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderRadius: "16px",
                  backdropFilter: "blur(10px)",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    color: badge.color,
                    fontSize: "2rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {badge.icon}
                </div>
                <p style={{ fontWeight: "600", fontSize: "0.95rem" }}>{badge.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Animated Counters */}
      <motion.section
        ref={(el) => (sectionRefs.current[2] = el)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          padding: isMobile ? "3rem 1rem" : "4rem 1.5rem",
          background: isDark
            ? "linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)"
            : "linear-gradient(135deg, #E0E7FF 0%, #F8FAFC 100%)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "3rem", fontWeight: "700" }}>
            Our Legacy in Numbers
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "2rem",
            }}
          >
            {[
              { icon: <Users />, value: "12k+", label: "Happy Customers", color: "#2DD4BF" },
              { icon: <Sparkles />, value: `30+`, label: "Unique Designs", color: "#8B5CF6" },
              { icon: <Award />, value: `5`, label: "Years Craftsmanship", color: "#F59E0B" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                style={{
                  padding: "2rem",
                  background: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.8)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  border: isDark
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ fontSize: "3rem", color: stat.color, marginBottom: "1rem" }}>{stat.icon}</div>
                <div style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "800", color: stat.color, marginBottom: "0.5rem" }}>
                  {stat.value}
                </div>
                <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CATEGORY SECTIONS - With Horizontal Slider for Mobile */}
      {categories.map((cat, index) => (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          key={cat.label}
          style={{
            padding: isMobile ? "2rem 0" : "3.5rem 1.5rem",
            background:
              index % 2 === 0
                ? isDark
                  ? "linear-gradient(135deg,#0F172A,#1E293B)"
                  : "linear-gradient(135deg,#FFFFFF,#F8FAFC)"
                : "transparent",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 1rem" : "0 1rem" }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
                paddingLeft: "1rem",
                borderLeft: `4px solid ${cat.color || "#2DD4BF"}`,
              }}
            >
              <span style={{ fontSize: isMobile ? "1.5rem" : "2rem", color: cat.color }}>
                {cat.icon}
              </span>
              <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "700" }}>{cat.label}</h2>
            </motion.div>

            {/* Horizontal Scroll Container for Mobile */}
            {isMobile ? (
              <div
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "1rem",
                  padding: "0.5rem 0",
                  scrollSnapType: "x mandatory",
                  cursor: isDragging ? "grabbing" : "grab",
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {(categoryProducts[cat.label] || []).map((item) => (
                  <motion.div
                    key={item._id}
                    onClick={() => setActiveMobileProduct(activeMobileProduct === item._id ? null : item._id)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: "0 0 auto",
                      width: "160px",
                      scrollSnapAlign: "start",
                      borderRadius: "16px",
                      padding: "1rem",
                      background: isDark
                        ? "linear-gradient(145deg,#1E293B,#334155)"
                        : "linear-gradient(145deg,#FFFFFF,#F8FAFC)",
                      border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
                      cursor: "pointer",
                      overflow: "hidden",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                      position: "relative",
                    }}
                  >
                    {/* Wishlist Heart Icon - Always Visible */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      whileTap={{ scale: 0.85 }}
                      style={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "50%",
                        padding: "0.4rem",
                        color: wishlist.find(p => p._id === item._id) ? "#EF4444" : "#fff",
                        zIndex: 5,
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Heart
                        size={16}
                        fill={wishlist.some(p => p._id === item._id) ? "#EF4444" : "none"}
                        color="#Ef4444"
                      />
                    </motion.button>

                    <div style={{ position: "relative" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "140px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                      {activeMobileProduct === item._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "12px",
                            background: isDark
                              ? "rgba(15, 23, 42, 0.9)"
                              : "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(12px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1rem",
                            gap: "0.8rem",
                          }}
                        >
                          <div
                            style={{
                              background: isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                              padding: "0.8rem",
                              borderRadius: "12px",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            <h3 style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                              {item.name}
                            </h3>
                            <p style={{ fontWeight: "700", color: "#10B981", fontSize: "0.9rem" }}>
                              ₹{item.price}
                            </p>
                          </div>

                          {/* Add to Cart Button using your component */}
                          <AddToCart
                            productId={item._id}
                            setCartCount={setCartCount}
                            style={{
                              padding: "0.6rem 1.2rem",
                              borderRadius: "25px",
                              border: "none",
                              fontWeight: "600",
                              background: "linear-gradient(135deg,#22C55E,#10B981)",
                              color: "white",
                              fontSize: "0.8rem",
                              boxShadow: "0 6px 20px rgba(16,185,129,0.4)",
                              backdropFilter: "blur(10px)",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${item._id}`);
                            }}
                            style={{
                              padding: "0.5rem 1rem",
                              borderRadius: "25px",
                              border: "none",
                              fontWeight: "600",
                              background: "linear-gradient(135deg,#4ECDC4,#2DD4BF)",
                              color: "white",
                              fontSize: "0.8rem",
                              backdropFilter: "blur(10px)",
                              boxShadow: "0 4px 15px rgba(46, 212, 191, 0.3)",
                              width: "100%",
                            }}
                          >
                            Quick View
                          </button>
                        </motion.div>
                      )}
                    </div>
                    <div style={{ padding: "0.5rem 0 0 0", display: activeMobileProduct === item._id ? "none" : "block" }}>
                      <h3 style={{ fontWeight: "600", fontSize: "0.9rem", marginBottom: "0.3rem" }}>{item.name}</h3>
                      <p style={{ fontWeight: "700", color: "#10B981", fontSize: "0.9rem" }}>₹{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Desktop/Tablet Grid View
              <motion.div
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.15 } },
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                style={{
                  display: "grid",
                  gridTemplateColumns: isTablet
                    ? "repeat(auto-fit, minmax(200px, 1fr))"
                    : "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: isMobile ? "1rem" : "2rem",
                }}
              >
                {(categoryProducts[cat.label] || []).map((item) => (
                  <motion.div
                    key={item._id}
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                    onMouseEnter={() => setHoveredProduct(item._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    onClick={() => navigate(`/product/${item._id}`)}
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    style={{
                      position: "relative",
                      borderRadius: "18px",
                      padding: "1.2rem",
                      background: isDark
                        ? "linear-gradient(145deg,#1E293B,#334155)"
                        : "linear-gradient(145deg,#FFFFFF,#F8FAFC)",
                      border: isDark ? "1px solid #334155" : "1px solid #E2E8F0",
                      cursor: "pointer",
                      overflow: "hidden",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {/* Wishlist Heart Icon - Always Visible */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item);
                      }}
                      whileTap={{ scale: 0.85 }}
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: isDark
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: isDark
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "50%",
                        padding: "0.5rem",
                        color: wishlist.find(p => p._id === item._id) ? "#EF4444" : "#fff",
                        zIndex: 5,
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Heart
                        size={20}
                        fill={wishlist.find(p => p._id === item._id) ? "#EF4444" : "none"}
                      />
                    </motion.button>

                    <div style={{ position: "relative" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: isTablet ? "180px" : "220px",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                      {hoveredProduct === item._id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{
                            position: "absolute",
                            inset: 0,
                            borderRadius: "12px",
                            background: isDark
                              ? "rgba(15, 23, 42, 0.95)"
                              : "rgba(255, 255, 255, 0.97)",
                            backdropFilter: "blur(12px)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "1.5rem",
                            gap: "1rem",
                          }}
                        >
                          <div
                            style={{
                              background: isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.05)",
                              padding: "1rem",
                              borderRadius: "12px",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            <h3 style={{ fontWeight: "600", fontSize: "1rem", marginBottom: "0.5rem" }}>
                              {item.name}
                            </h3>
                            <p style={{ fontWeight: "700", color: "#10B981", fontSize: "1.1rem" }}>
                              ₹{item.price}
                            </p>
                          </div>

                          {/* Add to Cart Button using your component */}
                          <AddToCart
                            productId={item._id}
                            setCartCount={setCartCount}
                            style={{
                              padding: "0.8rem 1.6rem",
                              borderRadius: "30px",
                              border: "none",
                              fontWeight: "600",
                              background: "linear-gradient(135deg,#22C55E,#10B981)",
                              color: "white",
                              fontSize: "0.9rem",
                              boxShadow: "0 6px 20px rgba(16,185,129,0.4)",
                              backdropFilter: "blur(10px)",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              width: "100%",
                              justifyContent: "center",
                            }}
                          />

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/product/${item._id}`);
                            }}
                            style={{
                              padding: "0.8rem 1.6rem",
                              borderRadius: "30px",
                              border: "none",
                              fontWeight: "600",
                              background: "linear-gradient(135deg,#4ECDC4,#2DD4BF)",
                              color: "white",
                              fontSize: "0.9rem",
                              backdropFilter: "blur(10px)",
                              boxShadow: "0 4px 15px rgba(46, 212, 191, 0.3)",
                              width: "100%",
                            }}
                          >
                            Quick View
                          </button>
                        </motion.div>
                      )}
                    </div>
                    <div style={{ padding: "0.8rem 0 0 0" }}>
                      <h3 style={{ fontWeight: "600", marginBottom: "0.3rem", fontSize: "1rem" }}>{item.name}</h3>
                      <p style={{ fontWeight: "700", color: "#10B981", fontSize: "1.1rem" }}>₹{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* View All Button */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(cat.path)}
                style={{
                  padding: isMobile ? "0.8rem 1.5rem" : "1rem 2rem",
                  borderRadius: "50px",
                  fontWeight: "600",
                  border: "none",
                  color: "#fff",
                  background: `linear-gradient(135deg, ${cat.color || "#4ECDC4"}, #2DD4BF)`,
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  backdropFilter: "blur(10px)",
                  boxShadow: `0 8px 20px rgba(${parseInt(cat.color?.slice(1, 3) || "78", 16)}, ${parseInt(
                    cat.color?.slice(3, 5) || "205",
                    16
                  )}, ${parseInt(cat.color?.slice(5, 7) || "196", 16)}, 0.3)`,
                }}
              >
                Explore {cat.label} →
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Custom FloatingActions with Wishlist Button and Cart Count */}
      <FloatingActions
        isDark={isDark}
        wishlistCount={wishlist.length}
      />

      <style>
        {`
        /* Global Styles */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDark ? "#1E293B" : "#F1F5F9"};
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDark ? "#4ECDC4" : "#2DD4BF"};
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "#2DD4BF" : "#10B981"};
        }
        
        /* Shimmer Animation */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Float Animation */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        
        /* Pulse Animation */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Fade In */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Heart Beat Animation for Wishlist */
        @keyframes heartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .heart-beat {
          animation: heartBeat 0.5s ease;
        }
        
        /* Hero Image Fade Transition */
        @keyframes heroFade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        .hero-auto-rotate {
          animation: heroFade 10s infinite;
        }
        
        /* Horizontal Scroll Hide Scrollbar */
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .horizontal-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Touch-friendly buttons */
        @media (max-width: 768px) {
          button, a {
            min-height: 44px !important;
            min-width: 44px !important;
          }
          
          .hero-section {
            min-height: 85vh !important;
          }
          
          .hero-title {
            font-size: clamp(1.8rem, 6vw, 2.5rem) !important;
          }
          
          .hero-subtitle {
            font-size: clamp(0.9rem, 3vw, 1.1rem) !important;
          }
        }
        
        /* Enhanced Glass Effects */
        .glass-dark {
          background: rgba(15, 23, 42, 0.7) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(45, 212, 191, 0.2) !important;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
        }
        
        .glass-light {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.9) !important;
        }
        
        /* Neon Glow Effect */
        .neon-glow {
          text-shadow: 
            0 0 10px rgba(45, 212, 191, 0.5),
            0 0 20px rgba(45, 212, 191, 0.3),
            0 0 30px rgba(45, 212, 191, 0.2);
        }
        
        /* Enhanced Card Hover */
        .card-hover {
          transition: all 0.3s ease !important;
        }
        
        .card-hover:hover {
          transform: translateY(-8px) !important;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 0 20px rgba(45, 212, 191, 0.1) !important;
        }
        
        /* Wishlist Button Glow */
        .wishlist-active {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.4) !important;
        }
        
        /* Responsive Typography */
        @media (max-width: 480px) {
          h1 { font-size: clamp(1.8rem, 6vw, 2.5rem) !important; }
          h2 { font-size: clamp(1.4rem, 5vw, 1.8rem) !important; }
          p { font-size: clamp(0.9rem, 3vw, 1rem) !important; }
        }
        
        /* Performance Optimizations */
        @media (prefers-reduced-motion: reduce) {
          .hero-section * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Button Transitions */
        button {
          transition: all 0.3s ease !important;
          cursor: pointer !important;
        }
        
        button:hover {
          transform: translateY(-2px) !important;
        }
        
        /* Wishlist Heart Animation */
        .wishlist-heart:active {
          animation: heartBeat 0.3s ease !important;
        }
        
        /* Image Loading Optimization */
        .hero-image {
          will-change: transform, opacity;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
        `}
      </style>
    </motion.div>
  );
}