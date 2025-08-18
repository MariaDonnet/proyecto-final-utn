import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/pages/NotFound.css";

const NotFound = () => {
  return (
    <Layout>
      <div className="notfound-container">
        <h1 className="notfound-title">🚫 404</h1>
        <h2 className="notfound-subtitle">Página no encontrada</h2>
        <p className="notfound-text">Lo sentimos, la página que estás buscando no existe o fue movida.</p>
        <Link to="/" className="notfound-button">Ir a inicio</Link>
      </div>
    </Layout>
  );
};

export { NotFound };
