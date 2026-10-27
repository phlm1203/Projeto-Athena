import { useMemo, useState } from "react";
import { obras } from "../data/obras";

export default function useBiblioteca(salvas) {
  const [abaAtiva, setAbaAtiva] = useState("filmes");

  const obrasSalvas = useMemo(
    () =>
      salvas
        .map((s) => {
          const obra = obras.find((o) => o.id === s.obraId);
          return obra ? { ...obra, status: s.status } : null;
        })
        .filter(Boolean),
    [salvas]
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
    () => obrasSalvas.filter((o) => o.categoria === abaAtiva),
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

  return { abaAtiva, setAbaAtiva, stats, obrasDaAba, temas };
}