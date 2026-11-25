import { useState } from "react";
import Tag from "../Tag/Tag";
import "./ObraSalvaCard.css";

const STATUS = {
  dominado: { texto: "Dominado", classe: "obra-salva__status--ok" },
  revisao: { texto: "Em revisão", classe: "obra-salva__status--revisao" },
};

export default function ObraSalvaCard({ obra, onAtualizarStatus }) {
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(false);
  const status = STATUS[obra.status];
  const dominado = obra.status === "dominado";
  const acao = dominado ? "Voltar para revisão" : "Marcar como dominado";

  async function alternarStatus() {
    setSalvando(true);
    setErro(false);
    try {
      await onAtualizarStatus(obra.id, dominado ? "revisao" : "dominado");
    } catch {
      setErro(true);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <article className="obra-salva">
      <img className="obra-salva__capa" src={obra.imagem} alt={`Capa de ${obra.nome}`} />

      <div className="obra-salva__info">
        <h3>{obra.nome}</h3>
        <p>{obra.tipo} · {obra.ano}</p>
        <div className="obra-salva__tags">
          {obra.temas.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>

      <div className="obra-salva__acoes">
        {status && (
          <span className={`obra-salva__status ${status.classe}`}>{status.texto}</span>
        )}
        <button
          type="button"
          className="btn"
          disabled={salvando}
          aria-label={`${acao} — ${obra.nome}`}
          onClick={alternarStatus}
        >
          {salvando ? "Salvando…" : acao}
        </button>
        {erro && <p role="alert">Não foi possível alterar o status.</p>}
      </div>
    </article>
  );
}
