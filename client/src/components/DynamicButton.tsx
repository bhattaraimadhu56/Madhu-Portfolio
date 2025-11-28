import React from "react";

interface DynamicButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * DynamicButton Component
 * Fully responsive button using CSS variables - no hardcoding
 * All styling controlled through CSS variables that change with theme
 * Supports multiple variants and sizes
 */
export default function DynamicButton({
  label,
  onClick,
  href,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled = false,
  fullWidth = false,
  className = "",
  children,
}: DynamicButtonProps) {
  // Button size configurations
  const sizeConfig = {
    sm: { padding: "8px 16px", fontSize: "0.875rem" },
    md: { padding: "12px 24px", fontSize: "1rem" },
    lg: { padding: "16px 32px", fontSize: "1.125rem" },
  };

  // Variant styling using CSS variables
  const variantStyles = {
    primary: {
      backgroundColor: "var(--color-primary)",
      color: "white",
      border: "2px solid var(--color-primary)",
      hoverBg: "var(--color-primary-dark)",
      hoverBorder: "var(--color-primary-dark)",
    },
    secondary: {
      backgroundColor: "var(--color-secondary)",
      color: "white",
      border: "2px solid var(--color-secondary)",
      hoverBg: "var(--color-secondary-dark)",
      hoverBorder: "var(--color-secondary-dark)",
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-primary)",
      border: "2px solid var(--color-primary)",
      hoverBg: "var(--color-primary-light)",
      hoverBorder: "var(--color-primary)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-text)",
      border: "2px solid transparent",
      hoverBg: "var(--color-bg-secondary)",
      hoverBorder: "transparent",
    },
  };

  const style = variantStyles[variant];
  const sizeStyle = sizeConfig[size];

  const baseButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: fullWidth ? "100%" : "auto",
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: "600",
    fontFamily: "inherit",
    backgroundColor: style.backgroundColor,
    color: style.color,
    border: style.border,
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all var(--transition-fast)",
    opacity: disabled ? 0.6 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      (e.currentTarget as HTMLElement).style.backgroundColor = style.hoverBg;
      (e.currentTarget as HTMLElement).style.borderColor = style.hoverBorder;
      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.backgroundColor = style.backgroundColor;
    (e.currentTarget as HTMLElement).style.borderColor = style.border.split(" ")[2];
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
  };

  const buttonContent = (
    <>
      {icon && iconPosition === "left" && <span>{icon}</span>}
      <span>{children || label}</span>
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </>
  );

  // If href is provided, render as link
  if (href) {
    return (
      <a
        href={href}
        style={baseButtonStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {buttonContent}
      </a>
    );
  }

  // Otherwise render as button
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={baseButtonStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {buttonContent}
    </button>
  );
}
