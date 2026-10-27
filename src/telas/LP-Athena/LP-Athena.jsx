import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ObraCard from "../../components/ObraCard/ObraCard";
import { obras } from "../../data/obras";
import { assuntos } from "../../data/filtros";
import "./LP-Athena.css";

export default function LPAthena() {
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();
  const destaques = obras.filter((obra) => obra.destaque);

  function buscar(e) {
    e.preventDefault();
    const termo = busca.trim();
    navigate(termo ? `/explorar?busca=${encodeURIComponent(termo)}` : "/explorar");
  }

  return (
    <>
      <Header />

      <main>
        <section className="lp-hero">
          <div className="lp-hero-texto">
            <h1>
              Cultura que
              <br />
              <em>vira argumento.</em>
            </h1>
            <p>
              Explore filmes, séries, jogos, músicas e muito mais, e descubra como
              essas obras podem enriquecer sua redação do ENEM.
            </p>
          </div>

          <form className="lp-busca" role="search" onSubmit={buscar}>
            <label htmlFor="lp-busca-campo" className="sr-only">
              Buscar obra, artista ou tema
            </label>
            <svg className="lp-busca-icone" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              id="lp-busca-campo"
              type="search"
              placeholder="Busque uma obra, artista ou tema"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </form>
        </section>

        <section className="lp-assuntos" aria-labelledby="lp-assuntos-titulo">
          <h2 id="lp-assuntos-titulo">Explore por assunto</h2>
          <ul>
            {assuntos.map((assunto) => (
              <li key={assunto}>
                <Link to={`/explorar?tema=${encodeURIComponent(assunto)}`}>{assunto}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="lp-destaques" aria-labelledby="lp-destaques-titulo">
          <div className="lp-destaques-topo">
            <h2 id="lp-destaques-titulo">Repertórios em destaque</h2>
            <Link to="/explorar" className="lp-ver-todos">
              Ver todos <span aria-hidden="true">›</span>
            </Link>
          </div>

          <ul className="lp-destaques-grade">
            {destaques.map((obra) => (
              <li key={obra.id}>
                <ObraCard obra={obra} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}