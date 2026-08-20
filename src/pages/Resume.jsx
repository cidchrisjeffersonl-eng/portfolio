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
          Junior Software Engineer · Full Stack Developer
          <br />
          CISDP Certified · Cisco CCNA · BSIT Graduate 2026
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          
           <a href="/Chris_Jefferson_Cid_Resume.pdf"
            download
            className="btn btn-primary"
          >
            Download PDF
          </a>
          
            <a href="https://linkedin.com/in/chris-jefferson-cid-5850b2399"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
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
              <span>Department of Science and Technology (DOST) — EIS System · Bicutan, Taguig City</span>
              <p>
                Built and shipped 8+ RESTful API endpoints for the EIS microservice using
                Node.js and PostgreSQL. Wrote Jest test suites across 3+ sprint cycles.
                Worked in Agile/Scrum with daily standups and sprint retrospectives tracked
                via OpenProject.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">Jan 2024 – Present</div>
            <div className="timeline-content">
              <h4>Freelance Full Stack Developer</h4>
              <span>Self-Employed</span>
              <p>
                Delivered 3 client projects end-to-end: a clinic appointment booking system,
                a CRM for a local events styling business, and an order management system
                for an online reseller. Managed full project lifecycle independently.
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
                Coursework: Software Engineering, Web Development, Database Management,
                Systems Analysis, Networking.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">2025</div>
            <div className="timeline-content">
              <h4>CISDP Certification</h4>
              <span>East West International Educational Specialist</span>
              <p>Certified Information Security and Data Privacy Practitioner.</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-date">2025</div>
            <div className="timeline-content">
              <h4>Cisco CCNA</h4>
              <span>Cisco Networking Academy</span>
              <p>
                Enterprise Networking, Security and Automation — Switching, Routing
                and Wireless Essentials — Introduction to Networks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}