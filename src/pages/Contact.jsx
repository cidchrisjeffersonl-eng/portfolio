import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:cidchrisjeffersonl@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="page">
      <div className="section-label">Get In Touch</div>
      <h2 className="section-title">Contact Me</h2>
      <p className="section-sub">
        Open to junior software engineer roles and freelance projects. Let's talk.
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div>
              <h4>Email</h4>
              <p>cidchrisjeffersonl@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📱</div>
            <div>
              <h4>Phone</h4>
              <p>+63 910 767 9273</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div>
              <h4>Location</h4>
              <p>Marikina City, Philippines</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💼</div>
            <div>
              <h4>LinkedIn</h4>
              <p>
                
                 <a href="https://linkedin.com/in/chris-jefferson-cid-5850b2399"
                  target="_blank"
                  rel="noreferrer"
                >
                  chris-jefferson-cid-5850b2399
                </a>
              </p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">💻</div>
            <div>
              <h4>GitHub</h4>
              <p>
                
                 <a href="https://github.com/cidchrisjeffersonl-eng"
                  target="_blank"
                  rel="noreferrer"
                >
                  cidchrisjeffersonl-eng
                </a>
              </p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
          {submitted && (
            <p style={{ color: "#0b3d2e", fontSize: "13px" }}>
              Opening your email client...
            </p>
          )}
        </form>
      </div>
    </div>
  );
}