import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RotaProtegida({ children }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <p>Carregando...</p>;  
  if (!usuario) return <Navigate to="/entrar" replace />;

  return children;
}