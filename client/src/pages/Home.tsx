import { useSettings } from "@/hooks/useSettings";
import DynamicButton from "@/components/DynamicButton";
import DynamicLink from "@/components/DynamicLink";
import { Sparkles, ArrowRight } from "lucide-react";

/**
 * Home Page - Hero and Overview
 * Mobile-first responsive design
 * All styling uses CSS variables - changes instantly with theme toggle
 * All buttons and links are fully dynamic and responsive
  */
export default function Home() {
  const settings = useSettings();
  const homeConfig = settings.home || {};
  const profileConfig = settings.profile || {};

  const heroTagline = homeConfig.heroTagline || "Welcome";
  const heroHeading = homeConfig.heroHeading || "Heading";
  const heroSubheading = homeConfig.heroSubheading || "Subheading";
  const heroButtons = homeConfig.heroButtons || [];
  const stats = homeConfig.stats || [];
  const skills = homeConfig.skills || [];
  const achievements = homeConfig.achievements || [];
  const profileImage = profileConfig.profileImage || "/images/profile.jpg";
  const bannerImage = profileConfig.bannerImage || "/images/banner.jpg";
  const fullName = profileConfig.fullName || "Name";
  const title = profileConfig.title || "Title";
  const siteUrl = settings.siteUrl || "";

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      {/* LinkedIn-Style Profile Banner - Mobile First */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Background Banner */}
        <div
          style={{
            position: "relative",
            height: "clamp(200px, 40vw, 320px)",
            background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-accent))",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
          }}
        >
          <img
            src={bannerImage}
            alt="Professional Background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.4,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent, var(--color-bg))",
            }}
          />
        </div>

        {/* Profile Section */}
        <div style={{ position: "relative", marginTop: "clamp(-60px, -15vw, -80px)" }}>
          <div className="container">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(16px, 4vw, 24px)",
                marginBottom: "clamp(24px, 5vw, 32px)",
                padding: "0 var(--spacing-md)",
              }}
            >
              {/* Profile Picture */}
              <div style={{ position: "relative" }}>
                <img
                  src={profileImage}
                  alt={fullName}
                  style={{
                    width: "clamp(120px, 30vw, 160px)",
                    height: "clamp(120px, 30vw, 160px)",
                    borderRadius: "50%",
                    border: "4px solid var(--color-bg)",
                    boxShadow: "var(--shadow-xl)",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Name and Title */}
              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.5rem, 5vw, 2rem)",
                    fontWeight: "700",
                    marginBottom: "8px",
                    color: "var(--color-text)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {fullName}
                </h1>
                <p
                  style={{
                    fontSize: "clamp(1rem, 3vw, 1.25rem)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                    color: "var(--color-text-tertiary)",
                    marginTop: "4px",
                  }}
                >
                  {siteUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Content and Stats - REMOVED AS PER USER REQUEST. The profile banner remains. */
      /* The goal is to make the homepage attractive, mobile-first, and easily capture recruiter attention. */
      /* The remaining sections (Skills and Achievements) will now be the main focus. */
      }

      {/* Skills Section - Mobile First */}
      <section style={{ padding: "clamp(48px, 10vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "clamp(32px, 6vw, 48px)", padding: "0 var(--spacing-md)" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
                fontWeight: "700",
                color: "var(--color-text)",
                marginBottom: "16px",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {homeConfig.skillsTitle}
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)", color: "var(--color-text-secondary)" }}>
              {homeConfig.skillsSubtitle}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(10px, 2vw, 12px)",
              maxWidth: "64rem",
              margin: "0 auto",
              padding: "0 var(--spacing-md)",
            }}
          >
            {skills.map((skill: any) => (
              <span
                key={skill.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                  border: "1px solid var(--color-primary)",
                  fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                  fontWeight: "500",
                  transition: "all var(--transition-fast)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.color = "white";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--color-primary-light)";
                  (e.currentTarget as HTMLElement).style.color = "var(--color-primary)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <span>{skill.icon}</span>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section - Mobile First */}
      <section style={{ padding: "clamp(48px, 10vw, 80px) 0", backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(32px, 6vw, 48px)",
              padding: "0 var(--spacing-md)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
                fontWeight: "700",
                color: "var(--color-text)",
                marginBottom: "16px",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {homeConfig.achievementsTitle}
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)", color: "var(--color-text-secondary)" }}>
              {homeConfig.achievementsSubtitle}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 80vw, 280px), 1fr))",
              gap: "clamp(20px, 4vw, 32px)",
              maxWidth: "80rem",
              margin: "0 auto",
              padding: "0 var(--spacing-md)",
            }}
          >
            {achievements.map((achievement: any, index: number) => (
              <div
                key={index}
                style={{
                  backgroundColor: "var(--color-bg)",
                  border: "2px solid var(--color-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "clamp(20px, 4vw, 24px)",
                  transition: "all var(--transition-base)",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: "10px",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                    marginBottom: "16px",
                  }}
                >
                  {achievement.icon}
                </div>
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.25rem)",
                    fontWeight: "700",
                    color: "var(--color-text)",
                    marginBottom: "8px",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {achievement.title}
                </h3>
                <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.6", fontSize: "clamp(0.85rem, 2vw, 0.95rem)" }}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - REMOVED AS PER USER REQUEST */}

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
