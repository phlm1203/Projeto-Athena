import { useState } from "react";
import { colecoesIniciais } from "../data/colecoes";

const CHAVE = "athena_colecoes";

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    return Array.isArray(salvo) ? salvo : colecoesIniciais;
  } catch {
    return colecoesIniciais;
  }
}

export function useColecoes() {
  const [colecoes, setColecoes] = useState(carregar);

  function salvar(novas) {
    setColecoes(novas);
    try {
      localStorage.setItem(CHAVE, JSON.stringify(novas));
    } catch {
      /* sem armazenamento: as mudanças valem só até recarregar a página */
    }
  }

  function criar({ nome, descricao }) {
    const nova = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      descricao: descricao.trim(),
      obras: [],
    };
    salvar([nova, ...colecoes]);
    return nova.id;
  }

  function excluir(id) {
    salvar(colecoes.filter((c) => c.id !== id));
  }

  function atualizar(id, campos) {
    salvar(colecoes.map((c) => (c.id === id ? { ...c, ...campos } : c)));
  }

  function adicionarObra(id, obraId) {
    salvar(
      colecoes.map((c) =>
        c.id === id && !c.obras.includes(obraId)
          ? { ...c, obras: [...c.obras, obraId] }
          : c
      )
    );
  }

  function removerObra(id, obraId) {
    salvar(
      colecoes.map((c) =>
        c.id === id ? { ...c, obras: c.obras.filter((o) => o !== obraId) } : c
      )
    );
  }

  function restaurar() {
    salvar(colecoesIniciais);
  }

  return { colecoes, criar, excluir, atualizar, adicionarObra, removerObra, restaurar };
}