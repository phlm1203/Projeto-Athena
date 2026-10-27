import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import Header from "../../components/Header/Header";
import { auth } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import useSalvas from "../../hooks/useSalvas";
import usePerfil from "../../hooks/usePerfil";
import { colecoesIniciais, obrasDaColecao } from "../../data/colecoes";
import { tempoRelativo } from "../../utils/tempoRelativo";
import "./Perfil.css";

const STATUS = {
  dominado: { texto: "Dominado", classe: "perfil-status--ok" },
  revisao: { texto: "Em revisão", classe: "perfil-status--revisao" },
};

function PerfilStat({ valor, rotulo, cor }) {
  return (
    <div className="perfil-stat">
      <div className="perfil-stat__linha">
        <span className="perfil-stat__icone" style={{ "--cor": cor }} aria-hidden="true" />
        <strong className="perfil-stat__valor">{valor}</strong>
      </div>
      <span className="perfil-stat__rotulo">{rotulo}</span>
    </div>
  );
}

function ColecaoMini({ colecao }) {
  const itens = obrasDaColecao(colecao);   // só obras que existem de verdade
  const qtd = itens.length;
  const imagem = itens[0]?.imagem;         // capa = imagem da primeira obra

  return (
    <Link to={`/colecoes/${colecao.id}`} className="perfil-colecao">
      {imagem ? (
        <img src={imagem} alt="" />
      ) : (
        <span className="perfil-colecao__vazia" aria-hidden="true" />
      )}
      <div>
        <strong>{colecao.nome}</strong>
        <span>{qtd} {qtd === 1 ? "obra" : "obras"}</span>
      </div>
    </Link>
  );
}

export default function Perfil() {
  const { usuario, sair } = useAuth();
  const { salvas } = useSalvas();
  const { totalSalvas, totalTemas, recentes } = usePerfil(salvas);
  const navigate = useNavigate();

  const [nome, setNome] = useState(usuario?.displayName || "Estudante");
  const [editando, setEditando] = useState(false);
  const [rascunho, setRascunho] = useState(nome);
  const [erro, setErro] = useState("");

  async function salvarNome(e) {
    e.preventDefault();
    const novo = rascunho.trim();
    if (!novo) return;
    try {
      await updateProfile(auth.currentUser, { displayName: novo });
      setNome(novo);
      setEditando(false);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("Não foi possível salvar o nome.");
    }
  }

  async function aoSair() {
    await sair();
    navigate("/");
  }

  return (
    <>
      <Header />
      <main className="perfil">
        {/* topo: avatar + dados */}
        <section className="perfil-painel perfil__topo">
          <div className="perfil__avatar">
            {usuario?.photoURL ? (
              <img src={usuario.photoURL} alt={`Foto de ${nome}`} referrerPolicy="no-referrer" />
            ) : (
              <span aria-hidden="true">{nome.charAt(0).toUpperCase()}</span>
            )}
          </div>

          <div className="perfil__dados">
            {editando ? (
              <form onSubmit={salvarNome} className="perfil__form-nome">
                <input
                  value={rascunho}
                  onChange={(e) => setRascunho(e.target.value)}
                  aria-label="Nome"
                  maxLength={40}
                  autoFocus
                />
                <button type="submit" className="perfil-botao">Salvar</button>
                <button
                  type="button"
                  className="perfil-botao perfil-botao--suave"
                  onClick={() => { setEditando(false); setRascunho(nome); }}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <h1>{nome}</h1>
                <p className="perfil__email">{usuario?.email}</p>
                <button
                  type="button"
                  className="perfil-botao perfil-botao--suave"
                  onClick={() => { setRascunho(nome); setEditando(true); }}
                >
                  Editar perfil
                </button>
              </>
            )}
            {erro && <p role="alert" className="perfil__erro">{erro}</p>}
          </div>

          <div className="perfil__acoes">
            <button type="button" className="perfil-botao perfil-botao--suave">
              Configurações
            </button>
            <button type="button" className="perfil-botao perfil-botao--suave" onClick={aoSair}>
              Sair
            </button>
          </div>
        </section>

        <div className="perfil__grade">
          <div className="perfil__principal">
            {/* números */}
            <section className="perfil__stats" aria-label="Resumo">
              <PerfilStat valor={totalSalvas} rotulo="Obras salvas" cor="#b91c1c" />
              <PerfilStat valor={colecoesIniciais.length} rotulo="Coleções criadas" cor="#a16207" />
              <PerfilStat valor={totalTemas} rotulo="Temas em estudo" cor="#6d28d9" />
            </section>

            {/* atividade recente */}
            <section className="perfil-painel">
              <header className="perfil-painel__cab">
                <h2>Atividade recente</h2>
                <Link to="/biblioteca">Ver todas →</Link>
              </header>

              {recentes.length === 0 ? (
                <p className="perfil__vazio">
                  Você ainda não salvou nenhuma obra.{" "}
                  <Link to="/explorar">Explorar obras</Link>
                </p>
              ) : (
                <ul className="perfil__lista">
                  {recentes.map((obra) => {
                    const status = STATUS[obra.status];
                    return (
                      <li key={obra.id}>
                        <Link to={`/obra/${obra.id}`} className="perfil-atividade">
                          {obra.imagem ? (
                            <img src={obra.imagem} alt="" />
                          ) : (
                            <span className="perfil-atividade__vazia" aria-hidden="true" />
                          )}
                          <div className="perfil-atividade__info">
                            <strong>{obra.nome}</strong>
                            <span>{obra.tipo} · {obra.ano}</span>
                            {status && (
                              <em className={`perfil-status ${status.classe}`}>{status.texto}</em>
                            )}
                          </div>
                          <time className="perfil-atividade__tempo">
                            {tempoRelativo(obra.salvaEm)}
                          </time>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>

          {/* coleções */}
          <aside className="perfil-painel">
            <header className="perfil-painel__cab">
              <h2>Coleções</h2>
              <Link to="/colecoes">Ver todas →</Link>
            </header>

            <div className="perfil__colecoes">
              {colecoesIniciais.slice(0, 4).map((c) => (
                <ColecaoMini key={c.id} colecao={c} />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}