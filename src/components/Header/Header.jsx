import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logoIcone from "../../../public/imgs/logoathena.png";

const LINKS = [
  { label: "Início", to: "/" },
  { label: "Explorar", to: "/explorar" },
  { label: "Coleções", to: "/colecoes" },
  { label: "Minha Biblioteca", to: "/biblioteca" },
];

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img className="header-logo-img" src={logoIcone} alt="Logo Athena" />
        <span className="header-logo-texto">Athena</span>
      </Link>

      <nav aria-label="Principal">
        <ul className="header-nav">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Link to="/perfil" className="header-avatar" aria-label="Meu perfil">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="16" cy="16" r="14" />
          <circle cx="16" cy="13" r="5" fill="currentColor" />
          <path d="M6 26c2-5 6-7 10-7s8 2 10 7" fill="currentColor" />
        </svg>
      </Link>
    </header>
  );
}