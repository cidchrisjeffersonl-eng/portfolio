export default function Skills() {
  const categories = [
    {
      icon: "🌐",
      title: "Frontend",
      skills: ["React JS", "Vite", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
    },
    {
      icon: "⚙️",
      title: "Backend",
      skills: ["Node.js", "Express", "TypeScript", "PHP", "Laravel", "REST API", "MVC", "JWT Auth"],
    },
    {
      icon: "🗄️",
      title: "Databases",
      skills: ["PostgreSQL", "MySQL", "Relational Design", "Parameterized Queries"],
    },
    {
      icon: "🤖",
      title: "AI & LLM",
      skills: ["Ollama", "NLP Sentiment Analysis", "Prompt Design", "Rule-based Fallback", "Claude (Anthropic)", "GitHub Copilot"],
    },
    {
      icon: "🛠️",
      title: "DevOps & Tools",
      skills: ["Git", "GitHub", "Docker", "Podman", "Postman", "VS Code", "OpenProject"],
    },
    {
      icon: "🔒",
      title: "Security & Practices",
      skills: ["CISDP Certified", "Zod Validation", "Rate Limiting", "SQL Injection Prevention", "Agile/Scrum", "Jest", "Code Review"],
    },
    {
      icon: "☕",
      title: "Currently Learning",
      skills: ["Spring Boot", "Java", "Gradle", "JPA", "Apache POI", "OpenPDF"],
    },
    {
      icon: "🌐",
      title: "Networking",
      skills: ["Cisco CCNA", "Enterprise Networking", "Security & Automation", "Switching & Routing"],
    },
    {
      icon: "🗣️",
      title: "Languages",
      skills: ["Filipino (Native)", "English (Professional)"],
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