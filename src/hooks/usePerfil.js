import { useMemo } from "react";
import { obras } from "../data/obras";

export default function usePerfil(salvas) {
  return useMemo(() => {
    const itens = salvas
      .map((s) => {
        const obra = obras.find((o) => o.id === s.obraId);
        return obra ? { ...obra, status: s.status, salvaEm: s.salvaEm } : null;
      })
      .filter(Boolean);

    const temas = new Set();
    itens.forEach((o) => o.temas.forEach((t) => temas.add(t)));

    // salvaEm vazio = acabou de salvar, então vem primeiro
    const quando = (o) => o.salvaEm?.toMillis?.() ?? Date.now();
    const recentes = [...itens].sort((a, b) => quando(b) - quando(a)).slice(0, 5);

    return {
      totalSalvas: itens.length,
      totalTemas: temas.size,
      recentes,
    };
  }, [salvas]);
}