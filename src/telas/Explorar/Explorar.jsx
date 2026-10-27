import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import FiltroSlideBar from "../../components/FiltroSlideBar/FiltroSlideBar";
import ObraCard from "../../components/ObraCard/ObraCard";
import { obras } from "../../data/obras";
import { temasSociais, ordenacoes } from "../../data/filtros";
import "./Explorar.css";

// tira acentos e maiúsculas para a busca não falhar por detalhe
const normalizar = (texto) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const FILTROS_VAZIOS = { midia: [], temas: [], areas: [] };

export default function Explorar() {
  const [params] = useSearchParams();

  const [busca, setBusca] = useState(params.get("busca") ?? "");
  const [ordem, setOrdem] = useState("relevantes");
  const [filtros, setFiltros] = useState(() => {
    // chegou da tela Início clicando num assunto, ex.: /explorar?tema=Tecnologia
    const tema = params.get("tema");
    const inicial = tema
      ? temasSociais.find((t) => normalizar(t).includes(normalizar(tema)))
      : null;
    return { ...FILTROS_VAZIOS, temas: inicial ? [inicial] : [] };
  });

  function alternar(grupo, valor) {
    setFiltros((atual) => {
      const lista = atual[grupo];
      return {
        ...atual,
        [grupo]: lista.includes(valor)
          ? lista.filter((v) => v !== valor)
          : [...lista, valor],
      };
    });
  }

  function limparGrupo(grupo) {
    setFiltros((atual) => ({ ...atual, [grupo]: [] }));
  }

  function limparTudo() {
    setFiltros(FILTROS_VAZIOS);
    setBusca("");
  }

  const resultados = useMemo(() => {
    const termo = normalizar(busca.trim());

    const lista = obras.filter((obra) => {
      if (filtros.midia.length && !filtros.midia.includes(obra.midia)) return false;
      if (filtros.temas.length && !obra.categorias.some((c) => filtros.temas.includes(c))) return false;
      if (filtros.areas.length && !obra.areas.some((a) => filtros.areas.includes(a))) return false;

      if (termo) {
        const texto = normalizar(
          [obra.nome, obra.autor, obra.tipo, ...obra.temas, ...obra.categorias].join(" ")
        );
        if (!texto.includes(termo)) return false;
      }
      return true;
    });

    if (ordem === "recentes") return [...lista].sort((a, b) => b.ano - a.ano);
    if (ordem === "antigos") return [...lista].sort((a, b) => a.ano - b.ano);
    if (ordem === "az") return [...lista].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    return lista;
  }, [busca, filtros, ordem]);

  return (
    <>
      <Header />

      <div className="ex">
        <FiltroSlideBar
          filtros={filtros}
          onAlternar={alternar}
          onLimparGrupo={limparGrupo}
        />

        <main className="ex-conteudo">
          <h1 className="sr-only">Explorar repertórios</h1>

          <form className="ex-busca" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="ex-busca-campo" className="sr-only">
              Buscar obra, artista ou tema
            </label>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              id="ex-busca-campo"
              type="search"
              placeholder="Busque uma obra, artista ou tema"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </form>

          <div className="ex-topo">
            <p className="ex-contagem" role="status">
              Mostrando {resultados.length}{" "}
              {resultados.length === 1 ? "resultado" : "resultados"}
            </p>

            <label className="ex-ordem">
              <span className="sr-only">Ordenar por</span>
              <select value={ordem} onChange={(e) => setOrdem(e.target.value)}>
                {ordenacoes.map((o) => (
                  <option key={o.valor} value={o.valor}>{o.label}</option>
                ))}
              </select>
            </label>
          </div>

          {resultados.length > 0 ? (
            <ul className="ex-grade">
              {resultados.map((obra) => (
                <li key={obra.id}>
                  <ObraCard obra={obra} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="ex-vazio">
              <p>Nenhuma obra encontrada.</p>
              <p>Tente remover algum filtro ou buscar por outro termo.</p>
              <button type="button" onClick={limparTudo}>Limpar filtros</button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}