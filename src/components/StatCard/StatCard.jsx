import "./StatCard.css";

export default function StatCard({ titulo, valor, icone }) {
  return (
    <div className="stat-card">
      <div className="stat-card__topo">
        {icone && <span className="stat-card__icone">{icone}</span>}
        <span className="stat-card__titulo">{titulo}</span>
      </div>
      <strong className="stat-card__valor">{valor}</strong>
    </div>
  );
}