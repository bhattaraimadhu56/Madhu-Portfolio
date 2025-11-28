import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";
import DynamicButton from "@/components/DynamicButton";
import { Mail, Phone, MapPin, Send } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  phone: string; 
  message: string;
}

export default function Contact() {
  const settings = useSettings();
  const contactConfig = settings.contact || {};
  const profileConfig = settings.profile || {};
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const pageTitle = contactConfig.pageTitle || "Get In Touch";
  const pageSubtitle = contactConfig.pageSubtitle || "Let's discuss your next project";
  const email = profileConfig.email || "info@madhudata.com";
  const phone = "022 654 1537"; 
  const location = contactConfig.location || "";
  const formspreeEndpoint = "https://formspree.io/f/mblvazwn"; 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formspreeEndpoint) {
      try {
        await fetch(formspreeEndpoint, { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } });
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", textAlign: "center" }}>
        <div className="container">
          <div style={{ padding: "0 var(--spacing-md)" }}>
            <h1 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: "700", marginBottom: "16px", color: "var(--color-text)", fontFamily: "'Space Grotesk', sans-serif" }}>{pageTitle}</h1>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--color-text-secondary)" }}>{pageSubtitle}</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(40px, 8vw, 60px)", padding: "0 var(--spacing-md)" }} className="lg:grid-cols-2">
            {/* Contact Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(24px, 4vw, 32px)" }}>
              <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "700", color: "var(--color-text)", fontFamily: "'Space Grotesk', sans-serif" }}>Contact Information</h2>

              {email && (
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail size={24} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", fontWeight: "700", color: "var(--color-text)", margin: "0 0 4px 0" }}>Email</h3>
                    <a href={`mailto:${email}`} style={{ color: "var(--color-primary)", textDecoration: "none", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>{email}</a>
                  </div>
                </div>
              )}

              {phone && (
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-secondary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={24} style={{ color: "var(--color-secondary)" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", fontWeight: "700", color: "var(--color-text)", margin: "0 0 4px 0" }}>Phone</h3>
                    <a href={`tel:${phone}`} style={{ color: "var(--color-secondary)", textDecoration: "none", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>{phone}</a>
                  </div>
                </div>
              )}

              {location && (
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-accent-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={24} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", fontWeight: "700", color: "var(--color-text)", margin: "0 0 4px 0" }}>Location</h3>
                    <p style={{ color: "var(--color-text-secondary)", fontSize: "clamp(0.9rem, 2vw, 1rem)", margin: 0 }}>{location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div style={{ backgroundColor: "var(--color-bg-secondary)", border: "2px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "clamp(24px, 4vw, 32px)" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 3vw, 20px)" }} method="POST">
                <div>
                  <label style={{ display: "block", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: "100%", padding: "clamp(10px, 2vw, 12px)", borderRadius: "var(--radius-md)", border: "2px solid var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)", fontSize: "clamp(0.9rem, 2vw, 1rem)", transition: "border-color var(--transition-fast)" }} onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")} />
                </div>

	                <div>
	                  <label style={{ display: "block", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>Email</label>
	                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required style={{ width: "100%", padding: "clamp(10px, 2vw, 12px)", borderRadius: "var(--radius-md)", border: "2px solid var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)", fontSize: "clamp(0.9rem, 2vw, 1rem)", transition: "border-color var(--transition-fast)" }} onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")} />
	                </div>

	                {/* Added Phone Number Field with Validation */}
	                <div>
	                  <label style={{ display: "block", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>Phone Number</label>
	                  <input
	                    type="tel"
	                    value={formData.phone}
	                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
	                    required
	                    pattern="[0-9\s\-\(\)\+]{6,}" /* Basic pattern for phone numbers (digits, spaces, hyphens, parentheses, plus sign) */
	                    title="Please enter a valid phone number (at least 6 digits)"
	                    style={{ width: "100%", padding: "clamp(10px, 2vw, 12px)", borderRadius: "var(--radius-md)", border: "2px solid var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)", fontSize: "clamp(0.9rem, 2vw, 1rem)", transition: "border-color var(--transition-fast)" }}
	                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
	                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
	                  />
	                </div>

                <div>
                  <label style={{ display: "block", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px" }}>Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} style={{ width: "100%", padding: "clamp(10px, 2vw, 12px)", borderRadius: "var(--radius-md)", border: "2px solid var(--color-border)", backgroundColor: "var(--color-bg)", color: "var(--color-text)", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontFamily: "inherit", resize: "vertical", transition: "border-color var(--transition-fast)" }} onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")} />
                </div>

                <button type="submit" style={{ padding: "clamp(12px, 2vw, 14px) clamp(20px, 4vw, 24px)", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-primary)", color: "white", border: "none", fontSize: "clamp(0.9rem, 2vw, 1rem)", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all var(--transition-fast)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                  <Send size={16} />
                  Send Message
                </button>

                {submitted && <div style={{ padding: "12px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-success-light)", color: "var(--color-success)", fontSize: "clamp(0.9rem, 2vw, 1rem)", textAlign: "center" }}>Message sent successfully!</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
