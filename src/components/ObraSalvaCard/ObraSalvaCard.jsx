import Tag from "../Tag/Tag";
import "./ObraSalvaCard.css";

const STATUS = {
  dominado: { texto: "Dominado", classe: "obra-salva__status--ok" },
  revisao: { texto: "Em revisão", classe: "obra-salva__status--revisao" },
};

export default function ObraSalvaCard({ obra }) {
  const status = STATUS[obra.status];

  return (
    <article className="obra-salva">
      <img className="obra-salva__capa" src={obra.capa} alt={`Capa de ${obra.titulo}`} />

      <div className="obra-salva__info">
        <h3>{obra.titulo}</h3>
        <p>{obra.tipo} · {obra.ano}</p>
        <div className="obra-salva__tags">
          {obra.temas.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>

      {status && (
        <span className={`obra-salva__status ${status.classe}`}>{status.texto}</span>
      )}
    </article>
  );
}