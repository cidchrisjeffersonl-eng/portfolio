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
          Full Stack Developer
        </h1>
        <p className="hero-sub">
          Full Stack Developer and recent BSIT graduate with hands-on experience
          designing, developing, testing, and maintaining web applications. From a
          backend internship at DOST to freelance systems delivered end to end for
          small businesses, I build reliable APIs, modern interfaces, and complete
          product workflows from requirements to deployment.
        </p>
        <div className="hero-ctas">
          <Link to="/projects" className="btn btn-primary">View My Work</Link>
          <Link to="/contact" className="btn btn-accent">Hire Me</Link>
          <a href="https://github.com/cidchrisjeffersonl-eng" target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-number">3</div>
            <div className="hero-stat-label">Client Web Systems Delivered</div>
          </div>
          <div>
            <div className="hero-stat-number">8+</div>
            <div className="hero-stat-label">REST API Endpoints Built</div>
          </div>
          <div>
            <div className="hero-stat-number">4</div>
            <div className="hero-stat-label">Certifications Earned</div>
          </div>
          <div>
            <div className="hero-stat-number">4</div>
            <div className="hero-stat-label">User Roles in Capstone</div>
          </div>
        </div>
      </div>
    </section>
  );
}