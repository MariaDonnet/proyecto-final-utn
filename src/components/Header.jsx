import { Link } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import "../styles/components/Header.css";

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__brand">
          Mi Tienda
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="nav__list">
          {user ? (
            <>
              <li className="nav__item">
                <Link to="/" className="nav__link">Inicio</Link>
              </li>
              <li className="nav__item">
                <Link to="/sobre-nosotros" className="nav__link">Sobre Nosotros</Link>
              </li>
              <li className="nav__item">
                <Link to="/dashboard" className="nav__link">Dashboard</Link>
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
                <Link to="/" className="nav__link">Inicio</Link>
              </li>
              <li className="nav__item">
                <Link to="/sobre-nosotros" className="nav__link">Sobre Nosotros</Link>
              </li>
              <li className="nav__item">
                <Link to="/login" className="nav__link">Iniciar sesión</Link>
              </li>
              <li className="nav__item">
                <Link to="/registrate" className="nav__link">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export { Header };
