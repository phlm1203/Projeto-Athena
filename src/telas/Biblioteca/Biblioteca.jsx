import Header from "../../components/Header/Header";
import StatCard from "../../components/StatCard/StatCard";
import Abas from "../../components/Abas/Abas";
import useSalvas from "../../hooks/useSalvas";
import GraficoTemas from "../../components/GraficoTemas/GraficoTemas";
import useBiblioteca from "../../hooks/useBiblioteca";
import ObraSalvaCard from "../../components/ObraSalvaCard/ObraSalvaCard";
import "./Biblioteca.css";

export default function Biblioteca() {
  const { salvas, carregando, erro, atualizarStatus } = useSalvas();
  const { abas, abaAtiva, setAbaAtiva, stats, obrasDaAba, temas } = useBiblioteca(salvas);

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
              abas={abas}
              ativa={abaAtiva}
              onMudar={setAbaAtiva}
              rotulo="Categorias de obras"
            />

            <div
              role="tabpanel"
              id={`painel-${abaAtiva}`}
              aria-labelledby={`aba-${abaAtiva}`}
            >
              {carregando ? <p role="status">Carregando obras salvas…</p> :
                erro ? <p role="alert">Não foi possível carregar suas obras.</p> : obrasDaAba.length === 0 ? (
                <p className="vazio">Nenhuma obra salva para exibir.</p>
              ) : (
                obrasDaAba.map((obra) => (
                  <ObraSalvaCard key={obra.id} obra={obra} onAtualizarStatus={atualizarStatus} />
                ))
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
