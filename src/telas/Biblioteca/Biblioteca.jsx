import Header from "../../components/Header/Header";
import StatCard from "../../components/StatCard/StatCard";
import Abas from "../../components/Abas/Abas";
import ObraCard from "../../components/ObraCard/ObraCard";
import GraficoTemas from "../../components/GraficoTemas/GraficoTemas";
import useBiblioteca from "../../hooks/useBiblioteca";
import ObraSalvaCard from "../../components/ObraSalvaCard/ObraSalvaCard";
import "./Biblioteca.css";

const ABAS = [
  { id: "filmes", label: "Filmes" },
  { id: "series", label: "Séries e animes" },
  { id: "musicas", label: "Músicas" },
  { id: "jogos", label: "Jogos" },
  { id: "documentarios", label: "Documentários" },
];

const SALVAS_MOCK = [
  { obraId: 1, status: "dominado" },
  { obraId: 2, status: "revisao" },
];

export default function Biblioteca() {
  const { abaAtiva, setAbaAtiva, stats, obrasDaAba, temas } =
    useBiblioteca(SALVAS_MOCK);

  return (
    <>
      <Header />
      <main className="biblioteca">
        <h1>Minha Biblioteca</h1>
        <p className="biblioteca__sub">
          Organize seus repertórios, acompanhe seu progresso e revise quando quiser.
        </p>

        <section className="biblioteca__stats">
          <StatCard titulo="Obras salvas" valor={stats.salvas} />
          <StatCard titulo="Repertórios dominados" valor={stats.dominados} />
          <StatCard titulo="Revisão pendente" valor={stats.revisao} />
        </section>

        <section className="biblioteca__conteudo">
          <div className="painel">
            <h2>Minhas obras salvas</h2>

            <Abas
              abas={ABAS}
              ativa={abaAtiva}
              onMudar={setAbaAtiva}
              rotulo="Categorias de obras"
            />

            <div
              role="tabpanel"
              id={`painel-${abaAtiva}`}
              aria-labelledby={`aba-${abaAtiva}`}
            >
              {obrasDaAba.length === 0 ? (
                <p className="vazio">Nenhuma obra salva nesta categoria ainda.</p>
              ) : (
                obrasDaAba.map((obra) => <ObraSalvaCard key={obra.id} obra={obra} />)
              )}
            </div>
          </div>

          <aside className="painel">
            <h2>Temas estudados</h2>
            <GraficoTemas dados={temas} />
          </aside>
        </section>
      </main>
    </>
  );
}