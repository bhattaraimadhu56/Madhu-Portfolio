import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";
import DynamicLink from "@/components/DynamicLink";
import { Search } from "lucide-react";

export default function Blog() {
  const settings = useSettings();
  const blogConfig = settings.blog || {};
  const [searchTerm, setSearchTerm] = useState("");

  const pageTitle = blogConfig.pageTitle || "Blog";
  const pageSubtitle = blogConfig.pageSubtitle || "Articles & Insights";
  const posts = blogConfig.posts || [];

  const filteredPosts = posts.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div style={{ maxWidth: "600px", margin: "0 auto clamp(40px, 8vw, 60px)", padding: "0 var(--spacing-md)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "clamp(12px, 2vw, 16px)", borderRadius: "var(--radius-lg)", backgroundColor: "var(--color-bg-secondary)", border: "2px solid var(--color-border)" }}>
              <Search size={20} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ flex: 1, backgroundColor: "transparent", border: "none", outline: "none", color: "var(--color-text)", fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 80vw, 350px), 1fr))", gap: "clamp(20px, 4vw, 32px)", padding: "0 var(--spacing-md)" }}>
            {filteredPosts.map((post: any, index: number) => (
              <DynamicLink key={index} href={`/blog/${post.slug}`} variant="default">
                <div style={{ backgroundColor: "var(--color-bg-secondary)", border: "2px solid var(--color-border)", borderRadius: "var(--radius-lg)", overflow: "hidden", transition: "all var(--transition-base)", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--color-primary)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}>
                  {post.image && <img src={post.image} alt={post.title} style={{ width: "100%", height: "clamp(150px, 30vw, 200px)", objectFit: "cover" }} />}
                  <div style={{ padding: "clamp(16px, 3vw, 20px)", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                    <div style={{ fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)", color: "var(--color-primary)", fontWeight: "600" }}>{post.date}</div>
                    <h3 style={{ fontSize: "clamp(1rem, 3vw, 1.2rem)", fontWeight: "700", color: "var(--color-text)", fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>{post.title}</h3>
                    <p style={{ fontSize: "clamp(0.85rem, 2vw, 0.95rem)", color: "var(--color-text-secondary)", lineHeight: "1.6", margin: 0, flex: 1 }}>{post.excerpt}</p>
                    {post.tags && <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{post.tags.map((tag: string, idx: number) => <span key={idx} style={{ display: "inline-block", padding: "4px 10px", borderRadius: "var(--radius-full)", backgroundColor: "var(--color-primary-light)", color: "var(--color-primary)", fontSize: "clamp(0.7rem, 1.5vw, 0.8rem)", fontWeight: "500" }}>{tag}</span>)}</div>}
                  </div>
                </div>
              </DynamicLink>
            ))}
          </div>
          {filteredPosts.length === 0 && <div style={{ textAlign: "center", padding: "clamp(40px, 8vw, 60px)", color: "var(--color-text-secondary)" }}><p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>No blog posts found.</p></div>}
        </div>
      </section>
    </div>
  );
}
