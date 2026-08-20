import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>
        Built by <span>Chris Jefferson Cid</span> · React + Vite
        {" · "}
        <a href="https://github.com/cidchrisjeffersonl-eng" target="_blank" rel="noreferrer" style={{ color: "#f4b400" }}>
          GitHub
        </a>
        {" · "}
        <a href="https://linkedin.com/in/chris-jefferson-cid-5850b2399" target="_blank" rel="noreferrer" style={{ color: "#f4b400" }}>
          LinkedIn
        </a>
        {" · "}
        {year}
      </p>
    </footer>
  );
}