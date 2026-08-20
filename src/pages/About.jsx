import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page">
      <div className="section-label">About Me</div>
      <h2 className="section-title">Background and Experience</h2>
      <p className="section-sub">
        A developer who ships real systems, not just side projects.
      </p>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I am a BS Information Technology graduate from Far Eastern University
            Roosevelt, Marikina City. I have hands-on backend experience from my
            internship at the Department of Science and Technology, where I built
            and shipped production API endpoints for a government digital platform.
          </p>
          <p>
            Outside of work, I independently built a full-stack AI-integrated
            feedback analytics system as my capstone project, and delivered
            freelance web systems for small businesses across multiple domains
            including clinic booking, CRM, and order management.
          </p>
          <p>
            I hold a Certified Information Security and Data Privacy Practitioner
            certification and Cisco CCNA certifications, giving me a strong
            foundation in both software engineering and security principles.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "12px" }}>
            <Link to="/projects" className="btn btn-primary">See My Projects</Link>
            <Link to="/contact" className="btn btn-outline">Get In Touch</Link>
          </div>
        </div>

        <div className="about-highlights">
          <div className="highlight-card">
            <h4>Backend Developer Intern — DOST</h4>
            <p>Feb – Jun 2026 · Built 8+ production RESTful API endpoints for the EIS microservice using Node.js and PostgreSQL, with Jest test suites across 3+ sprint cycles.</p>
          </div>
          <div className="highlight-card">
            <h4>Freelance Full Stack Developer</h4>
            <p>Jan 2024 – Present · Delivered 3 client projects end-to-end — clinic booking system, CRM for events business, and order management for an online reseller.</p>
          </div>
          <div className="highlight-card">
            <h4>Capstone — Smart Feedback Analytics</h4>
            <p>Sole developer of a full-stack AI-integrated faculty evaluation platform with NLP sentiment analysis, role-based dashboards, and an AI-assisted intervention system.</p>
          </div>
          <div className="highlight-card">
            <h4>Certifications</h4>
            <p>CISDP — Certified Information Security and Data Privacy Practitioner, 2025. Cisco CCNA: Enterprise Networking, Security and Automation, 2025.</p>
          </div>
        </div>
      </div>
    </div>
  );
}