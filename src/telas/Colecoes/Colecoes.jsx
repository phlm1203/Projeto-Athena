import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ColecaoCard from "../../components/ColecaoCard/ColecaoCard";
import { useColecoes } from "../../hooks/useColecoes";
import { obrasDaColecao, useCatalogo } from "../../context/CatalogoContext";
import "./Colecoes.css";

export default function Colecoes() {
  const { obras } = useCatalogo();
  const { colecoes, criar, excluir, carregando, erro, tentarNovamente } = useColecoes();
  const [falha, setFalha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const navigate = useNavigate();

  const [criando, setCriando] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  async function enviar(e) {
    e.preventDefault();
    if (!nome.trim() || salvando) return;
    setSalvando(true);
    setFalha("");
    try {
      const id = await criar({ nome, descricao });
      navigate(`/colecoes/${id}`);
    } catch {
      setFalha("Não foi possível criar a coleção.");
    } finally {
      setSalvando(false);
    }
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
        {falha && <p role="alert">{falha}</p>}
        {carregando && <p role="status">Carregando suas coleções…</p>}
        {erro && <p role="alert">Não foi possível carregar suas coleções. <button onClick={tentarNovamente}>Tentar novamente</button></p>}
        <div className="col-topo">
          <div>
            <h1>Minhas coleções</h1>
            <p>
              Organize suas obras em listas pessoais.
            </p>
          </div>

          {!criando && !carregando && !erro && (
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
              <button type="submit" disabled={salvando} className="btn btn-primario">Criar coleção</button>
              <button type="button" className="btn" onClick={cancelar}>Cancelar</button>
            </div>
          </form>
        )}

        {!carregando && !erro && (colecoes.length > 0 ? (
          <ul className="col-grade">
            {colecoes.map((colecao) => (
              <li key={colecao.id}>
                <ColecaoCard
                  colecao={colecao}
                  capa={obrasDaColecao(colecao, obras)[0]?.imagem}
                  onExcluir={() => excluir(colecao.id).catch(() => setFalha("Não foi possível excluir a coleção."))}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="col-vazio">
            <p>Você não tem nenhuma coleção.</p>
          </div>
        ))}
      </main>
    </>
  );
}