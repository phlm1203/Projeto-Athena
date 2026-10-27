import { useState } from "react";
import { Link } from "react-router-dom";
import "./ColecaoCard.css";

export default function ColecaoCard({ colecao, capa, onExcluir }) {
  const [confirmando, setConfirmando] = useState(false);
  const total = colecao.obras.length;

  return (
    <article className="cc">
      <Link to={`/colecoes/${colecao.id}`} tabIndex={-1} aria-hidden="true" className="cc-capa-link">
        {capa ? (
          <img className="cc-capa" src={capa} alt="" loading="lazy" />
        ) : (
          <div className="cc-capa cc-capa-vazia" />
        )}
      </Link>

      <div className="cc-corpo">
        <h2>{colecao.nome}</h2>
        {colecao.descricao && <p className="cc-desc">{colecao.descricao}</p>}
        <p className="cc-qtd">{total} {total === 1 ? "obra" : "obras"}</p>
      </div>

      <div className="cc-rodape">
        <Link to={`/colecoes/${colecao.id}`} className="cc-ver">
          Ver Coleção <span aria-hidden="true">→</span>
        </Link>

        {confirmando ? (
          <span className="cc-confirma" role="group" aria-label={`Confirmar exclusão de ${colecao.nome}`}>
            Excluir?
            <button type="button" onClick={onExcluir}>Sim</button>
            <button type="button" onClick={() => setConfirmando(false)}>Não</button>
          </span>
        ) : (
          <button
            type="button"
            className="cc-lixeira"
            aria-label={`Excluir coleção ${colecao.nome}`}
            onClick={() => setConfirmando(true)}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}