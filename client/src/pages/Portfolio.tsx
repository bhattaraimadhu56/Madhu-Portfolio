import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";
import DynamicButton from "@/components/DynamicButton";
import { ExternalLink, Github } from "lucide-react";

export default function Portfolio() {
  const settings = useSettings();
  const portfolioConfig = settings.portfolio || {};
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const pageTitle = portfolioConfig.pageTitle || "Portfolio";
  const pageSubtitle = portfolioConfig.pageSubtitle || "My Projects";
  const projects = portfolioConfig.projects || [];
  const allTags: string[] = Array.from(new Set(projects.flatMap((p: any) => p.tags || []))) as string[];

  const filteredProjects = selectedTag
    ? projects.filter((p: any) => p.tags?.includes(selectedTag))
    : projects;

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

      {allTags.length > 0 && (
        <section style={{ padding: "clamp(32px, 6vw, 48px) 0", backgroundColor: "var(--color-bg)", borderBottom: "1px solid var(--color-border)" }}>
          <div className="container">
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(10px, 2vw, 12px)", padding: "0 var(--spacing-md)" }}>
              <button onClick={() => setSelectedTag(null)} style={{ padding: "clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)", borderRadius: "var(--radius-full)", backgroundColor: selectedTag === null ? "var(--color-primary)" : "var(--color-primary-light)", color: selectedTag === null ? "white" : "var(--color-primary)", border: "1px solid var(--color-primary)", fontSize: "clamp(0.8rem, 2vw, 0.95rem)", fontWeight: "600", cursor: "pointer", transition: "all var(--transition-fast)" }}>All Projects</button>
              {allTags.map((tag: string) => (
                <button key={tag} onClick={() => setSelectedTag(tag)} style={{ padding: "clamp(8px, 2vw, 10px) clamp(14px, 3vw, 18px)", borderRadius: "var(--radius-full)", backgroundColor: selectedTag === tag ? "var(--color-secondary)" : "var(--color-bg-secondary)", color: selectedTag === tag ? "white" : "var(--color-text-secondary)", border: `1px solid ${selectedTag === tag ? "var(--color-secondary)" : "var(--color-border)"}`, fontSize: "clamp(0.8rem, 2vw, 0.95rem)", fontWeight: "600", cursor: "pointer", transition: "all var(--transition-fast)" }}>{tag}</button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "clamp(40px, 8vw, 80px) 0", backgroundColor: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(250px, 80vw, 320px), 1fr))", gap: "clamp(20px, 4vw, 32px)", padding: "0 var(--spacing-md)" }}>
            {filteredProjects.map((project: any, index: number) => (
              <div key={index} style={{ backgroundColor: "var(--color-bg-secondary)", border: "2px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all var(--transition-base)", display: "flex", flexDirection: "column" }}>
                {project.image && <img src={project.image} alt={project.title} style={{ width: "100%", height: "clamp(150px, 30vw, 200px)", objectFit: "cover", transition: "transform var(--transition-base)" }} />}
                <div style={{ padding: "clamp(16px, 3vw, 20px)", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                  <h3 style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", fontWeight: "700", color: "var(--color-text)", fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{project.title}</h3>
                  <p style={{ fontSize: "clamp(0.85rem, 2vw, 0.95rem)", color: "var(--color-text-secondary)", lineHeight: "1.6", margin: 0, flex: 1 }}>{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                      {project.tags.map((tag: string, idx: number) => (
                        <span key={idx} style={{ display: "inline-block", padding: "4px 10px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)", fontWeight: "500" }}>{tag}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "clamp(8px, 2vw, 12px)", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid var(--color-border)" }}>
                    {project.liveUrl && <DynamicButton label="Live" href={project.liveUrl} variant="primary" size="sm" icon={<ExternalLink size={14} />} iconPosition="left" />}
                    {project.githubUrl && <DynamicButton label="Code" href={project.githubUrl} variant="outline" size="sm" icon={<Github size={14} />} iconPosition="left" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProjects.length === 0 && <div style={{ textAlign: "center", padding: "clamp(40px, 8vw, 60px)", color: "var(--color-text-secondary)" }}><p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>No projects found for this category.</p></div>}
        </div>
      </section>
    </div>
  );
}
