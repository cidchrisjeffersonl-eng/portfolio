export default function Projects() {
  const projects = [
    {
      emoji: "📊",
      title: "Smart Feedback Analytics",
      description:
        "Preview of the Smart Feedback Analytics capstone dashboard, showing synthetic faculty-feedback data with sentiment breakdowns, AI-generated insights, risk flags, and theme clustering. The demo highlights the analytics interface and contains no real student or faculty data.",
      tags: ["JavaScript", "Data Visualization", "NLP UI"],
      github: "https://github.com/cidchrisjeffersonl-eng/smart-feedback-analytics",
      demo: "/edupulse-ai-demo.html",
      featured: true,
    },
    {
      emoji: "👗",
      title: "FITCHEQUE",
      description:
        "Live storefront for curated pre-loved fashion, featuring new arrivals, a product collection, a shopping cart, and customer sign-in. A polished shopping experience centered on giving second-hand pieces a new life.",
      tags: ["E-commerce", "Pre-loved Fashion", "Online Store"],
      github: null,
      demo: "https://fitcheque.store",
      demoLabel: "Visit Site",
    },
    {
      emoji: "✨",
      title: "Constellation Studio",
      description:
        "An interactive generative art piece — click to place stars, drag between them to draw constellations, with ambient drifting stars and shooting stars streaking through in the background. Built as a canvas/animation showcase, exploring the kind of motion and visual polish used in animated hero sections.",
      tags: ["JavaScript", "Canvas API", "Animation"],
      github: null,
      demo: "/constellation-studio.html",
    },

    {
      emoji: "🌼",
      title: "Maison Éclair",
      description:
        "Editorial-style landing page for a fictional Parisian pâtisserie, featuring its story, pastry menu, location, and hours. A visual design study—not a real bakery or booking service.",
      tags: ["HTML/CSS", "Scroll Animation", "Editorial Design"],
      github: null,
      demo: "/maison-eclair.html",
    },
    {
      emoji: "☀️",
      title: "Solar Materials Estimator",
      description:
        "Portfolio-only solar sizing estimator that turns a monthly electric bill and system choices into a rough system size, panel and equipment estimates, and indicative cost range. Estimates are preliminary and require an on-site assessment before purchase.",
      tags: ["JavaScript", "HTML/CSS", "Solar sizing logic"],
      github: null,
      demo: "/solar-estimator.html",
    },
    {
      emoji: "🏥",
      title: "Clinic Appointment Booking System",
      description:
        "Interactive, multi-step appointment-booking prototype for a fictional dermatology clinic. Visitors choose a visit type and provider, select a date and time, and enter contact details; the demo is not connected to a live clinic.",
      tags: ["HTML", "CSS", "JavaScript"],
      github: null,
      demo: "/clinic-booking-demo.html",
    },
    {
      emoji: "📋",
      title: "Client Management System (CRM)",
      description:
        "Demo CRM dashboard for a fictional styling studio, with searchable client records, a client detail drawer, and an event calendar. It is a portfolio piece, not a real client system.",
      tags: ["JavaScript", "Dashboard UI", "Data Filtering"],
      github: null,
      demo: "/crm-dashboard-demo.html",
    },
    {
      emoji: "📦",
      title: "Order Management System",
      description:
        "Order-fulfillment dashboard prototype for a fictional online reseller, showing sample orders, buyers, items, tracking codes, and shipment stages. It is a visual workflow demo, not connected to live order data or email notifications.",
      tags: ["JavaScript", "Custom UI", "State Animation"],
      github: null,
      demo: "/order-tracking-demo.html",
    },
    {
      emoji: "☕",
      title: "Lurk POS System",
      description:
        "Cafe point-of-sale and inventory system with order entry, shared stock tracking, staff-attributed activity, supplier-order controls, and closing-count reconciliation. Staff PINs identify who handled each action; they are not a security lock.",
      tags: ["JavaScript", "Shared Database", "POS System"],
      github: null,
      demo: "/lurk-pos-demo.html",
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
                    {project.demoLabel || "Live Demo"}
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