import { useSettings } from "@/hooks/useSettings";
import DynamicButton from "@/components/DynamicButton";
import { Download } from "lucide-react";

/**
 * About Page
 * Mobile-first responsive design
 * All images and content loaded dynamically from settings
 * No hardcoding anywhere
 */
export default function About() {
  const settings = useSettings();
  const aboutConfig = settings.about || {};
  const profileConfig = settings.profile || {};

  const profileImage = profileConfig.profileImage || "/images/profile.jpg";
  const fullName = profileConfig.fullName || "Name";
  const title = profileConfig.title || "Title";
  const bio = aboutConfig.personalStory?.content || "Bio content";
  const experience = aboutConfig.workExperience?.items || [];
  const education = aboutConfig.education?.items || [];
  const resumeUrl = aboutConfig.resumeFileName || "/resume.pdf";
  const resumeButtonLabel = "Download Resume";

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      {/* Hero Section - Mobile First */}
      <section
        style={{
          padding: "clamp(40px, 8vw, 80px) 0",
          backgroundColor: "var(--color-bg-secondary)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "clamp(32px, 6vw, 48px)",
              alignItems: "center",
              padding: "0 var(--spacing-md)",
            }}
            className="md:grid-cols-2"
          >
            {/* Profile Image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                order: -1,
              }}
              className="md:order-1"
            >
              <img
                src={profileImage}
                alt={fullName}
                style={{
                  width: "clamp(200px, 60vw, 350px)",
                  height: "clamp(200px, 60vw, 350px)",
                  borderRadius: "var(--radius-xl)",
                  objectFit: "cover",
                  boxShadow: "var(--shadow-xl)",
                  border: "4px solid var(--color-primary)",
                }}
              />
            </div>

            {/* Profile Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(16px, 3vw, 24px)",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: "clamp(2rem, 6vw, 3rem)",
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
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                    color: "var(--color-primary)",
                    fontWeight: "600",
                  }}
                >
                  {title}
                </p>
              </div>

              <p
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                  color: "var(--color-text-secondary)",
                  lineHeight: "1.8",
                }}
              >
                {bio}
              </p>

              {/* Download Resume Button */}
              <DynamicButton
                label={resumeButtonLabel}
                href={resumeUrl}
                variant="primary"
                size="md"
                icon={<Download size={16} />}
                iconPosition="left"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Mobile First */}
      {experience.length > 0 && (
        <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                  fontWeight: "700",
                  marginBottom: "clamp(32px, 6vw, 48px)",
                  color: "var(--color-text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Professional Experience
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(24px, 4vw, 32px)",
                }}
              >
                {experience.map((job: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      borderLeft: "4px solid var(--color-primary)",
                      paddingLeft: "clamp(16px, 3vw, 24px)",
                      paddingTop: "clamp(12px, 2vw, 16px)",
                      paddingBottom: "clamp(12px, 2vw, 16px)",
                      transition: "all var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.paddingLeft = "clamp(20px, 4vw, 28px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.paddingLeft = "clamp(16px, 3vw, 24px)";
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                        fontWeight: "700",
                        color: "var(--color-text)",
                        marginBottom: "4px",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {job.position}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        color: "var(--color-primary)",
                        fontWeight: "600",
                        marginBottom: "4px",
                      }}
                    >
                      {job.company}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                        color: "var(--color-text-tertiary)",
                        marginBottom: "12px",
                      }}
                    >
                      {job.duration}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        color: "var(--color-text-secondary)",
                        lineHeight: "1.6",
                      }}
                    >
                      {job.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section - Mobile First */}
      {education.length > 0 && (
        <section
          style={{
            padding: "clamp(40px, 8vw, 80px) 0",
            backgroundColor: "var(--color-bg-secondary)",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <div className="container">
            <div style={{ padding: "0 var(--spacing-md)" }}>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                  fontWeight: "700",
                  marginBottom: "clamp(32px, 6vw, 48px)",
                  color: "var(--color-text)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Education
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(clamp(250px, 80vw, 300px), 1fr))",
                  gap: "clamp(20px, 4vw, 32px)",
                }}
              >
                {education.map((edu: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "var(--color-bg)",
                      border: "2px solid var(--color-border)",
                      borderRadius: "var(--radius-lg)",
                      padding: "clamp(20px, 4vw, 24px)",
                      transition: "all var(--transition-base)",
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
                    <h3
                      style={{
                        fontSize: "clamp(1rem, 3vw, 1.2rem)",
                        fontWeight: "700",
                        color: "var(--color-text)",
                        marginBottom: "4px",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        color: "var(--color-primary)",
                        fontWeight: "600",
                        marginBottom: "4px",
                      }}
                    >
                      {edu.school}
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                        color: "var(--color-text-tertiary)",
                      }}
                    >
                      {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
