import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AvatarIcon, BerryMinimum, BraceletsIcon, CartIcon, ClassicVanilla, DayThemeIcon, EarringsIcon, Gift2100To3500Icon, Gift3600To5000Icon, GiftUnder2000Icon, GirlIcon, HomeIcon, HoopsIcon, LilScoopsies, LoginIcon, LuxuriusLime, NecklaceIcon, NightThemeIcon, PremiumDiamondLogo, RingsIcon, SassySorbet, ShopIcon, SimpleSearchIcon, Sorbet, SorbetSensation, SummerFling, HeartIcon, HeartFilledIcon } from "../components/Icons";
import { CitrusIcon, EarIcon, GiftIcon, IceCream, IceCream2Icon, SaladIcon, SearchIcon, Settings, ShoppingBagIcon, X, ChevronRight, User, Package, LogOut } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function NavbarResponsive({
  theme = "light",
  onThemeToggle = () => {},
  isLoggedIn = false,
  currentUser = null,
  onLogin = () => {},
  onLogout = () => {},
  cartCount = 0,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // UI state
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileAccordions, setMobileAccordions] = useState({});
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState({ left: 0, width: 0 });
  const [wishlistPulse, setWishlistPulse] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Refs
  const drawerRef = useRef(null);
  const settingsRef = useRef(null);
  const navbarRef = useRef(null);
  const linksRef = useRef([]);
  const closeTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  const commandPaletteRef = useRef(null);
  const { toggleWishlist, wishlist, wishlistCount } = useWishlist();

  // Links & dropdown items
  const links = [
    { path: "/", label: "Home", icon: <HomeIcon /> },
    { path: "/shop", label: "Shop", icon: <ShoppingBagIcon />, dropdown: true },
    { path: "/flavors", label: "Flavors", icon: <IceCream />, dropdown: true },
    { path: "/sorbetgirl", label: "Sorbet Girl", icon: <GirlIcon />, dropdown: true },
    { path: "/gifts", label: "Gifts", icon: <GiftIcon />, dropdown: true },
    { path: "/sale", label: "Sale", icon: <SaladIcon /> },
  ];

  const dropdownItems = {
    Shop: [
      { label: "Hoops", path: "/client/shop/hoops", icon: <HoopsIcon />, featured: "/api/placeholder/200/200" },
      { label: "Earrings", path: "/client/shop/earrings", icon: <EarringsIcon />, featured: "/api/placeholder/200/200" },
      { label: "Necklace", path: "/client/shop/necklace", icon: <NecklaceIcon />, featured: "/api/placeholder/200/200" },
      { label: "Bracelets", path: "/client/shop/bracelets", icon: <BraceletsIcon />, featured: "/api/placeholder/200/200" },
      { label: "Rings", path: "/client/shop/rings", icon: <RingsIcon />, featured: "/api/placeholder/200/200" },
    ],
    Flavors: [
      { label: "Citrus Chic", path: "/client/flavors/citruschic", icon: <CitrusIcon />, description: "Zesty lemon & lime fusion" },
      { label: "Berry Minimum", path: "/client/flavors/berryminimum", icon: <BerryMinimum />, description: "Mixed berries delight" },
      { label: "Classic Vanilla", path: "/client/flavors/classicvanilla", icon: <ClassicVanilla />, description: "Timeless elegance" },
      { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime", icon: <LuxuriusLime />, description: "Rich green goodness" },
      { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation", icon: <SorbetSensation />, description: "Refreshing tropical mix" },
      { label: "Summer Fling Collection", path: "/client/flavors/summerfling", icon: <SummerFling />, description: "Limited edition" },
    ],
    "Sorbet Girl": [
      { label: "Lil Scoopsies", path: "/sorbetgirl/lilscoopsies", icon: <LilScoopsies />, description: "For the little ones" },
      { label: "Sassy Sorbet", path: "/sorbetgirl/sassysorbet", icon: <SassySorbet />, description: "Teen collection" },
    ],
    Gifts: [
      { label: "Gift under-₹2000", path: "/gifts/giftunder2000", icon: <GiftUnder2000Icon />, price: "₹999-1999" },
      { label: "Gift ₹2100-₹3500", path: "/gifts/gift2100to3500", icon: <Gift2100To3500Icon />, price: "₹2100-3500" },
      { label: "Gift ₹3600-₹5000", path: "/gifts/gift3600to5000", icon: <Gift3600To5000Icon />, price: "₹3600-5000" },
    ],
  };

  // Search suggestions
  const searchSuggestions = [
    "Earrings",
    "Necklace",
    "Summer",
    "Citrus",
  ];

  // Theme palette
  const themeColors = {
    light: {
      background: "#F8FAFC",
      text: "#0F172A",
      navBackground: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)",
      cardBackground: "#FFFFFF",
      border: "rgba(15, 23, 42, 0.1)",
      shadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    },
    dark: {
      background: "#0F172A",
      text: "#F8FAFC",
      navBackground: "linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)",
      cardBackground: "#1E293B",
      border: "rgba(248, 250, 252, 0.1)",
      shadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
  };

  const colors = {
    gradient: {
      primary: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
      secondary: "linear-gradient(135deg, #4ECDC4 0%, #6EFAF4 100%)",
      accent: "linear-gradient(135deg, #FFD166 0%, #FFE08E 100%)",
      purple: "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)",
      pink: "linear-gradient(135deg, #FF85A1 0%, #FFB6C1 100%)",
      blue: "linear-gradient(135deg, #6D9EEB 0%, #9BC2F0 100%)",
      rainbow: "linear-gradient(135deg, #FF6B6B, #FFD166, #06D6A0, #6D9EEB, #A78BFA)",
    },
  };

  const currentTheme = themeColors[theme] || themeColors.light;

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Update active indicator
  useEffect(() => {
    const updateActiveIndicator = () => {
      const activeLink = links.find(link => {
        if (link.path === "/") return location.pathname === "/";
        return location.pathname.startsWith(link.path);
      });

      if (activeLink) {
        const index = links.findIndex(link => link.label === activeLink.label);
        const linkElement = linksRef.current[index];
        if (linkElement) {
          const { offsetLeft, offsetWidth } = linkElement;
          setActiveIndicator({ left: offsetLeft, width: offsetWidth });
        }
      }
    };

    updateActiveIndicator();
    window.addEventListener("resize", updateActiveIndicator);
    return () => window.removeEventListener("resize", updateActiveIndicator);
  }, [location.pathname]);

  // Wishlist pulse effect
  useEffect(() => {
    if (wishlistCount > 0) {
      setWishlistPulse(true);
      const timer = setTimeout(() => setWishlistPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or / for command palette
      if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      // Escape to close everything
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setSearchOpen(false);
        setDrawerOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeDrawer();
      }
      if (commandPaletteOpen && commandPaletteRef.current && !commandPaletteRef.current.contains(e.target)) {
        setCommandPaletteOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen, commandPaletteOpen]);

  const openDropdown = (label) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const closeDropdown = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const isLinkActive = (linkItem) => {
    if (linkItem.path === "/") return location.pathname === "/";
    return location.pathname.startsWith(linkItem.path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
      setDrawerOpen(false);
      setCommandPaletteOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      onLogout();
      alert("Logged out successfully!");
    } else {
      navigate("/login");
    }
    setSettingsOpen(false);
    setDrawerOpen(false);
  };

  const toggleMobileAccordion = (label) => {
    setMobileAccordions(prev => ({ ...prev, [label]: !prev[label] }));
  };

  if (currentUser?.role === "admin") {
    return (
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "0.8rem 1rem",
          backdropFilter: "blur(10px)",
          background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.9)",
          color: theme === "light" ? "#0F172A" : "#F8FAFC",
          borderBottom: `1px solid ${currentTheme.border}`,
        }}
      >
        {!isLoggedIn ? (
          <Link
            to="/login"
            style={{
              padding: "0.55rem 0.9rem",
              background: "linear-gradient(90deg,#3B82F6,#6D9EEB)",
              color: "#fff",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Login
          </Link>
        ) : null}
      </nav>
    );
  }

  const css = `
    .lr-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1100;
      backdrop-filter: blur(18px);
      border-bottom: 1px solid ${currentTheme.border};
      background: ${currentTheme.navBackground};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(0);
    }
    
    .lr-navbar.scrolled {
      backdrop-filter: blur(25px);
      box-shadow: ${currentTheme.shadow};
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      background: ${theme === 'dark' 
        ? 'rgba(15, 23, 42, 0.95)' 
        : 'rgba(255, 255, 255, 0.95)'};
    }
    
    .lr-container {
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.9rem 1.2rem;
      gap: 1rem;
      box-sizing: border-box;
      transition: padding 0.3s ease;
    }
    
    .scrolled .lr-container {
      padding: 0.5rem 1.2rem;
    }
    
    .lr-logo {
      font-size: 1.6rem;
      font-weight: 900;
      background: ${colors.gradient.rainbow};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      background-size: 200% 100%;
      transition: background-position 0.5s ease;
    }
    
    .lr-logo:hover {
      background-position: 100% 50%;
    }
    
    .lr-links {
      display: flex;
      gap: 0.6rem;
      align-items: center;
      flex: 1;
      margin-left: 1rem;
      position: relative;
    }
    
    .lr-link {
      padding: 0.55rem 0.9rem;
      border-radius: 10px;
      font-weight: 700;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      white-space: nowrap;
      cursor: pointer;
      color: ${currentTheme.text};
      transition: all 0.18s ease;
      position: relative;
      background: transparent !important;
      border: none;
    }
    
    .lr-link.active {
      color: ${currentTheme.text};
      background: transparent !important;
      box-shadow: none;
    }
    
    .active-indicator {
      position: absolute;
      bottom: -2px;
      height: 3px;
      background: linear-gradient(90deg, #FF6B6B, #6D9EEB);
      border-radius: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 1;
    }
    
    .lr-dropdown {
      position: absolute;
      top: calc(100% + 5px);
      left: 50%;
      transform: translateX(-50%);
      min-width: 600px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      background: ${theme === 'dark' ? 'rgba(30,41,59,0.98)' : 'rgba(255,255,255,0.98)'};
      border: 1px solid ${currentTheme.border};
      z-index: 2200;
      animation: dropdownFade 0.25s ease;
      backdrop-filter: blur(20px);
    }
    
    .mega-menu {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;
    }
    
    .mega-column h4 {
      margin: 0 0 1rem 0;
      font-size: 1.1rem;
      color: ${currentTheme.text};
      opacity: 0.9;
    }
    
    .mega-items {
      display: grid;
      gap: 0.8rem;
    }
    
    .mega-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem;
      border-radius: 10px;
      text-decoration: none;
      color: ${currentTheme.text};
      transition: all 0.2s ease;
    }
    
    .mega-item:hover {
      background: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'};
      transform: translateX(5px);
    }
    
    .mega-featured {
      border-radius: 12px;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.2rem;
    }
    
    .lr-wishlist {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      background: transparent;
      border: none;
      color: ${currentTheme.text};
    }
    
    .wishlist-pulse {
      animation: pulse 0.5s ease-in-out;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    
    .lr-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 18px;
      height: 18px;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: 800;
      color: #fff;
      background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
    }
    
    .command-palette {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      width: 90%;
      max-width: 600px;
      max-height: 70vh;
      background: ${theme === 'dark' ? 'rgba(15,23,42,0.98)' : 'rgba(255,255,255,0.98)'};
      border-radius: 20px;
      box-shadow: 0 30px 80px rgba(0,0,0,0.3);
      z-index: 9999;
      overflow: hidden;
      border: 1px solid ${currentTheme.border};
      backdrop-filter: blur(30px);
      opacity: 0;
      animation: commandSlide 0.3s ease forwards;
    }
    
    @keyframes commandSlide {
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
    
    .command-input {
      width: 100%;
      padding: 1.5rem;
      font-size: 1.1rem;
      background: transparent;
      border: none;
      outline: none;
      color: ${currentTheme.text};
      border-bottom: 1px solid ${currentTheme.border};
    }
    
    .command-input::placeholder {
      color: ${theme === 'dark' ? '#94a3b8' : '#64748b'};
    }
    
    .command-suggestions {
      padding: 1rem;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .suggestion-item {
      padding: 0.8rem 1rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      cursor: pointer;
      color: ${currentTheme.text};
      transition: all 0.2s ease;
    }
    
    .suggestion-item:hover {
      background: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'};
    }
    
    .theme-toggle {
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    
    .theme-toggle:hover {
      transform: rotate(180deg) scale(1.1);
    }
    
    .bottom-sheet {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: ${currentTheme.cardBackground};
      border-radius: 20px 20px 0 0;
      z-index: 1400;
      transform: translateY(100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 -20px 60px rgba(0,0,0,0.2);
      max-height: 85vh;
      overflow-y: auto;
    }
    
    .bottom-sheet.open {
      transform: translateY(0);
    }
    
    .sheet-handle {
      width: 40px;
      height: 5px;
      background: ${theme === 'dark' ? '#475569' : '#cbd5e1'};
      border-radius: 3px;
      margin: 1rem auto;
    }
    
    @media (max-width: 900px) {
      .lr-links { display: none; }
      .lr-dropdown { min-width: 300px; left: 0; transform: none; }
      .mega-menu { grid-template-columns: 1fr; gap: 1rem; padding: 1rem; }
    }
  `;

  return (
    <>
      <style>{css}</style>

      {/* Command Palette Modal */}
      {commandPaletteOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'fadeIn 0.2s ease'
        }} onClick={() => setCommandPaletteOpen(false)}>
          <div className="command-palette" ref={commandPaletteRef} onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSearchSubmit}>
              <input
                ref={searchInputRef}
                className="command-input"
                type="text"
                placeholder="Search products, collections, gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
            <div className="command-suggestions">
              <div style={{ padding: '0 1rem 0.5rem', color: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>
                Suggestions
              </div>
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    handleSearchSubmit(new Event('submit'));
                  }}
                >
                  <SearchIcon size={18} />
                  {suggestion}
                  <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </div>
              ))}
            </div>
            <div style={{ padding: '1rem', borderTop: `1px solid ${currentTheme.border}`, fontSize: '0.8rem', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
              Press <kbd style={{ background: theme === 'dark' ? '#334155' : '#e2e8f0', padding: '2px 6px', borderRadius: 4 }}>Esc</kbd> to close
            </div>
          </div>
        </div>
      )}

      <nav className={`lr-navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef} aria-label="Main navigation">
        <div className="lr-container">
          {/* Left: Hamburger + Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="lr-hamburger"
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              onClick={toggleDrawer}
              title="Menu"
              style={{ border: "none", background: "transparent" }}
            >
              <span style={{ fontSize: 20 }}>{drawerOpen ? "✖️" : "☰"}</span>
            </button>

            <Link to="/" className="lr-logo" onClick={() => setDrawerOpen(false)}>
              <span style={{ fontSize: 20 }}><PremiumDiamondLogo className="w-20 h-20" /></span>
              <span style={{ letterSpacing: -0.5 }}>Lara</span>
            </Link>
          </div>

          {/* Center links with animated indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, position: 'relative' }}>
            <div className="lr-links" role="menubar">
              {links.map((linkItem, index) => {
                const active = isLinkActive(linkItem);
                return (
                  <div
                    key={linkItem.path}
                    style={{ position: "relative" }}
                    ref={el => linksRef.current[index] = el}
                    onMouseEnter={() => {
                      if (window.innerWidth > 900 && linkItem.dropdown) openDropdown(linkItem.label);
                    }}
                    onMouseLeave={() => {
                      if (window.innerWidth > 900 && linkItem.dropdown) closeDropdown();
                    }}
                  >
                    <Link
                      to={linkItem.path}
                      className={"lr-link" + (active ? " active" : "")}
                      onClick={() => setDrawerOpen(false)}
                      aria-haspopup={linkItem.dropdown ? "true" : "false"}
                      aria-expanded={activeDropdown === linkItem.label}
                    >
                      <span style={{ fontSize: 16 }}>{linkItem.icon}</span>
                      <span>{linkItem.label}</span>
                    </Link>

                    {/* Mega Menu Dropdown */}
                    {linkItem.dropdown && dropdownItems[linkItem.label] && activeDropdown === linkItem.label && (
                      <div className="lr-dropdown" role="menu" onMouseEnter={() => openDropdown(linkItem.label)} onMouseLeave={closeDropdown}>
                        <div className="mega-menu">
                          <div className="mega-column">
                            <h4>{linkItem.label} Collection</h4>
                            <div className="mega-items">
                              {dropdownItems[linkItem.label].map((d, i) => (
                                <Link
                                  key={i}
                                  to={d.path}
                                  className="mega-item"
                                  onClick={() => setActiveDropdown(null)}
                                  role="menuitem"
                                >
                                  <span style={{ fontSize: 18 }}>{d.icon}</span>
                                  <div>
                                    <div style={{ fontWeight: 700 }}>{d.label}</div>
                                    {d.description && <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{d.description}</div>}
                                    {d.price && <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#FF6B6B' }}>{d.price}</div>}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="mega-column">
                            <div className="mega-featured">
                              <div style={{ textAlign: 'center', padding: '1rem' }}>
                                Featured Collection
                                <div style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem' }}>
                                  Discover our premium selection
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {/* Animated Active Indicator */}
              <div 
                className="active-indicator" 
                style={{ 
                  left: activeIndicator.left, 
                  width: activeIndicator.width 
                }}
              />
            </div>
          </div>

          {/* Right Actions - SIMPLIFIED VERSION */}
          <div className="lr-actions" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Search Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                color: currentTheme.text,
                cursor: 'pointer',
              }}
              title="Search (Ctrl+K)"
            >
              <SearchIcon size={20} />
            </button>

            {/* Wishlist */}
            <button
              className={`lr-wishlist ${wishlistPulse ? 'wishlist-pulse' : ''}`}
              onClick={() => navigate('/wishlist')}
              title="Wishlist"
            >
              {wishlistCount > 0 ? <HeartFilledIcon /> : <HeartIcon />}
              {wishlistCount > 0 && <span className="lr-badge">{wishlistCount}</span>}
            </button>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              onClick={onThemeToggle}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                color: currentTheme.text,
                cursor: 'pointer',
              }}
              title="Toggle theme"
            >
              {theme === "dark" ? <DayThemeIcon /> : <NightThemeIcon />}
            </button>

            {/* Cart */}
            <button
              className="lr-cart"
              aria-label="Cart"
              onClick={() => navigate("/cart")}
              title="Cart"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: `1px solid ${currentTheme.border}`,
                color: currentTheme.text,
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <CartIcon />
              {cartCount > 0 && <span className="lr-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Sheet for Mobile */}
      <div className={`lr-drawer-backdrop ${drawerOpen ? "open" : ""}`} style={{ display: drawerOpen ? "block" : "none" }} onClick={closeDrawer} />

      <div className={`bottom-sheet ${drawerOpen ? "open" : ""}`} ref={drawerRef}>
        <div className="sheet-handle" />
        <div style={{ padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <PremiumDiamondLogo />
              <span style={{ fontSize: '1.2rem', fontWeight: 900, background: colors.gradient.rainbow, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Lara</span>
            </div>
            <button onClick={closeDrawer} style={{ background: 'transparent', border: 'none', color: currentTheme.text, fontSize: '1.2rem', cursor: 'pointer' }}>
              ✕
            </button>
          </div>

          {/* User Info (in mobile drawer only) */}
          {currentUser && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              padding: '1rem',
              background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
              borderRadius: 12,
              marginBottom: '1rem',
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
              }}>
                {currentUser?.name?.charAt(0) || <User size={20} />}
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{currentUser?.name || 'User'}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{currentUser?.email}</div>
              </div>
            </div>
          )}

          {/* Search in Mobile */}
          <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 3rem',
                  borderRadius: 12,
                  border: `1px solid ${currentTheme.border}`,
                  background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                  color: currentTheme.text,
                  fontSize: '1rem',
                }}
              />
              <SearchIcon size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
            </div>
          </form>

          {/* Mobile Navigation */}
          <nav style={{ display: 'grid', gap: '0.5rem' }}>
            {links.map((linkItem) => {
              const hasDropdown = !!dropdownItems[linkItem.label];
              return (
                <div key={linkItem.path}>
                  {!hasDropdown ? (
                    <Link
                      to={linkItem.path}
                      onClick={closeDrawer}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '1rem',
                        borderRadius: 12,
                        textDecoration: 'none',
                        color: currentTheme.text,
                        background: isLinkActive(linkItem) ? (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)') : 'transparent',
                      }}
                    >
                      {linkItem.icon}
                      <span style={{ fontWeight: 700 }}>{linkItem.label}</span>
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleMobileAccordion(linkItem.label)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '1rem',
                          background: 'transparent',
                          border: 'none',
                          color: currentTheme.text,
                          cursor: 'pointer',
                          borderRadius: 12,
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          {linkItem.icon}
                          <span style={{ fontWeight: 700 }}>{linkItem.label}</span>
                        </div>
                        <span style={{ transform: mobileAccordions[linkItem.label] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                          ▼
                        </span>
                      </button>
                      {mobileAccordions[linkItem.label] && (
                        <div style={{ paddingLeft: '2rem', paddingBottom: '1rem' }}>
                          {dropdownItems[linkItem.label].map((item, idx) => (
                            <Link
                              key={idx}
                              to={item.path}
                              onClick={closeDrawer}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.8rem',
                                padding: '0.8rem',
                                color: currentTheme.text,
                                textDecoration: 'none',
                                borderRadius: 8,
                              }}
                            >
                              {item.icon}
                              <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </nav>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${currentTheme.border}` }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button
                onClick={() => navigate('/wishlist')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: 12,
                  border: `1px solid ${currentTheme.border}`,
                  background: 'transparent',
                  color: currentTheme.text,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <HeartFilledIcon />
                Wishlist ({wishlistCount})
              </button>
              <button
                onClick={() => navigate('/cart')}
                style={{
                  flex: 1,
                  padding: '0.8rem',
                  borderRadius: 12,
                  border: `1px solid ${currentTheme.border}`,
                  background: 'transparent',
                  color: currentTheme.text,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                }}
              >
                <CartIcon />
                Cart ({cartCount})
              </button>
            </div>
            
            {/* User links in mobile only */}
            {isLoggedIn && (
              <>
                <Link
                  to="/my-orders"
                  onClick={closeDrawer}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '0.8rem 1rem',
                    borderRadius: 12,
                    border: `1px solid ${currentTheme.border}`,
                    background: 'transparent',
                    color: currentTheme.text,
                    textDecoration: 'none',
                    marginBottom: '0.5rem',
                  }}
                >
                  <Package size={18} />
                  My Orders
                </Link>
              </>
            )}
            
            <button
              onClick={handleAuthAction}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(90deg, #FF6B6B, #FF8E8E)',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              {isLoggedIn ? 'Logout' : 'Login / Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}