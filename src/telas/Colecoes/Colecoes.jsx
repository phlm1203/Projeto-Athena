import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ColecaoCard from "../../components/ColecaoCard/ColecaoCard";
import { useColecoes } from "../../hooks/useColecoes";
import { obrasDaColecao } from "../../data/colecoes";
import "./Colecoes.css";

export default function Colecoes() {
  const { colecoes, criar, excluir, restaurar } = useColecoes();
  const navigate = useNavigate();

  const [criando, setCriando] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  function enviar(e) {
    e.preventDefault();
    if (!nome.trim()) return;
    const id = criar({ nome, descricao });
    navigate(`/colecoes/${id}`); // já abre a coleção nova para a pessoa adicionar obras
  }

  function cancelar() {
    setCriando(false);
    setNome("");
    setDescricao("");
  }

  return (
    <>
      <Header />

      <main className="col">
        <div className="col-topo">
          <div>
            <h1>Coleções Temáticas</h1>
            <p>
              Explore listas organizadas por assuntos que estão entre os mais
              discutidos e podem aparecer no ENEM.
            </p>
          </div>

          {!criando && (
            <button type="button" className="btn btn-primario" onClick={() => setCriando(true)}>
              + Nova coleção
            </button>
          )}
        </div>

        {criando && (
          <form className="col-form" onSubmit={enviar}>
            <h2>Nova coleção</h2>

            <label className="campo">
              Nome
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                maxLength={60}
                placeholder="Ex.: Repertórios para saúde mental"
                required
                autoFocus
              />
            </label>

            <label className="campo">
              Descrição (opcional)
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                maxLength={160}
                placeholder="Sobre o que é essa coleção?"
              />
            </label>

            <div className="col-botoes">
              <button type="submit" className="btn btn-primario">Criar coleção</button>
              <button type="button" className="btn" onClick={cancelar}>Cancelar</button>
            </div>
          </form>
        )}

        {colecoes.length > 0 ? (
          <ul className="col-grade">
            {colecoes.map((colecao) => (
              <li key={colecao.id}>
                <ColecaoCard
                  colecao={colecao}
                  capa={obrasDaColecao(colecao)[0]?.imagem}
                  onExcluir={() => excluir(colecao.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="col-vazio">
            <p>Você não tem nenhuma coleção.</p>
            <p>Crie uma nova ou volte às coleções sugeridas.</p>
            <button type="button" className="btn" onClick={restaurar}>
              Restaurar coleções sugeridas
            </button>
          </div>
        )}
      </main>
    </>
  );
}