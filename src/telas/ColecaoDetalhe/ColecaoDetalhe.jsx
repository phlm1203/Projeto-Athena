import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ObraCard from "../../components/ObraCard/ObraCard";
import { useColecoes } from "../../hooks/useColecoes";
import { obras } from "../../data/obras";
import { obrasDaColecao } from "../../data/colecoes";
import "./ColecaoDetalhe.css";

const normalizar = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function ColecaoDetalhe() {
  const { id } = useParams();
  const store = useColecoes();
  const colecao = store.colecoes.find((c) => c.id === id);

  if (!colecao) {
    return (
      <>
        <Header />
        <main className="cd-vazio">
          <h1>Coleção não encontrada</h1>
          <p>Ela pode ter sido excluída.</p>
          <Link to="/colecoes">Voltar para Coleções</Link>
        </main>
      </>
    );
  }

  // o key reinicia os campos quando a pessoa troca de coleção
  return <Conteudo key={colecao.id} colecao={colecao} store={store} />;
}

function Conteudo({ colecao, store }) {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(colecao.nome);
  const [descricao, setDescricao] = useState(colecao.descricao ?? "");
  const [excluindo, setExcluindo] = useState(false);
  const [busca, setBusca] = useState("");

  const daColecao = obrasDaColecao(colecao);

  const termo = normalizar(busca.trim());
  const disponiveis = obras.filter(
    (o) =>
      !colecao.obras.includes(o.id) &&
      (!termo || normalizar([o.nome, o.autor, o.tipo, ...o.temas].join(" ")).includes(termo))
  );

  function salvarEdicao(e) {
    e.preventDefault();
    if (!nome.trim()) return;
    store.atualizar(colecao.id, { nome: nome.trim(), descricao: descricao.trim() });
    setEditando(false);
  }

  function cancelarEdicao() {
    setNome(colecao.nome);
    setDescricao(colecao.descricao ?? "");
    setEditando(false);
  }

  function excluirColecao() {
    store.excluir(colecao.id);
    navigate("/colecoes");
  }

  return (
    <>
      <Header />

      <main className="cd">
        <Link to="/colecoes" className="cd-voltar">← Coleções</Link>

        <section className="cd-topo">
          {editando ? (
            <form className="cd-form" onSubmit={salvarEdicao}>
              <label className="campo">
                Nome
                <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={60} required />
              </label>
              <label className="campo">
                Descrição
                <textarea rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} maxLength={160} />
              </label>
              <div className="cd-botoes">
                <button type="submit" className="btn btn-primario">Salvar</button>
                <button type="button" className="btn" onClick={cancelarEdicao}>Cancelar</button>
              </div>
            </form>
          ) : (
            <>
              <div>
                <h1>{colecao.nome}</h1>
                {colecao.descricao && <p className="cd-desc">{colecao.descricao}</p>}
              </div>

              <div className="cd-botoes">
                <button type="button" className="btn" onClick={() => setEditando(true)}>Editar</button>

                {excluindo ? (
                  <>
                    <span>Excluir esta coleção?</span>
                    <button type="button" className="btn btn-primario" onClick={excluirColecao}>Sim, excluir</button>
                    <button type="button" className="btn" onClick={() => setExcluindo(false)}>Cancelar</button>
                  </>
                ) : (
                  <button type="button" className="btn" onClick={() => setExcluindo(true)}>Excluir coleção</button>
                )}
              </div>
            </>
          )}
        </section>

        <section aria-labelledby="cd-obras-titulo">
          <h2 id="cd-obras-titulo">Obras da coleção ({daColecao.length})</h2>

          {daColecao.length > 0 ? (
            <ul className="cd-grade">
              {daColecao.map((obra) => (
                <li key={obra.id}>
                  <ObraCard obra={obra} />
                  <button
                    type="button"
                    className="cd-remover"
                    aria-label={`Remover ${obra.nome} da coleção`}
                    onClick={() => store.removerObra(colecao.id, obra.id)}
                  >
                    Remover da coleção
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cd-aviso">Esta coleção ainda está vazia. Adicione obras logo abaixo.</p>
          )}
        </section>

        <section className="cd-adicionar" aria-labelledby="cd-add-titulo">
          <h2 id="cd-add-titulo">Adicionar obras</h2>

          <label className="campo">
            <span className="sr-only">Buscar no catálogo</span>
            <input
              type="search"
              placeholder="Buscar no catálogo"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </label>

          {disponiveis.length > 0 ? (
            <ul className="cd-lista">
              {disponiveis.map((obra) => (
                <li key={obra.id}>
                  <img src={obra.imagem} alt="" loading="lazy" />
                  <div>
                    <strong>{obra.nome}</strong>
                    <span>{obra.tipo} - {obra.ano}</span>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    aria-label={`Adicionar ${obra.nome} à coleção`}
                    onClick={() => store.adicionarObra(colecao.id, obra.id)}
                  >
                    Adicionar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="cd-aviso">
              {termo ? "Nenhuma obra encontrada." : "Todas as obras do catálogo já estão nesta coleção."}
            </p>
          )}
        </section>
      </main>
    </>
  );
}