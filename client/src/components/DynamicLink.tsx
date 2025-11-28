import React from "react";
import { Link as WouterLink } from "wouter";

interface DynamicLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "nav" | "footer";
  className?: string;
  onClick?: () => void;
}

/**
 * DynamicLink Component
 * Wraps Wouter Link with auto-scroll-to-top functionality
 * Automatically scrolls page to top when navigating to new route
 * All styling uses CSS variables - fully dynamic
 */
export default function DynamicLink({
  href,
  children,
  variant = "default",
  className = "",
  onClick,
}: DynamicLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }
    
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Variant styles using CSS variables
  const variantStyles = {
    default: {
      color: "var(--color-text)",
      textDecoration: "none",
      transition: "color var(--transition-fast)",
    },
    nav: {
      color: "var(--color-text-secondary)",
      textDecoration: "none",
      fontWeight: "500",
      transition: "color var(--transition-fast)",
      cursor: "pointer",
    },
    footer: {
      color: "var(--color-text-secondary)",
      textDecoration: "none",
      fontSize: "0.95rem",
      transition: "color var(--transition-fast)",
      cursor: "pointer",
    },
  };

  const style = variantStyles[variant];

  return (
    <WouterLink href={href} asChild onClick={handleClick}>
      <a
        style={style}
        className={className}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
        }}
        onMouseLeave={(e) => {
          if (variant === "default") {
            (e.currentTarget as HTMLElement).style.color = "var(--color-text)";
          } else {
            (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
          }
        }}
      >
        {children}
      </a>
    </WouterLink>
  );
}
