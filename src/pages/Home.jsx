import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-badge">Available for Work</div>
        <h1>
          {"Hi, I'm "}
          <span>Chris Jefferson</span>
          <br />
          Junior Software Engineer
        </h1>
        <p className="hero-sub">
          Full-stack developer with hands-on backend experience at DOST,
          building production APIs in Node.js and PostgreSQL. I design, build,
          and ship complete web systems from database schema to deployed frontend.
        </p>
        <div className="hero-ctas">
          <Link to="/projects" className="btn btn-primary">View My Work</Link>
          <Link to="/contact" className="btn btn-accent">Hire Me</Link>
          <a href="https://github.com/cidchrisjeffersonl-eng" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-number">3+</div>
            <div className="hero-stat-label">Freelance Projects</div>
          </div>
          <div>
            <div className="hero-stat-number">8+</div>
            <div className="hero-stat-label">API Endpoints at DOST</div>
          </div>
          <div>
            <div className="hero-stat-number">2</div>
            <div className="hero-stat-label">Certifications</div>
          </div>
          <div>
            <div className="hero-stat-number">4</div>
            <div className="hero-stat-label">User Roles Capstone</div>
          </div>
        </div>
      </div>
    </section>
  );
}