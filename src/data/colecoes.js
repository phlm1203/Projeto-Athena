import { obras } from "./obras";

export const colecoesIniciais = [
  {
    id: "tecnologia-vigilancia-sociedade",
    nome: "Tecnologia, vigilância e sociedade",
    descricao:
      "Privacidade, inteligência artificial, dependência tecnológica, influência dos algoritmos",
    obras: ["black-mirror", "o-show-de-truman"],
  },
  {
    id: "consumo-descarte-meio-ambiente",
    nome: "Consumo, descarte e meio ambiente",
    descricao:
      "Consumismo, resíduos, sustentabilidade e responsabilidade coletiva",
    obras: ["wall-e"],
  },
  {
    id: "desigualdade-classes-sociais",
    nome: "Desigualdade e classes sociais",
    descricao: "Abismo social, trabalho, mobilidade e exclusão",
    obras: ["parasita", "que-horas-ela-volta"],
  },
  {
    id: "saude-mental-pressao",
    nome: "Saúde mental e pressão social",
    descricao: "Produtividade, tempo, ansiedade e as exigências da vida moderna",
    obras: ["the-dark-side-of-the-moon"],
  },
];

// transforma a lista de ids da coleção nas obras de verdade (ignora ids que não existem mais)
export function obrasDaColecao(colecao) {
  return colecao.obras
    .map((id) => obras.find((o) => o.id === id))
    .filter(Boolean);
}