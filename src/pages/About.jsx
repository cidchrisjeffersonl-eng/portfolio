import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page">
      <div className="section-label">About Me</div>
      <h2 className="section-title">Background and Experience</h2>
      <p className="section-sub">
        A developer who turns requirements into working systems with real-world impact.
      </p>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I am a Full Stack Developer and recent BSIT graduate from Far Eastern
            University Roosevelt, Marikina City. My experience spans backend work,
            frontend delivery, and full project ownership from planning through
            deployment and handoff.
          </p>
          <p>
            My backend internship at the Department of Science and Technology (DOST)
            gave me hands-on experience shipping RESTful APIs with Node.js,
            TypeScript, and PostgreSQL, while following Agile/Scrum workflows and
            writing Jest tests for each file created. I also independently deliver
            freelance web systems for small businesses since 2024, covering UI,
            API integration, testing, deployment, and client documentation.
          </p>
          <p>
            I have built secure and data-aware applications with JWT authentication,
            Zod validation, rate limiting, and parameterized database queries.
            I also hold CISDP and Cisco CCNA certifications, which strengthen my
            foundation in software engineering, networking, and information security.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
            <Link to="/projects" className="btn btn-primary">See My Projects</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <h4>Backend Developer Intern — DOST</h4>
            <p>Feb – Jun 2026 · Built and shipped 8+ RESTful API endpoints for the EIS microservices team using Node.js, TypeScript, and PostgreSQL, while maintaining Jest coverage across 3+ sprint cycles.</p>
          </div>
          <div className="highlight-card">
            <h4>Freelance Full Stack Developer</h4>
            <p>Jan 2024 – Present · Delivered 3 client web systems independently: a clinic appointment booking system, an events styling CRM, and a reseller order management platform.</p>
          </div>
          <div className="highlight-card">
            <h4>Capstone — Smart Feedback Analytics</h4>
            <p>Sole developer of a full-stack faculty evaluation platform with 4 user roles, 6 CRUD modules, AI-driven action-plan generation, and rule-based fallback logic.</p>
          </div>
          <div className="highlight-card">
            <h4>Certifications</h4>
            <p>CISDP — Certified Information Security and Data Privacy Practitioner; Cisco CCNA: Enterprise Networking, Switching/Routing, and Intro to Networks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}