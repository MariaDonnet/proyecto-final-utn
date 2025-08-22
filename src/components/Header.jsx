import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import { useEffect, useState } from "react";
import "../styles/components/Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // agrega sombra si baja 10px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="header__logo">
        <Link to="/" className="header__brand">
          Mi Tienda
        </Link>
      </div>
      <button className="header__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <nav className={`header__nav ${menuOpen ? "nav--open" : ""}`}>
        <ul className="nav__list">
          {user ? (
            <>
              <li className="nav__item">
                <Link to="/" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Inicio
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/sobre-nosotros" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Sobre Nosotros
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/dashboard" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav__item">
                <button onClick={handleLogout} className="nav__button">
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav__item">
                <Link to="/" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Inicio
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/sobre-nosotros" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Sobre Nosotros
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/login" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Iniciar sesión
                </Link>
              </li>
              <li className="nav__item">
                <Link to="/registrate" className="nav__link" onClick={() => setMenuOpen(false)}>
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
