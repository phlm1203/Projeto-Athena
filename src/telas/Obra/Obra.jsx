import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Abas from "../../components/Abas/Abas";
import Tag from "../../components/Tag/Tag";
import { obras } from "../../data/obras";
import "./Obra.css";

const ABAS = [
  { id: "visao-geral", label: "Visão geral" },
  { id: "exemplo", label: "Exemplo de aplicação" },
  { id: "limitacao", label: "Limitação" },
];

const ROTULO_AUTOR = { "Álbum": "Artista", Filme: "Direção", "Série": "Criação" };
const EM_BREVE = "Conteúdo em breve.";
const CHAVE_SALVAS = "athena_obras_salvas";

function lerSalvas() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SALVAS)) ?? [];
  } catch {
    return [];
  }
}

export default function Obra() {
  const { id } = useParams();
  const obra = obras.find((o) => o.id === id);

  if (!obra) {
    return (
      <>
        <Header />
        <main className="ob-vazio">
          <h1>Obra não encontrada</h1>
          <p>Esse endereço não corresponde a nenhuma obra do catálogo.</p>
          <Link to="/explorar">Voltar para Explorar</Link>
        </main>
      </>
    );
  }

  // o key faz a aba e o "salvo" recomeçarem quando a pessoa troca de obra
  return <ObraConteudo key={obra.id} obra={obra} />;
}

function ObraConteudo({ obra }) {
  const [aba, setAba] = useState("visao-geral");
  const [salva, setSalva] = useState(() => lerSalvas().includes(obra.id));
  const [aviso, setAviso] = useState("");

  const rotulo = ROTULO_AUTOR[obra.tipo] ?? "Autoria";
  const assuntos = obra.assuntos ?? obra.temas;

  function mostrarAviso(texto) {
    setAviso(texto);
    setTimeout(() => setAviso(""), 2200);
  }

  function alternarSalva() {
    const atuais = lerSalvas();
    const novas = salva ? atuais.filter((x) => x !== obra.id) : [...atuais, obra.id];
    try {
      localStorage.setItem(CHAVE_SALVAS, JSON.stringify(novas));
    } catch {
      /* armazenamento indisponível: segue só na tela */
    }
    setSalva(!salva);
    mostrarAviso(salva ? "Removida da biblioteca" : "Salva na biblioteca");
  }

  async function compartilhar() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: obra.nome, url });
      } else {
        await navigator.clipboard.writeText(url);
        mostrarAviso("Link copiado");
      }
    } catch {
      /* a pessoa cancelou o compartilhamento */
    }
  }

  return (
    <>
      <Header />

      <main>
        <section
          className="ob-hero"
          style={{ "--banner": `url(${obra.banner ?? obra.imagem})` }}
        >
          <div className="ob-hero-acoes">
            <span className="ob-aviso" role="status">{aviso}</span>

            <button
              type="button"
              className="ob-icone"
              aria-pressed={salva}
              aria-label={salva ? "Remover da biblioteca" : "Salvar na biblioteca"}
              onClick={alternarSalva}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 3h12v18l-6-4-6 4z" />
              </svg>
            </button>

            <button type="button" className="ob-icone" aria-label="Compartilhar" onClick={compartilhar}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="18" cy="5" r="2.5" />
                <circle cx="6" cy="12" r="2.5" />
                <circle cx="18" cy="19" r="2.5" />
                <path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4" />
              </svg>
            </button>
          </div>

          <div className="ob-hero-texto">
            <ul className="ob-meta">
              <Tag>{obra.tipo}</Tag>
              <Tag>{obra.ano}</Tag>
            </ul>

            <h1>{obra.nome}</h1>
            <p className="ob-autor">{rotulo}: {obra.autor}</p>

            {obra.descricaoCurta && <p className="ob-resumo">{obra.descricaoCurta}</p>}

            <ul className="ob-assuntos">
              {assuntos.map((assunto) => (
                <Tag key={assunto}>{assunto}</Tag>
              ))}
            </ul>
          </div>
        </section>

        <Abas abas={ABAS} ativa={aba} onMudar={setAba} />

        <div
          className="ob-conteudo"
          role="tabpanel"
          id={`painel-${aba}`}
          aria-labelledby={`aba-${aba}`}
          tabIndex={0}
        >
          {aba === "visao-geral" && (
            <div className="ob-grade">
              <section className="ob-card">
                <h2>Ficha técnica e sinopse</h2>
                <p>{rotulo}: {obra.autor}</p>
                <p>Lançamento: {obra.ano}</p>
                {obra.genero && <p>Gênero: {obra.genero}</p>}
                <p>{obra.sinopse ?? EM_BREVE}</p>
              </section>

              <section className="ob-card">
                <h2>Por que usar como repertório?</h2>
                <p>{obra.porQueUsar ?? EM_BREVE}</p>

                <hr className="ob-divisor" />

                <h2>Relação com temas de redação</h2>
                <p>{obra.relacaoTemas ?? EM_BREVE}</p>
              </section>
            </div>
          )}

          {aba === "exemplo" && (
            <section className="ob-card">
              <h2>Exemplo de aplicação na redação</h2>
              {obra.exemploTema && (
                <p className="ob-tema">Tema: {obra.exemploTema}</p>
              )}
              {obra.exemploAplicacao ? (
                <blockquote className="ob-citacao">
                  <p>{obra.exemploAplicacao}</p>
                </blockquote>
              ) : (
                <p>{EM_BREVE}</p>
              )}
            </section>
          )}

          {aba === "limitacao" && (
            <section className="ob-card">
              <h2>Limitações deste repertório</h2>
              <p>{obra.limitacao ?? EM_BREVE}</p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}