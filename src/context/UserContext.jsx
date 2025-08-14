import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN usando credenciales reales o de prueba
  const login = async (username, password) => {
    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) return false;

      const data = await response.json();
      console.log("Login OK:", data);

      // Simulamos sesión activa
      setUser({ username });
      return true;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  // REGISTRO SIMPLIFICADO
  const register = async (newUser) => {
    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) return false;

      const data = await response.json();
      console.log("Usuario registrado:", data);

      // Simulamos que el usuario ya está logueado
      setUser({ username: newUser.username });
      return true;
    } catch (error) {
      console.error("Error en registro:", error);
      return false;
    }
  };

  // CERRAR SESIÓN
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ login, register, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

const useAuth = () => useContext(UserContext);

export { UserProvider, useAuth };