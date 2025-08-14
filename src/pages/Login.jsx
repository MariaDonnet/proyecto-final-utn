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
  const [error, setError] = useState("");

  // Credenciales de ejemplo para mostrar al usuario
  const testCreds = {
    username: "mor_2314",
    password: "83r5^_"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Debes completar todos los campos");
      return;
    }

    const ok = await login(username, password);
    if (ok) {
      navigate("/dashboard");
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <h1>Iniciar sesión</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Ingresar</button>
        </form>

        <div className="login-test-creds">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Usuario: <code>{testCreds.username}</code></p>
          <p>Contraseña: <code>{testCreds.password}</code></p>
        </div>
      </div>
    </Layout>
  );
};

export { Login };
