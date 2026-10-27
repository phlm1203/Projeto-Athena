import { Routes, Route, Link } from "react-router-dom";

import LPAthena from "./telas/LP-Athena/LP-Athena";
import Auth from "./telas/Auth/Auth";
import Explorar from "./telas/Explorar/Explorar";
import Obra from "./telas/Obra/Obra";
import Colecoes from "./telas/Colecoes/Colecoes";
import Biblioteca from "./telas/Biblioteca/Biblioteca";
import Perfil from "./telas/Perfil/Perfil";
import RotaProtegida from "./components/RotaProtegida/RotaProtegida";
import ColecaoDetalhe from "./telas/ColecaoDetalhe/ColecaoDetalhe";

export default function App() {
  return (
    <Routes>
      {/* públicas */}
      <Route path="/" element={<LPAthena />} />
      <Route path="/entrar" element={<Auth modo="entrar" />} />
      <Route path="/cadastro" element={<Auth modo="cadastrar" />} />
      <Route path="/explorar" element={<Explorar />} />
      <Route path="/obra/:id" element={<Obra />} />
      <Route path="/colecoes" element={<Colecoes />} />
      <Route path="/colecoes/:id" element={<ColecaoDetalhe />} />

      {/* só para quem está logado */}
      <Route
        path="/biblioteca"
        element={<RotaProtegida><Biblioteca /></RotaProtegida>}
      />
      <Route
        path="/perfil"
        element={<RotaProtegida><Perfil /></RotaProtegida>}
      />

      {/* qualquer outro endereço */}
      <Route
        path="*"
        element={
          <main style={{ padding: 40, textAlign: "center" }}>
            <h1>Página não encontrada</h1>
            <p><Link to="/">Voltar para o início</Link></p>
          </main>
        }
      />
    </Routes>
  );
}