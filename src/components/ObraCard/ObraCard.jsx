import { Link } from "react-router-dom";
import Tag from "../Tag/Tag";
import "./ObraCard.css";

export default function ObraCard({ obra }) {
  return (
    <Link to={`/obra/${obra.id}`} className="obra-card">
      <div className="obra-card__imagem">
        {obra.imagem ? (
          <img src={obra.imagem} alt={`Capa de ${obra.nome}`} loading="lazy" />
        ) : (
          <div className="obra-card__vazia" aria-hidden="true" />
        )}
      </div>

      <div className="obra-card__corpo">
        <h3 className="obra-card__titulo">{obra.nome}</h3>
        <p className="obra-card__meta">{obra.tipo} · {obra.ano}</p>

        <div className="obra-card__tags">
          {obra.temas.slice(0, 3).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}