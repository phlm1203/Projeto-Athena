import { useMemo, useState } from "react";
import { useCatalogo } from "../context/CatalogoContext";

const MIDIAS_FIXAS = ["Filmes", "Séries e animes"];

export default function useBiblioteca(salvas) {
  const { obras } = useCatalogo();
  const [abaAtiva, setAbaAtiva] = useState("todas");

  const obrasSalvas = useMemo(
    () =>
      salvas
        .map((s) => {
          const obra = obras.find((o) => o.id === s.obraId);
          return obra ? { ...obra, status: s.status } : null;
        })
        .filter(Boolean),
    [salvas, obras]
  );

  const stats = useMemo(
    () => ({
      salvas: obrasSalvas.length,
      dominados: obrasSalvas.filter((o) => o.status === "dominado").length,
      revisao: obrasSalvas.filter((o) => o.status === "revisao").length,
    }),
    [obrasSalvas]
  );

  const obrasDaAba = useMemo(
    () => obrasSalvas.filter((o) => abaAtiva === "todas" || o.midia === abaAtiva),
    [obrasSalvas, abaAtiva]
  );

  const temas = useMemo(() => {
    const contagem = {};
    obrasSalvas.forEach((o) =>
      o.temas.forEach((t) => (contagem[t] = (contagem[t] || 0) + 1))
    );
    const total = Object.values(contagem).reduce((a, b) => a + b, 0);
    return Object.entries(contagem).map(([nome, qtd]) => ({
      nome,
      valor: qtd,
      porcentagem: total ? Math.round((qtd / total) * 100) : 0,
    }));
  }, [obrasSalvas]);

  const abas = [
    { id: "todas", label: "Todas" },
    ...[...new Set([...MIDIAS_FIXAS, ...obrasSalvas.map((obra) => obra.midia).filter(Boolean)])]
      .map((midia) => ({ id: midia, label: midia })),
  ];

  return { abas, abaAtiva, setAbaAtiva, stats, obrasDaAba, temas };
}
