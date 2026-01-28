import { Heart, Instagram, Twitter, Facebook,  Shield, Truck, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Pinterest } from "./Icons";

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState(null);

  const footerMenu = {
    Shop: [
      { label: "Hoops", path: "/client/shop/hoops" },
      { label: "Earrings", path: "/client/shop/earrings" },
      { label: "Necklace", path: "/client/shop/necklace" },
      { label: "Bracelets", path: "/client/shop/bracelets" },
      { label: "Rings", path: "/client/shop/rings" },
    ],
    Flavours: [
      { label: "Citrus Chic", path: "/client/flavors/citruschic" },
      { label: "Berry Minimum", path: "/client/flavors/berryminimum" },
      { label: "Classic Vanilla", path: "/client/flavors/classicvanilla" },
      { label: "Luxurious Lime", path: "/client/flavors/luxuriouslime" },
      { label: "Sorbet Sensation", path: "/client/flavors/sorbetsensation" },
      { label: "Summer Fling Collection", path: "/client/flavors/summerfling" },
    ],
    "Sorbet Girl": [
      { label: "Lil Scoopsies", path: "/sorbetgirl/lilscoopsies" },
      { label: "Sassy Sorbet", path: "/sorbetgirl/sassysorbet" },
    ],
    Gifts: [
      { label: "Gift under-₹2000", path: "/gifts/giftunder2000" },
      { label: "Gift ₹2100-₹3500", path: "/gifts/gift2100to3500" },
      { label: "Gift ₹3600-₹5000", path: "/gifts/gift3600to5000" },
    ],
  };

  const trustBadges = [
    { icon: <Shield size={20} />, text: "Secure Payments" },
    { icon: <Truck size={20} />, text: "Free Delivery" },
    { icon: <RefreshCw size={20} />, text: "10-Day Returns" },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, name: "Instagram", url: "https://instagram.com/lara", color: "#E4405F" },
    { icon: <Facebook size={20} />, name: "Facebook", url: "https://facebook.com/lara", color: "#1877F2" },
    { icon: <Twitter size={20} />, name: "Twitter", url: "https://twitter.com/lara", color: "#1DA1F2" },
    { icon: <Pinterest size={20} />, name: "Pinterest", url: "https://pinterest.com/lara", color: "#BD081C" },
  ];

  const toggleAccordion = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        background: `
          linear-gradient(
            135deg, 
            rgba(248, 250, 252, 0.95) 0%, 
            rgba(241, 245, 249, 0.98) 100%
          ),
          radial-gradient(
            circle at 30% 20%,
            rgba(255, 107, 107, 0.05) 0%,
            transparent 50%
          ),
          radial-gradient(
            circle at 70% 80%,
            rgba(167, 139, 250, 0.05) 0%,
            transparent 50%
          )
        `,
        backdropFilter: "blur(12px)",
        paddingTop: "5rem",
        marginTop: "5rem",
        borderTop: "1px solid rgba(226, 232, 240, 0.6)",
        boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          background: "linear-gradient(135deg, #FF6B6B22, #A78BFA22)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "150px",
          height: "150px",
          background: "linear-gradient(135deg, #4ECDC422, #FBBF2422)",
          borderRadius: "50%",
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Brand Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "900",
              background: "linear-gradient(135deg,#FF6B6B,#A78BFA,#4ECDC4,#FBBF24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "300% 300%",
              animation: "gradientShift 8s ease infinite",
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            ✨ Lara
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              color: "#64748B",
              maxWidth: "500px",
              margin: "0 auto",
              fontSize: "1.1rem",
              lineHeight: "1.8",
              fontStyle: "italic",
            }}
          >
            Where elegance meets artistry — each piece meticulously crafted to 
            celebrate your unique shine and sophistication.
          </motion.p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: "rgba(255, 255, 255, 0.6)",
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(226, 232, 240, 0.8)",
                cursor: "default",
              }}
            >
              <div style={{ color: "#FF6B6B" }}>{badge.icon}</div>
              <span style={{ color: "#475569", fontWeight: "600" }}>
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Footer Grid */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Menu Columns */}
          {Object.keys(footerMenu).map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "1.5rem",
              }}
            >
              {/* Accordion Header */}
              <h3
                onClick={() => toggleAccordion(title)}
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  marginBottom: "1rem",
                  color: "#1e293b",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  letterSpacing: "0.1em",
                  padding: "0.5rem 0",
                }}
              >
                {title.toUpperCase()}
                <motion.span
                  animate={{ rotate: openAccordion === title ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: "1.8rem",
                    color: "#FF6B6B",
                    fontWeight: "300",
                  }}
                >
                  +
                </motion.span>
              </h3>

              {/* Menu Items */}
              <AnimatePresence>
                <motion.ul
                  initial={false}
                  animate={{
                    height: openAccordion === title ? "auto" : 0,
                    opacity: openAccordion === title ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{
                    listStyle: "none",
                    padding: 0,
                    overflow: "hidden",
                  }}
                >
                  {footerMenu[title].map((item, idx) => (
                    <motion.li
                      key={item.label}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{
                        x: openAccordion === title ? 0 : -10,
                        opacity: openAccordion === title ? 1 : 0,
                      }}
                      transition={{ delay: idx * 0.05 }}
                      style={{ marginBottom: "0.8rem" }}
                    >
                      <Link
                        to={item.path}
                        className="footer-link"
                        style={{
                          color: "#64748b",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          position: "relative",
                          display: "inline-block",
                          padding: "0.2rem 0",
                        }}
                      >
                        {item.label}
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "0%",
                            height: "1px",
                            background: "linear-gradient(90deg, #FF6B6B, #A78BFA)",
                            transition: "width 0.3s ease",
                          }}
                          className="link-underline"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: "24px",
              padding: "2rem",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                marginBottom: "1.5rem",
                color: "#1e293b",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              JOIN OUR COMMUNITY
            </h3>

            <p
              style={{
                color: "#64748b",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              Follow us for styling inspiration, behind-the-scenes looks, 
              and exclusive content from our artisan community.
            </p>

            <div style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "16px",
                    border: `1px solid ${social.color}20`,
                    textDecoration: "none",
                    color: "#475569",
                    fontWeight: "500",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${social.color}10`;
                    e.currentTarget.style.borderColor = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.borderColor = `${social.color}20`;
                  }}
                >
                  <div style={{ color: social.color }}>
                    {social.icon}
                  </div>
                  <span>{social.name}</span>
                  <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#94A3B8" }}>
                    @lara
                  </span>
                </motion.a>
              ))}
            </div>

            <div
              style={{
                padding: "1.5rem",
                background: "linear-gradient(135deg, #FF6B6B10, #A78BFA10)",
                borderRadius: "16px",
                textAlign: "center",
                border: "1px solid rgba(226, 232, 240, 0.6)",
              }}
            >
              <p
                style={{
                  color: "#475569",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                #LaraJewelry
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                }}
              >
                Tag us in your photos for a chance to be featured!
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            borderTop: "1px solid rgba(226, 232, 240, 0.8)",
            padding: "2.5rem 0",
            textAlign: "center",
            color: "#94a3b8",
            fontSize: "0.95rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#1e293b",
              fontWeight: "600",
            }}
          >
            <Heart size={16} style={{ color: "#FF6B6B" }} />
            <span>
              Designed with love • Crafted with precision in India
            </span>
            <Heart size={16} style={{ color: "#FF6B6B" }} />
          </motion.div>
          
          <div
            style={{
              display: "flex",
              gap: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link
              to="/privacy"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Contact Us
            </Link>
            <Link
              to="/wholesale"
              style={{
                color: "#64748b",
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Wholesale Inquiries
            </Link>
          </div>
          
          <div>
            © 2025 Lara & Co. All rights reserved.
          </div>
        </motion.div>
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .footer-link:hover .link-underline {
          width: 100%;
        }
        
        .footer-link:hover {
          color: #1e293b;
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          
          h1 {
            font-size: 3rem !important;
          }
        }
      `}</style>
    </motion.footer>
  );
}