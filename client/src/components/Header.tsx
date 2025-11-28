import { Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import { useSettings } from "@/hooks/useSettings";
import DynamicLink from "@/components/DynamicLink";

interface NavLink {
  label: string;
  href: string;
}

/**
 * Header Component - Navigation and Theme Toggle
 * Mobile-first responsive design
 * All styling uses CSS variables - changes instantly with theme toggle
 * Fully responsive on mobile, tablet, and desktop
 */
export default function Header( ) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme, switchable } = useTheme();
  const settings = useSettings();
  
  const siteTitle = settings.siteTitle || "Portfolio";
  const logo = settings.logo || "/images/logo.png";
  const navLinks: NavLink[] = settings.navigation || [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderBottom: "1px solid var(--color-border)",
        transition: "all var(--transition-base)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="container">
        <nav
          style={{
	            display: "flex",
	            justifyContent: "space-between",
	            alignItems: "center",
	            padding: "var(--spacing-md) 0",
	            gap: "var(--spacing-md)",
	            /* Added to allow the menu to be centered */
	            position: "relative",
	          
          }}
        >
          {/* Logo and Site Title */}
	          {/* Logo - Rounded Circle with Border and Hover Effect */}
	          <DynamicLink href="/">
	            <div
	              style={{
	                display: "flex",
	                alignItems: "center",
	                gap: "var(--spacing-sm)",
	                cursor: "pointer",
	                textDecoration: "none",
	                minWidth: 0,
	              }}
	            >
	              {logo && (
	                <img
	                  src={logo}
	                  alt="Logo"
	                  style={{
	                    height: "40px", /* Slightly larger */
	                    width: "40px",
	                    borderRadius: "50%", /* Rounded circle */
	                    border: "2px solid var(--color-primary-light)", /* Light blue border */
	                    boxShadow: "var(--shadow-sm)",
	                    objectFit: "cover",
	                    transition: "all var(--transition-base)",
	                    flexShrink: 0,
	                  }}
	                  onMouseEnter={(e) => {
	                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
	                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px var(--color-primary-light)";
	                  }}
	                  onMouseLeave={(e) => {
	                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-light)";
	                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
	                  }}
	                />
	              )}
	              {/* Site Title is intentionally left commented out as per previous analysis/request */}
	            </div>
	          </DynamicLink>

	          {/* Desktop Navigation - Centered and Perfected */}
	          <div
	            style={{
	              display: "none",
	              gap: "clamp(24px, 4vw, 40px)", /* Increased separation */
	              alignItems: "center",
	              position: "absolute", /* Positioning for centering */
	              left: "50%",
	              transform: "translateX(-50%)",
	            }}
	            className="hidden md:flex"
	          >
	            {navLinks.map((link: NavLink) => (
	              <DynamicLink
	                key={link.href}
	                href={link.href}
	                variant="nav"
	                style={{
	                  fontWeight: "700", /* Bold heading */
	                  fontSize: "1rem",
	                  padding: "8px 12px", /* Added padding for button look */
	                  borderRadius: "var(--radius-md)", /* Rounded corners for button look */
	                  transition: "all var(--transition-fast)",
	                  border: "2px solid transparent", /* Initial transparent border */
	                }}
	                onMouseEnter={(e) => {
	                  (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
	                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-light)"; /* Light background on hover */
	                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)"; /* Border on hover */
	                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
	                }}
	                onMouseLeave={(e) => {
	                  (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
	                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
	                  (e.currentTarget as HTMLElement).style.borderColor = "transparent";
	                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
	                }}
	              >
	                {link.label}
	              </DynamicLink>
	            ))}
	          </div>

          {/* Right Side - Theme Toggle & Mobile Menu */}
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-sm)",
              alignItems: "center",
              marginLeft: "auto",
            }}
          >
	            {/* Theme Toggle Button - Rounded Circle with Border and Hover Effect */}
	            {switchable && (
	              <button
	                onClick={toggleTheme}
	                style={{
	                  background: "transparent",
	                  border: "2px solid var(--color-primary-light)", /* Light blue border */
	                  borderRadius: "50%", /* Rounded circle */
	                  height: "40px",
	                  width: "40px",
	                  padding: "0",
	                  cursor: "pointer",
	                  display: "flex",
	                  alignItems: "center",
	                  justifyContent: "center",
	                  color: "var(--color-text)",
	                  transition: "all var(--transition-base)",
	                  flexShrink: 0,
	                }}
	                onMouseEnter={(e) => {
	                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
	                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 4px var(--color-primary-light)";
	                }}
	                onMouseLeave={(e) => {
	                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary-light)";
	                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
	                }}
	                title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
	              >
	                {theme === "light" ? (
	                  <Moon size={18} style={{ color: "var(--color-primary)" }} />
	                ) : (
	                  <Sun size={18} style={{ color: "var(--color-accent)" }} />
	                )}
	              </button>
	            )}

            {/* Mobile Menu Button - Visible only on Mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                color: "var(--color-text)",
                padding: "8px",
                flexShrink: 0,
              }}
              className="md:hidden"
              title={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu - Visible only on Mobile */}
        {isMenuOpen && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--spacing-md)",
              paddingBottom: "var(--spacing-lg)",
              borderTop: "1px solid var(--color-border)",
              marginTop: "var(--spacing-md)",
              paddingTop: "var(--spacing-lg)",
              animation: "slideDown 300ms ease-out",
            }}
            className="md:hidden"
          >
            {navLinks.map((link: NavLink) => (
              <DynamicLink
                key={link.href}
                href={link.href}
                variant="nav"
                onClick={handleMenuClose}
              >
                <span style={{ fontSize: "1rem", fontWeight: "500" }}>
                  {link.label}
                </span>
              </DynamicLink>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md\\:flex {
            display: flex !important;
          }
          .md\\:hidden {
            display: none !important;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
