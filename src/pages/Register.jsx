import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, UserPlus, Eye, EyeOff, Check, X, Sparkles } from 'lucide-react';

const Register = ({ theme = "light" }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Theme configuration
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

    // Gradient colors
    const GRADIENTS = {
        primary: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        secondary: "linear-gradient(135deg, #4ECDC4 0%, #2DD4BF 100%)",
        success: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
        purple: "linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)",
        rainbow: "linear-gradient(135deg, #FF6B6B, #FFD166, #06D6A0, #6D9EEB, #A78BFA)",
    };

    const currentTheme = THEME_CONFIG[theme] || THEME_CONFIG.light;
    const isDark = theme === "dark";

    // Check password strength
    useEffect(() => {
        const checkStrength = (password) => {
            let strength = 0;
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            setPasswordStrength(strength);
        };

        checkStrength(formData.password);
    }, [formData.password]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const validateForm = () => {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return "Please enter a valid email address";
        }

        // Password validation
        if (formData.password.length < 6) {
            return "Password must be at least 6 characters";
        }

        // Name validation
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            return "Please enter your full name";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://ecommerce-backend-s1l7.onrender.com/api/client/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Success animation and navigation
                setStep(3);
                setTimeout(() => {
                    alert('🎉 Registration successful! You can now login.');
                    navigate('/login');
                }, 1500);
            } else {
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Password strength indicators
    const getStrengthColor = () => {
        if (passwordStrength >= 75) return "#10B981";
        if (passwordStrength >= 50) return "#F59E0B";
        if (passwordStrength >= 25) return "#EF4444";
        return "#6B7280";
    };

    const getStrengthText = () => {
        if (passwordStrength >= 75) return "Strong";
        if (passwordStrength >= 50) return "Medium";
        if (passwordStrength >= 25) return "Weak";
        return "Very Weak";
    };

    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: currentTheme.background,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            paddingTop: '4rem',
        },
        card: {
            background: currentTheme.cardBackground,
            padding: '2rem',
            borderRadius: '24px',
            boxShadow: currentTheme.shadow,
            border: `1px solid ${currentTheme.border}`,
            backdropFilter: 'blur(10px)',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: '900',
            background: GRADIENTS.rainbow,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
        },
        subtitle: {
            color: currentTheme.text,
            opacity: 0.8,
            marginBottom: '2rem',
            fontSize: '1rem',
        },
        stepIndicator: {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
        },
        stepDot: {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: isDark ? '#334155' : '#e2e8f0',
            transition: 'all 0.3s ease',
        },
        activeStepDot: {
            background: GRADIENTS.secondary,
            transform: 'scale(1.2)',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        },
        inputRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            textAlign: 'left',
        },
        label: {
            color: currentTheme.text,
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
        inputContainer: {
            position: 'relative',
            width: '100%',
        },
        input: {
            width: '100%',
            padding: '1rem 1.2rem',
            border: `2px solid ${currentTheme.border}`,
            borderRadius: '14px',
            background: currentTheme.inputBackground,
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'all 0.3s ease',
            color: currentTheme.text,
        },
        inputIcon: {
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: currentTheme.text,
            opacity: 0.5,
        },
        eyeIcon: {
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: currentTheme.text,
            opacity: 0.7,
            cursor: 'pointer',
            background: 'transparent',
            border: 'none',
            padding: '0.25rem',
        },
        passwordStrength: {
            marginTop: '0.5rem',
        },
        strengthBar: {
            height: '4px',
            background: isDark ? '#334155' : '#e2e8f0',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '0.25rem',
        },
        strengthFill: {
            height: '100%',
            width: `${passwordStrength}%`,
            background: getStrengthColor(),
            transition: 'width 0.3s ease',
        },
        strengthText: {
            fontSize: '0.8rem',
            color: getStrengthColor(),
            fontWeight: '600',
            textAlign: 'right',
        },
        requirements: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            marginTop: '0.5rem',
        },
        requirement: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.8rem',
            color: currentTheme.text,
            opacity: 0.7,
        },
        checkIcon: {
            color: '#10B981',
        },
        xIcon: {
            color: '#EF4444',
        },
        submitButton: {
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '16px',
            border: 'none',
            background: loading ? '#ccc' : GRADIENTS.secondary,
            color: 'white',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            position: 'relative',
            overflow: 'hidden',
        },
        buttonShine: {
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'rotate(45deg)',
        },
        loadingSpinner: {
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
        },
        errorMessage: {
            color: '#FF6B6B',
            backgroundColor: 'rgba(255, 107, 107, 0.12)',
            padding: '0.8rem 1rem',
            borderRadius: '12px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            border: '1px solid rgba(255,107,107,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
        },
        loginSection: {
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: `1px solid ${currentTheme.border}`,
            color: currentTheme.text,
            opacity: 0.8,
            fontSize: '0.9rem',
        },
        loginLink: {
            color: '#4ECDC4',
            fontWeight: '700',
            marginLeft: '0.5rem',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
        },
        successAnimation: {
            fontSize: '4rem',
            marginBottom: '1rem',
        },
        successText: {
            fontSize: '1.2rem',
            color: currentTheme.text,
            marginBottom: '1rem',
        },
    };

    // Add CSS animations
    useEffect(() => {
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
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Password requirements check
    const passwordRequirements = [
        { text: "At least 8 characters", met: formData.password.length >= 8 },
        { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
        { text: "Contains number", met: /[0-9]/.test(formData.password) },
        { text: "Contains special character", met: /[^A-Za-z0-9]/.test(formData.password) },
    ];

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
                {step === 3 ? (
                    // Success Screen
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{ duration: 1 }}
                            style={styles.successAnimation}
                        >
                            🎉
                        </motion.div>
                        <h2 style={styles.successText}>
                            Account Created Successfully!
                        </h2>
                        <p style={{ opacity: 0.7, marginBottom: '2rem' }}>
                            Redirecting to login page...
                        </p>
                        <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <div style={{
                                width: '60px',
                                height: '4px',
                                background: GRADIENTS.secondary,
                                borderRadius: '2px',
                                margin: '0 auto',
                            }} />
                        </motion.div>
                    </motion.div>
                ) : (
                    // Registration Form
                    <>
                        <motion.h1
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            style={styles.title}
                        >
                            <UserPlus /> Join Us!
                        </motion.h1>

                        <p style={styles.subtitle}>
                            Create your account to start shopping
                        </p>

                        {/* Step Indicator */}
                        <div style={styles.stepIndicator}>
                            {[1, 2, 3].map((stepNum) => (
                                <div
                                    key={stepNum}
                                    style={{
                                        ...styles.stepDot,
                                        ...(stepNum <= step ? styles.activeStepDot : {})
                                    }}
                                />
                            ))}
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={styles.errorMessage}
                                >
                                    ⚠️ {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form style={styles.form} onSubmit={handleSubmit}>
                            {/* Name Inputs */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <div style={styles.inputRow}>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>
                                            <User size={16} /> First Name
                                        </label>
                                        <div style={styles.inputContainer}>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                style={styles.input}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>

                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>
                                            <User size={16} /> Last Name
                                        </label>
                                        <div style={styles.inputContainer}>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                style={styles.input}
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Email Input */}
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
                                        name="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        disabled={loading}
                                    />
                                </div>
                            </motion.div>

                            {/* Password Input */}
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
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={styles.input}
                                        disabled={loading}
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        style={styles.eyeIcon}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Password Strength */}
                                {formData.password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        style={styles.passwordStrength}
                                    >
                                        <div style={styles.strengthBar}>
                                            <div style={styles.strengthFill} />
                                        </div>
                                        <div style={styles.strengthText}>
                                            Strength: {getStrengthText()}
                                        </div>

                                        {/* Requirements */}
                                        <div style={styles.requirements}>
                                            {passwordRequirements.map((req, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    style={styles.requirement}
                                                >
                                                    {req.met ? (
                                                        <Check size={12} style={styles.checkIcon} />
                                                    ) : (
                                                        <X size={12} style={styles.xIcon} />
                                                    )}
                                                    <span style={{
                                                        opacity: req.met ? 1 : 0.6,
                                                        textDecoration: req.met ? 'none' : 'line-through'
                                                    }}>
                                                        {req.text}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.button
                                    type="submit"
                                    style={styles.submitButton}
                                    whileHover={{ scale: loading ? 1 : 1.05 }}
                                    whileTap={{ scale: loading ? 1 : 0.95 }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div style={styles.loadingSpinner}></div>
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} />
                                            Create Account
                                            <div style={{
                                                ...styles.buttonShine,
                                                animation: "shine 1.5s infinite"
                                            }}></div>
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </form>

                        {/* Login Link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={styles.loginSection}
                        >
                            <span>Already have an account?</span>
                            <Link
                                to="/login"
                                style={styles.loginLink}
                                onMouseEnter={(e) => e.target.style.transform = 'translateX(3px)'}
                                onMouseLeave={(e) => e.target.style.transform = 'translateX(0)'}
                            >
                                Sign In
                            </Link>
                        </motion.div>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Register;