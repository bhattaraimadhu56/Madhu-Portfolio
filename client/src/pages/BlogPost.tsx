import { useSettings } from "@/hooks/useSettings";
import { useParams } from "wouter";
import NotFound from "./NotFound";
import { convertMarkdownToHtml } from "@/lib/markdown";

export default function BlogPost() {
  const { slug } = useParams();
  const settings = useSettings();
  const posts = settings.blog?.posts || [];
  const post = posts.find((p: any) => p.slug === slug);

  if (!post) {
    return <NotFound />;
  }

  // Convert Markdown content to HTML
  const htmlContent = convertMarkdownToHtml(post.content);

  // Define common styles as objects to simplify JSX and avoid syntax errors
  const sectionStyle = { padding: "clamp(40px, 8vw, 80px) 0", borderBottom: "1px solid var(--color-border)" };
  const containerStyle = { maxWidth: "800px", margin: "0 auto", padding: "0 var(--spacing-md)" };
  
  // --- FINAL TITLE STYLE: Smaller font, allows wrapping ---
  const titleStyle = { 
    fontSize: "clamp(2rem, 5vw, 3rem)", // Reduced max size from 4rem to 3rem
    fontWeight: "800", 
    marginBottom: "12px", 
    color: "var(--color-text)", 
    fontFamily: "'Space Grotesk', sans-serif",
    lineHeight: "1.2", // Slightly looser line height for better multi-line readability
    whiteSpace: "normal" as "normal", // Allow wrapping
    overflow: "visible" as "visible", // Allow overflow
    textOverflow: "clip" as "clip", // Do not use ellipsis
  };
  // --------------------------------------------------------

  const dateStyle = { fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--color-text-secondary)" };
  
  const imageStyle = { 
    width: "100%", 
    height: "auto", 
    objectFit: "cover" as "cover", 
    borderRadius: "var(--radius-lg)", 
    marginBottom: "clamp(20px, 4vw, 40px)" 
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", minHeight: "100vh" }}>
      <section style={{ ...sectionStyle, backgroundColor: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div style={containerStyle}>
            <h1 style={titleStyle}>{post.title}</h1>
            <p style={dateStyle}>{post.date}</p>
          </div>
        </div>
      </section>

      <section style={{ ...sectionStyle, backgroundColor: "var(--color-bg)", borderBottom: "none" }}>
        <div className="container">
          <div style={containerStyle}>
            {post.image && <img src={post.image} alt={post.title} style={imageStyle} />}
            {/* The blog-content class is defined in index.css */}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </section>
    </div>
  );
}
