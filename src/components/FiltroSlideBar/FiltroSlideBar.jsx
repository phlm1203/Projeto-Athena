import { tiposMidia, temasSociais, areasConhecimento } from "../../data/filtros";
import "./FiltroSlideBar.css";

const GRUPOS = [
  { chave: "midia", titulo: "Tipos de Mídia", todas: "Todas as mídias", opcoes: tiposMidia },
  { chave: "temas", titulo: "Temas sociais", todas: "Todos os temas", opcoes: temasSociais },
  { chave: "areas", titulo: "Áreas do Conhecimento", todas: "Todas as áreas", opcoes: areasConhecimento },
];

export default function FiltroSlideBar({ filtros, onAlternar, onLimparGrupo }) {
  return (
    <aside className="filtro" aria-label="Filtros">
      <h2 className="filtro-titulo">Filtros</h2>

      {GRUPOS.map((grupo) => {
        const selecionados = filtros[grupo.chave];
        return (
          <fieldset key={grupo.chave} className="filtro-grupo">
            <legend>{grupo.titulo}</legend>

            <label>
              <input
                type="checkbox"
                checked={selecionados.length === 0}
                onChange={() => onLimparGrupo(grupo.chave)}
              />
              {grupo.todas}
            </label>

            {grupo.opcoes.map((opcao) => (
              <label key={opcao}>
                <input
                  type="checkbox"
                  checked={selecionados.includes(opcao)}
                  onChange={() => onAlternar(grupo.chave, opcao)}
                />
                {opcao}
              </label>
            ))}
          </fieldset>
        );
      })}
    </aside>
  );
}