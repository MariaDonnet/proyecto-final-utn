import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    // Validación de campos vacíos
    if (!username || !password) {
      setLoginError("Debes completar todos los campos");
      return;
    }

    // Llamada a login() desde el contexto
    const ok = await login(username, password);

    if (ok) {
      navigate("/dashboard"); // 👈 redirige al panel de administración
    } else {
      setLoginError("Credenciales incorrectas");
    }
  };

  return (
    <Layout>
      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Inicia sesión</h1>
          <p className="login-subtitle">Bienvenido de nuevo a nuestra tienda</p>

          {/* Bloque con credenciales de prueba */}
          <div className="login-alert">
            <p><strong>Credenciales de prueba:</strong></p>
            <p><b>Usuario:</b> johnd</p>
            <p><b>Contraseña:</b> m38rmF$</p>
          </div>

          {/* Formulario de login */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Nombre de usuario:</label>
              <input
                type="text"
                placeholder="Ingresa tu nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Contraseña:</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Error si falla el login */}
            {loginError && <p className="login-error">{loginError}</p>}

            <button type="submit" className="login-btn">Ingresar</button>
          </form>

          <p className="login-register">
            ¿No tenés una cuenta? <a href="#">Regístrate</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export { Login };
