import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/navbar-logo.png";
import {
  FaHome,
  FaBook,
  FaShoppingCart,
  FaPoll,
  FaDiscord,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { BsPersonFillGear } from "react-icons/bs";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItemVariants = {
    hover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" },
  };

  const menuVariants = {
    hidden: { right: "-70%" },
    visible: { right: "0%" },
    exit: { right: "-70%" },
  };

  const getLinkStyle = (to) => ({
    ...styles.navLink,
    textDecoration: to === currentPath ? "line-through" : "none",
    color: to === currentPath ? "lightblue" : "#ffffff",
  });

  const getMobileLinkStyle = (to) => ({
    ...styles.mobileNavLink,
    textDecoration: to === currentPath ? "line-through" : "none",
    color: to === currentPath ? "lightblue" : "#ffffff",    
  });

  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/rules", icon: <FaBook />, label: "Rules" },
    { to: "/staff", icon: <BsPersonFillGear />, label: "Staff" },
    {
      to: "/notfound",
      icon: <FaShoppingCart />,
      label: "Store",
      extra: <sup style={styles.comingSoon}>Coming Soon</sup>,
    },
    { to: "/vote", icon: <FaPoll />, label: "Vote" },
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <img src={logo} alt="Logo" style={{ height: "120px" }} />
      </div>

      {!isMobile && (
        <div style={styles.navCenter}>
          {navItems.map(({ to, icon, label, extra }, index) => (
            <motion.div key={index} variants={navItemVariants} whileHover="hover">
              {to === "#" ? (
                <a href="#" style={styles.navLink}>
                  {icon} {label} {extra}
                </a>
              ) : (
                <Link to={to} style={getLinkStyle(to)}>
                  {icon} {label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {!isMobile && (
        <div style={{ marginLeft: "auto" }}>
          <motion.div variants={navItemVariants} whileHover="hover">
            <a
              href="https://discord.visantara.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.discordButton}
            >
              <FaDiscord style={styles.icon} /> Discord
            </a>
          </motion.div>
        </div>
      )}

      {isMobile && (
        <button style={styles.menuButton} onClick={toggleMenu}>
          <FaBars />
        </button>
      )}

      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.div
            key="mobileMenu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            style={styles.mobileMenu}
          >
            <button style={styles.closeButton} onClick={toggleMenu}>
              <FaTimes />
            </button>
            {navItems.map(({ to, icon, label, extra }, index) => (
              <motion.div key={index} variants={navItemVariants} whileHover="hover">
                {to === "#" ? (
                  <a href="#" style={styles.mobileNavLink} onClick={toggleMenu}>
                    {icon} {label} {extra}
                  </a>
                ) : (
                  <Link
                    to={to}
                    style={getMobileLinkStyle(to)}
                    onClick={toggleMenu}
                  >
                    {icon} {label}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.div variants={navItemVariants} whileHover="hover">
              <a
                href="https://discord.visantara.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.mobileDiscordButton}
                onClick={toggleMenu}
              >
                <FaDiscord style={styles.icon} /> Discord
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "transparent",
    zIndex: 1000,
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    height: "60px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    zIndex: 1001,
  },
  navCenter: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "4px",
    transition: "background 0.3s ease",
  },
  discordButton: {
    backgroundColor: "#5865F2",
    marginLeft: "auto",
    padding: "8px 12px",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  menuButton: {
    marginLeft: "auto",
    fontSize: "24px",
    color: "#ffffff",
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 1001,
  },
  mobileMenu: {
    position: "fixed",
    top: 0,
    width: "70%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    flexDirection: "column",
    paddingTop: "60px",
    transition: "right 0.3s ease-in-out",
    zIndex: 9999,
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "20px",
    fontSize: "30px",
    color: "#ffffff",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  mobileNavLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "15px 20px",
    borderBottom: "1px solid #444",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  mobileDiscordButton: {
    backgroundColor: "#5865F2",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "15px 20px",
    textAlign: "left",
    textDecoration: "none",
    borderBottom: "1px solid #444",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  icon: {
    fontSize: "18px",
  },
  comingSoon: {
    fontSize: "10px",
    color: "#ffcc00",
    marginLeft: "4px",
  },
};

export default Navbar;
