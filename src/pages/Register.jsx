import { useState } from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Register.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Debes completar todos los campos");
      return;
    }

    if (username.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const newUser = { username, email, password };
    const ok = await register(newUser);
    if (ok) {
      setSuccess("Usuario registrado con éxito");
      setTimeout(() => navigate("/"), 1000);
    }
  };

  return (
    <Layout>
      <div className="register-page">
        <div className="register-card">
          <h2>Registrate</h2>
          <p>Crea tu cuenta para acceder a todas las funcionalidades</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingresa tu nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button type="submit" className="btn-submit">Crear cuenta</button>
          </form>
          <p className="login-link">
            ¿Ya tenés una cuenta? <span onClick={() => navigate("/login")}>Iniciar sesión</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export { Register };
