import "./Abas.css";

export default function Abas({ abas, ativa, onMudar, rotulo = "Seções da obra" }) {
  // setas do teclado trocam de aba
  function aoTeclar(e, indice) {
    let novo = null;
    if (e.key === "ArrowRight") novo = (indice + 1) % abas.length;
    if (e.key === "ArrowLeft") novo = (indice - 1 + abas.length) % abas.length;
    if (novo === null) return;
    e.preventDefault();
    onMudar(abas[novo].id);
    document.getElementById(`aba-${abas[novo].id}`)?.focus();
  }

  return (
    <div className="abas" role="tablist" aria-label={rotulo}>
      {abas.map((aba, i) => (
        <button
          key={aba.id}
          id={`aba-${aba.id}`}
          type="button"
          role="tab"
          className="abas-botao"
          aria-selected={ativa === aba.id}
          aria-controls={`painel-${aba.id}`}
          tabIndex={ativa === aba.id ? 0 : -1}
          onClick={() => onMudar(aba.id)}
          onKeyDown={(e) => aoTeclar(e, i)}
        >
          {aba.label}
        </button>
      ))}
    </div>
  );
}