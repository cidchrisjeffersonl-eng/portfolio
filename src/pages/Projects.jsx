export default function Projects() {
  const projects = [
    {
      emoji: "📊",
      title: "Smart Feedback Analytics",
      description:
        "Full-stack AI-integrated faculty evaluation platform. Built with React, Node.js/TypeScript, PostgreSQL, and a locally-hosted LLM (Ollama). Features NLP sentiment analysis, thematic categorization, role-based dashboards for 4 user roles, and an AI-assisted intervention system that flags at-risk faculty performance trends.",
      tags: ["React", "Node.js", "TypeScript", "PostgreSQL", "Ollama", "Docker", "Spring Boot"],
      github: "https://github.com/cidchrisjeffersonl-eng",
      demo: null,
      featured: true,
    },
    {
      emoji: "🏥",
      title: "Clinic Appointment Booking System",
      description:
        "Online scheduling system for a small dermatology clinic, enabling bookings across 3+ service categories for a 5-person clinic team. Built with React and Node.js/PostgreSQL.",
      tags: ["React", "Node.js", "PostgreSQL"],
      github: null,
      demo: null,
    },
    {
      emoji: "📋",
      title: "Client Management System (CRM)",
      description:
        "Web CRM for a local events styling business, replacing manual spreadsheet tracking with a dashboard managing 20+ client records, booking history, and upcoming event views.",
      tags: ["React", "Node.js", "PostgreSQL"],
      github: null,
      demo: null,
    },
    {
      emoji: "📦",
      title: "Order Management System",
      description:
        "Order tracking system for a small online reseller, automating order status updates and email notifications — eliminating manual follow-up for each transaction.",
      tags: ["React", "Node.js", "PostgreSQL"],
      github: null,
      demo: null,
    },
  ];

  return (
    <div className="page">
      <div className="section-label">Portfolio</div>
      <h2 className="section-title">Projects</h2>
      <p className="section-sub">
        Systems I designed, built, and shipped — from requirements to deployment.
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <div className="project-card" key={project.title}>
            <div className="project-image">{project.emoji}</div>
            <div className="project-body">
              {project.featured && (
                <div style={{
                  display: "inline-block",
                  background: "#eef3f0",
                  color: "#0b3d2e",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  marginBottom: "10px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}>
                  Featured — Capstone
                </div>
              )}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  
                    <a href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ fontSize: "13px", padding: "8px 16px" }} 
                    >
                    GitHub
                  </a>
                )}
                {project.demo && (
                  
                    <a href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-accent"
                    style={{ fontSize: "13px", padding: "8px 16px" }}
                  >
                    Live Demo
                  </a>
                )}
                {!project.github && !project.demo && (
                  <span style={{ fontSize: "13px", color: "#999" }}>
                    Private client project
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}