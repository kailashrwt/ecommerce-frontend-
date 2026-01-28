import React, { useState, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoginIcon, PremiumDiamondLogo } from '../components/Icons';
import { LogIn, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const THEME_CONFIG = {
  light: {
    background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
    cardBackground: "#FFFFFF",
    text: "#0F172A",
    border: "rgba(15, 23, 42, 0.1)",
    inputBackground: "rgba(255, 255, 255, 0.9)",
    shadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
  },
  dark: {
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
    cardBackground: "#1E293B",
    text: "#F8FAFC",
    border: "rgba(248, 250, 252, 0.1)",
    inputBackground: "rgba(30, 41, 59, 0.8)",
    shadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  }
};

const COLORS = {
  gradients: {
    primary: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
    secondary: "linear-gradient(135deg, #4ECDC4 0%, #6EFAF4 100%)",
    rainbow: "linear-gradient(135deg, #FF6B6B, #FFD166, #06D6A0, #6D9EEB, #A78BFA)",
    purple: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
    blue: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
  }
};

const API_URL = "https://ecommerce-backend-s1l7.onrender.com/api/auth/login";

const Login = ({ theme = "light", onLogin = null, onLogout = null, isLoggedIn = false, currentUser = null }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const currentTheme = useMemo(() => THEME_CONFIG[theme] || THEME_CONFIG.light, [theme]);

  const styles = useMemo(() => {
    const mobile = window.innerWidth <= 768;
    const smallMobile = window.innerWidth <= 480;

    return {
      container: {
        minHeight: "100vh",
        background: currentTheme.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: smallMobile ? "1rem" : mobile ? "1.5rem" : "2rem",
      },
      card: {
        background: currentTheme.cardBackground,
        padding: smallMobile ? "1.5rem" : mobile ? "2rem" : "3rem",
        borderRadius: "24px",
        width: smallMobile ? "100%" : mobile ? "90%" : "450px",
        maxWidth: "450px",
        boxShadow: currentTheme.shadow,
        border: `1px solid ${currentTheme.border}`,
        textAlign: "center",
        backdropFilter: "blur(10px)",
      },
      title: {
        fontSize: smallMobile ? "1.75rem" : mobile ? "2rem" : "2.5rem",
        fontWeight: "900",
        background: COLORS.gradients.rainbow,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      },
      subtitle: {
        opacity: 0.8,
        color: currentTheme.text,
        marginBottom: mobile ? "1.5rem" : "2rem",
        fontSize: smallMobile ? "0.85rem" : "0.95rem",
        lineHeight: "1.5",
      },
      error: {
        color: "#FF6B6B",
        backgroundColor: "rgba(255, 107, 107, 0.12)",
        padding: "0.8rem 1rem",
        borderRadius: "12px",
        border: "1px solid rgba(255,107,107,0.3)",
        marginBottom: "1rem",
        fontSize: smallMobile ? "0.8rem" : "0.9rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        justifyContent: "center",
      },
      form: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      },
      inputGroup: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      },
      label: {
        fontWeight: "600",
        fontSize: "0.9rem",
        color: currentTheme.text,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      },
      inputContainer: {
        position: "relative",
        width: "100%",
      },
      input: {
        width: "100%",
        padding: smallMobile ? "0.8rem 2.5rem 0.8rem 1rem" : "1rem 3rem 1rem 1.2rem",
        borderRadius: "14px",
        border: `2px solid ${currentTheme.border}`,
        background: currentTheme.inputBackground,
        fontSize: "0.95rem",
        outline: "none",
        color: currentTheme.text,
        transition: "all 0.3s ease",
      },
      inputIcon: {
        position: "absolute",
        left: smallMobile ? "0.75rem" : "1rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: currentTheme.text,
        opacity: 0.5,
      },
      eyeIcon: {
        position: "absolute",
        right: smallMobile ? "0.75rem" : "1rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: currentTheme.text,
        opacity: 0.7,
        cursor: "pointer",
        background: "transparent",
        border: "none",
        padding: "0.25rem",
      },
      loginButton: {
        marginTop: "0.5rem",
        padding: smallMobile ? "0.9rem" : "1rem",
        borderRadius: "16px",
        border: "none",
        background: COLORS.gradients.primary,
        color: "white",
        fontSize: smallMobile ? "0.95rem" : "1rem",
        fontWeight: "700",
        cursor: "pointer",
        transition: "all 0.3s ease",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        position: "relative",
        overflow: "hidden",
      },
      buttonShine: {
        position: "absolute",
        top: "-50%",
        left: "-50%",
        width: "200%",
        height: "200%",
        background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
        transform: "rotate(45deg)",
      },
      registerSection: {
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: `1px solid ${currentTheme.border}`,
        fontSize: smallMobile ? "0.85rem" : "0.9rem",
        opacity: 0.85,
        color: currentTheme.text,
      },
      registerLink: {
        color: "#4ECDC4",
        fontWeight: "700",
        marginLeft: "0.5rem",
        textDecoration: "none",
        transition: "all 0.3s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
      },
      loadingSpinner: {
        width: "20px",
        height: "20px",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "white",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      },
      orDivider: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1.5rem 0",
        color: currentTheme.text,
        opacity: 0.6,
        fontSize: "0.9rem",
      },
      line: {
        flex: 1,
        height: "1px",
        background: currentTheme.border,
      },
    };
  }, [currentTheme, theme]);

  const handleInputChange = useCallback((field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (error) setError("");
  }, [error]);

  const handleLoginSuccess = useCallback((token, user) => {
    if (typeof onLogin === "function") {
      onLogin(token, user);
    } else {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [onLogin]);

  const handleLogout = useCallback(() => {
    if (typeof onLogout === "function") {
      onLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
  }, [onLogout]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resText = await res.text();

      if (!res.ok) {
        throw new Error(JSON.parse(resText).message || "Login failed");
      }

      const data = JSON.parse(resText);
      handleLoginSuccess(data.token, data.user);

      // Success animation before navigation
      setTimeout(() => {
        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }, 500);

    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Add CSS for spinner animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes shine {
        0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  if (isLoggedIn && currentUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={styles.container}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={styles.card}
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            style={styles.title}
          >
            <PremiumDiamondLogo className='w-8 h-8' /> Welcome!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={styles.subtitle}
          >
            Hello, <span style={{ color: '#4ECDC4', fontWeight: 'bold' }}>{currentUser.email}</span>
          </motion.p>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={styles.loginButton}
              onClick={() => navigate("/")}
            >
              🏠 Go to Home
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...styles.loginButton,
                background: COLORS.gradients.purple,
              }}
              onClick={() => navigate("/shop")}
            >
              🛍️ Continue Shopping
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...styles.loginButton,
                background: isDark ? '#334155' : '#e2e8f0',
                color: currentTheme.text,
              }}
              onClick={handleLogout}
            >
              👋 Logout
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={styles.container}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={styles.card}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          style={styles.title}
        >
          <PremiumDiamondLogo className='w-8 h-8' /> Welcome Back!
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={styles.subtitle}
        >
          Sign in to access your account and continue shopping
        </motion.p>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={styles.error}
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form style={styles.form} onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={styles.inputGroup}
          >
            <label style={styles.label}>
              <Mail size={16} /> Email Address
            </label>
            <div style={styles.inputContainer}>
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                placeholder="Enter your email"
                style={styles.input}
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={styles.inputGroup}
          >
            <label style={styles.label}>
              <Lock size={16} /> Password
            </label>
            <div style={styles.inputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange("password")}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={styles.eyeIcon}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              type="submit"
              style={styles.loginButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div style={styles.loadingSpinner}></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login to Account
                  <div style={{
                    ...styles.buttonShine,
                    animation: "shine 1.5s infinite"
                  }}></div>
                </>
              )}
            </motion.button>
          </motion.div>
        </form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={styles.orDivider}
        >
          <div style={styles.line}></div>
          <span>New to our store?</span>
          <div style={styles.line}></div>
        </motion.div>

        {/* Register Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={styles.registerSection}
        >
          Don't have an account?
          <Link
            to="/register"
            style={styles.registerLink}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Create Account →
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;