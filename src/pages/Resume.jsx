export default function Resume() {
  return (
    <div className="page resume-page">
      <div className="section-label">Resume</div>
      <h2 className="section-title">My Resume</h2>
      <p className="section-sub">
        Download my latest resume or view it online.
      </p>

      <div className="resume-preview">
        <div className="resume-icon">📄</div>
        <h3>Chris Jefferson L. Cid</h3>
        <p>
          Full Stack Developer · BSIT Graduate 2026
          <br />
          CISDP Certified · Cisco CCNA · DOST Backend Intern
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/Chris_Jefferson_Cid_Resume.pdf" download className="btn btn-primary">
            Download PDF
          </a>
          <a href="https://linkedin.com/in/chris-jefferson-cid-5850b2399" target="_blank" rel="noreferrer" className="btn btn-outline">
            View LinkedIn
          </a>
        </div>
      </div>

      <div style={{ marginTop: "60px" }}>
        <div className="section-label">Experience</div>
        <h2 className="section-title" style={{ fontSize: "24px", marginBottom: "32px" }}>
          Work History
        </h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">Feb – Jun 2026</div>
            <div className="timeline-content">
              <h4>Backend Developer Intern</h4>
              <span>Department of Science and Technology (DOST) — EIS Microservices Team · Bicutan, Taguig City</span>
              <p>
                Implemented and shipped 8+ RESTful API endpoints for the DOST Enterprise Information System (EIS) microservices using Node.js, TypeScript, and PostgreSQL; tested with Postman and managed containers with Podman.
              </p>
              <p>
                Wrote Jest unit test suites covering API endpoints and database query logic for every file created, maintaining coverage across 3+ Agile sprint cycles before each code review submission.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">Jan 2024 – Present</div>
            <div className="timeline-content">
              <h4>Freelance Full Stack Developer</h4>
              <span>Self-Employed</span>
              <p>
                Delivered 3 client web systems independently: gathered requirements, designed the UI, built backend integration, tested, deployed, and handed over to the client. Projects included clinic appointment booking, CRM, and order management systems.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "60px" }}>
        <div className="section-label">Projects</div>
        <h2 className="section-title" style={{ fontSize: "24px", marginBottom: "32px" }}>
          Selected Work
        </h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">2025 – 2026</div>
            <div className="timeline-content">
              <h4>Smart Feedback Analytics for Faculty Evaluation</h4>
              <span>Capstone, Sole Developer · React, Node.js, TypeScript, PostgreSQL, Ollama</span>
              <p>
                Faculty evaluation platform with 4 user roles, 6 CRUD modules, and a local-LLM action-plan generator with rule-based fallback. Secured with JWT, Zod, rate limiting, and 7 Jest security tests.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">Sep 2026 – Present</div>
            <div className="timeline-content">
              <h4>Lurk POS System</h4>
              <span>Cafe POS and inventory · JavaScript, Real-time Database</span>
              <p>
                Live shared stock across devices, staff PIN login with activity log, simulated supplier auto-reordering, and nightly closing-count reconciliation.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">Sep 2026 – Present</div>
            <div className="timeline-content">
              <h4>Fit Cheque</h4>
              <span>E-commerce web app · React (Vite), Node.js/Express, Supabase</span>
              <p>
                Online store with product catalog, cart, user sign-in/registration, profiles, and an admin dashboard, deployed on Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "60px" }}>
        <div className="section-label">Education</div>
        <h2 className="section-title" style={{ fontSize: "24px", marginBottom: "32px" }}>
          Academic Background
        </h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">2022 – 2026</div>
            <div className="timeline-content">
              <h4>BS Information Technology</h4>
              <span>Far Eastern University Roosevelt — Marikina City</span>
              <p>
                Dean’s Lister — Second Honors, Second Semester AY 2022-2023 (GPA: 3.800). Coursework included Software Engineering, Web Development, Database Management, Systems Analysis, Computer Networks, and Information Security.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">2025</div>
            <div className="timeline-content">
              <h4>Certifications</h4>
              <span>East West International Educational Specialist · Cisco Networking Academy</span>
              <p>
                CISDP — Certified Information Security and Data Privacy Practitioner; CCNA: Enterprise Networking; CCNA: Switching/Routing; CCNAv7: Intro to Networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}