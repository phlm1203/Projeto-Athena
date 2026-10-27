import { PieChart, Pie, Cell } from "recharts";
import "./GraficoTemas.css";

const CORES = ["#9ca3af", "#f97316", "#4ade80", "#2563eb", "#ef4444", "#52525b"];

export default function GraficoTemas({ dados }) {
  if (dados.length === 0) return <p>Sem dados ainda.</p>;

  return (
    <div className="grafico">
      <PieChart width={150} height={150}>
        <Pie data={dados} dataKey="valor" innerRadius={42} outerRadius={70} stroke="none">
          {dados.map((d, i) => (
            <Cell key={d.nome} fill={CORES[i % CORES.length]} />
          ))}
        </Pie>
      </PieChart>

      <ul className="grafico__legenda">
        {dados.map((d, i) => (
          <li key={d.nome}>
            <span className="grafico__bolinha" style={{ background: CORES[i % CORES.length] }} />
            <span className="grafico__nome">{d.nome}</span>
            <strong>{d.porcentagem}%</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}