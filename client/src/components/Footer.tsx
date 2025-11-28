import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import DynamicLink from "@/components/DynamicLink";

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

interface QuickLink {
  label: string;
  href: string;
}

/**
 * Footer Component
 * Mobile-first responsive design
 * All styling uses CSS variables - changes instantly with theme toggle
 * All links use DynamicLink for auto-scroll-to-top functionality
 */
export default function Footer() {
  const settings = useSettings();
  const footerConfig = settings.footer || {};
  const profileConfig = settings.profile || {};

  const description = footerConfig.description || ""; 
  const location = footerConfig.location || "New Zealand";
  const email = footerConfig.email || "madhu.datainsights@gmail.com";
  const socialLinks: SocialLink[] = footerConfig.socialLinks || [];
  const quickLinks: QuickLink[] = footerConfig.quickLinks || [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];
  const fullName = profileConfig.fullName || "Name";
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "github":
        return <Github size={20} />;
      case "linkedin":
        return <Linkedin size={20} />;
      case "twitter":
        return <Twitter size={20} />;
      case "mail":
        return <Mail size={20} />;
      default:
        return <Mail size={20} />;
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        color: "var(--color-text)",
        transition: "all var(--transition-base)",
      }}
    >
      <div className="container">
        {/* Main Footer Content - Mobile First */}
	        <div
	          style={{
	            display: "grid",
	            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", /* More systematic grid */
	            gap: "clamp(32px, 6vw, 64px)", /* Increased gap for separation */
	            padding: "clamp(40px, 8vw, 60px) 0",
	          }}
	        >
	          {/* About Section - More Professional */}
	          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
	            <h3
	              style={{
	                fontSize: "clamp(1.2rem, 3vw, 1.5rem)", /* Larger, bolder heading */
	                fontWeight: "800",
	                color: "var(--color-primary)", /* Highlighted name */
	                fontFamily: "'Space Grotesk', sans-serif",
	                borderBottom: "2px solid var(--color-primary-light)",
	                paddingBottom: "8px",
	                marginBottom: "8px",
	              }}
	            >
	              {fullName}
	            </h3>
	            <p
	              style={{
	                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
	                color: "var(--color-text-secondary)",
	                lineHeight: "1.6",
	              }}
	            >
	              {description || "Data Analyst specializing in business intelligence, predictive analytics, and data visualization."}
	            </p>
	            <div
	              style={{
	                display: "flex",
	                alignItems: "center",
	                gap: "8px",
	                fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
	                color: "var(--color-text-secondary)",
	                marginTop: "8px",
	              }}
	            >
	              <MapPin size={18} style={{ flexShrink: 0, color: "var(--color-accent)" }} />
	              <span>{location}</span>
	            </div>
	          </div>

          {/* Quick Links Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3
              style={{
                fontSize: "clamp(1rem, 3vw, 1.125rem)",
                fontWeight: "700",
                color: "var(--color-text)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Quick Links
            </h3>
	            <ul
	              style={{
	                display: "flex",
	                flexDirection: "column",
	                gap: "clamp(8px, 2vw, 12px)",
	                listStyle: "none",
	                padding: 0,
	                margin: 0,
	              }}
	            >
	              {quickLinks.map((link: QuickLink) => (
	                <li key={link.href}>
	                  <DynamicLink
	                    href={link.href}
	                    variant="footer"
	                    style={{
	                      transition: "all var(--transition-fast)",
	                      paddingLeft: "0",
	                      borderLeft: "2px solid transparent",
	                    }}
	                    onMouseEnter={(e) => {
	                      (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
	                      (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
	                      (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--color-primary)";
	                    }}
	                    onMouseLeave={(e) => {
	                      (e.currentTarget as HTMLElement).style.color = "var(--color-text-secondary)";
	                      (e.currentTarget as HTMLElement).style.paddingLeft = "0";
	                      (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
	                    }}
	                  >
	                    {link.label}
	                  </DynamicLink>
	                </li>
	              ))}
	            </ul>
          </div>

          {/* Social Links Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3
              style={{
                fontSize: "clamp(1rem, 3vw, 1.125rem)",
                fontWeight: "700",
                color: "var(--color-text)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Connect
            </h3>
            <div
              style={{
                display: "flex",
                gap: "clamp(12px, 3vw, 16px)",
                flexWrap: "wrap",
              }}
            >
              {socialLinks.map((social: SocialLink, index: number) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
	                    width: "44px", /* Slightly larger */
	                    height: "44px",
	                    borderRadius: "50%", /* Circular social icons */
	                    backgroundColor: "var(--color-bg)",
	                    color: "var(--color-primary)",
	                    border: "2px solid var(--color-border)",
	                    boxShadow: "var(--shadow-sm)",
	                    transition: "all var(--transition-fast)",
	                    cursor: "pointer",
	                    textDecoration: "none",
	                  }}
	                  onMouseEnter={(e) => {
	                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
	                    (e.currentTarget as HTMLElement).style.color = "white";
	                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
	                    (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
	                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
	                  }}
	                  onMouseLeave={(e) => {
	                    (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-bg)";
	                    (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
	                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
	                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
	                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
	                  }}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--color-border)", margin: "clamp(24px, 4vw, 32px) 0" }} />

        {/* Bottom Section */}
	          {/* Bottom Section - More Attractive Copyright */}
	          <div
	            style={{
	              display: "flex",
	              flexDirection: "column",
	              gap: "clamp(12px, 3vw, 16px)",
	              alignItems: "center",
	              justifyContent: "center",
	              padding: "clamp(20px, 4vw, 32px) 0",
	              textAlign: "center",
	              fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
	              color: "var(--color-text-secondary)",
	            }}
	          >
	            <p style={{ margin: 0, fontWeight: "600", color: "var(--color-text)" }}>
	              © {currentYear} {fullName}. All rights reserved.
	            </p>
	           
	            <a
	              href={`mailto:${email}`}
	              style={{
	                color: "var(--color-primary)",
	                textDecoration: "none",
	                transition: "all var(--transition-fast)",
	                fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
	              }}
	              onMouseEnter={(e) => {
	                (e.currentTarget as HTMLElement).style.color = "var(--color-accent)";
	                (e.currentTarget as HTMLElement).style.textDecoration = "underline";
	              }}
	              onMouseLeave={(e) => {
	                (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
	                (e.currentTarget as HTMLElement).style.textDecoration = "none";
	              }}
	            >
	              {email}
	            </a>
	          </div>
      </div>
    </footer>
  );
}
