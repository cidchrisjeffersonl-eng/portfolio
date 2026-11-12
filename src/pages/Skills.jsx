export default function Skills() {
  const categories = [
    {
      icon: "💬",
      title: "Languages",
      skills: ["JavaScript", "TypeScript", "PHP", "Python", "SQL", "HTML5", "CSS3"],
    },
    {
      icon: "🌐",
      title: "Frontend & Backend",
      skills: ["React JS", "Tailwind CSS", "Angular (exposure)", "Node.js", "Express.js", "PHP", "Laravel (exposure)", "REST API Design", "MVC Architecture"],
    },
    {
      icon: "🗄️",
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "Supabase", "Real-time Databases", "Relational Database Design", "Parameterized Queries"],
    },
    {
      icon: "🧪",
      title: "Testing & DevOps",
      skills: ["Jest", "Postman", "Test-Driven Development", "Git", "GitHub", "Docker", "Podman", "Vercel", "OpenProject", "DevHub"],
    },
    {
      icon: "🤖",
      title: "AI & Practices",
      skills: ["Ollama", "NLP Sentiment Analysis", "Prompt Design", "Agile/Scrum", "Code Review", "JWT Auth", "Zod Validation", "Rate Limiting"],
    },
    {
      icon: "📘",
      title: "Quality & Documentation",
      skills: ["Unit Testing", "Debugging", "Code Review", "Microsoft Office", "SDLC Docs", "DFDs", "ERDs", "Use Case Diagrams"],
    },
    {
      icon: "🔒",
      title: "Security & Networking",
      skills: ["CISDP Certified", "Cisco CCNA", "Information Security", "Database Security", "Enterprise Networking", "Security & Automation"],
    },
  ];

  return (
    <div className="page">
      <div className="section-label">Tech Stack</div>
      <h2 className="section-title">Skills</h2>
      <p className="section-sub">
        Technologies and tools I use to design, build, and ship production systems.
      </p>

      <div className="skills-grid">
        {categories.map((cat) => (
          <div className="skill-category" key={cat.title}>
            <h3>
              {cat.icon} {cat.title}
            </h3>
            <div className="skill-list">
              {cat.skills.map((skill) => (
                <span className="skill-pill" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}