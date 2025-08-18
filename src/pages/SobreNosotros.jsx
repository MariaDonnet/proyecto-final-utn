import { Layout } from "../components/Layout";
import "../styles/pages/SobreNosotros.css";

const SobreNosotros = () => {
  return (
    <Layout>
      <section className="about-container">
        <h1 className="about-title">Acerca de Nosotros</h1>
        <div className="about-intro">
          <p>
            En Virtua Tienda, nos impulsa la pasión por ofrecerte la mejor experiencia de compra. Nos esforzamos para proporcionarte productos de calidad, atención personalizada y envíos rápidos.
            Estamos comprometidos contigo, y con mejorar siempre para que tu experiencia sea cada vez más satisfactoria.
          </p>
          <p>Nuestro compromiso es contigo, nuestro cliente, y con la innovación constante para mejorar cada día.</p>
        </div>
        {/* Sección de valores / beneficios */}
        <div className="about-values">
          <div className="about-value">
              <span class="icon">🎯</span>
            <h3>Nuestro Proyecto</h3>
            <p>
              Este proyecto de e-commerce fue creado como parte de nuestro curso de React. Es una tienda online que simula una experiencia de compra real, con características como autenticación,
              administración de productos y navegación fluida. El proyecto resalta las mejores prácticas de desarrollo frontend, incluyendo manejo de estado, enrutamiento, formularios validados y
              diseño adaptable.
            </p>
          </div>
          <div className="about-value">
              <span class="icon">👥</span>
            <h3>Nuestro Público</h3>
            <p>
              Este proyecto está orientado a desarrolladores y estudiantes que buscan aprender React y tecnologías modernas de desarrollo web. También actúa como referencia para implementar funciones
              comunes en aplicaciones web. Los usuarios podrán explorar productos, registrarse, iniciar sesión y gestionar el catálogo, ofreciendo una experiencia de compra completa.
            </p>
          </div>
          <div className="about-value">
              <span class="icon">⚡</span>
            <h3>Tecnologías y Enfoques</h3>
            <p>
              <strong>Frontend:</strong> React 19, React Router DOM, Vite <br />
              <br />
              <strong>Estilos:</strong> CSS moderno con variables, Grid, Flexbox y diseño responsive <br />
              <br />
              <strong>APIs:</strong> FakeStoreAPI para productos y autenticación <br />
              <br />
              <strong>Enfoques:</strong> Componentes funcionales, Context API, formularios controlados y validación en tiempo real.
            </p>
          </div>
        </div>

        {/* Características técnicas */}
        <div className="about-features">
          <h2>Características Técnicas</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔐 Autenticación y Seguridad</h3>
              <ul>
                <li>Sistema de login/logout con Context API.</li>
                <li>Rutas protegidas con PrivateRoute.</li>
                <li>Validación de formularios en tiempo real.</li>
                <li>Manejo de errores y feedback al usuario.</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>📱 Diseño Responsive</h3>
              <ul>
                <li>Mobile-first design (hasta 480px).</li>
                <li>Tablet optimization (hasta 880px).</li>
                <li>Desktop experience (881px+).</li>
                <li>Grid system adaptable.</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>🔍 Funcionalidades Avanzadas</h3>
              <ul>
                <li>Búsqueda de productos en tiempo real.</li>
                <li>CRUD completo de productos.</li>
                <li>Modal popup para edición. (881px+).</li>
                <li>Loading states y error handling.</li>
              </ul>
            </div>
            <div className="feature-card">
              <h3>🎨 Experiencia de Usuario</h3>
              <ul>
                <li>Interfaz intuitiva y moderna.</li>
                <li>Animaciones y transiciones suaves.</li>
                <li>Mensajes de feedback claros.</li>
                <li>Navegación fluida entre páginas.</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Sección de preguntas / contacto */}
        <div className="about-questions">
          <h2>¿Tenés alguna pregunta?</h2>
          <p>Este proyecto fue desarrollado como parte del aprendizaje de React y las tecnologías modernas de desarrollo web. Si tenés alguna consulta o sugerencia, no dudes en contactarnos.</p>
          <a href="https://github.com/MariaDonnet" target="_blank" rel="noopener noreferrer" className="btn-projects">
            Ver más Proyectos
          </a>
        </div>
      </section>
    </Layout>
  );
};

export { SobreNosotros };
