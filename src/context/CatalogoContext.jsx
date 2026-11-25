import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocsFromServer } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import { db } from "../firebase";

const CatalogoContext = createContext(null);

async function carregarColecao(nome) {
  const snapshot = await getDocsFromServer(collection(db, nome));
  return snapshot.docs
    .map((documento) => ({ ...documento.data(), id: documento.id }))
    .sort((a, b) => (a.ordem ?? Infinity) - (b.ordem ?? Infinity) || a.id.localeCompare(b.id));
}

export function CatalogoLayout() {
  const [catalogo, setCatalogo] = useState(null);
  const [erro, setErro] = useState(false);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    Promise.all(["obras", "colecoes", "filtros"].map(carregarColecao))
      .then(([obras, colecoesIniciais, grupos]) => {
        if (!ativo) return;
        const filtros = Object.fromEntries(grupos.map(({ id, opcoes }) => [id, opcoes]));
        setCatalogo({ obras, colecoesIniciais, filtros });
      })
      .catch((falha) => {
        if (!ativo) return;
        console.error("Não foi possível buscar o catálogo no Firestore.", falha);
        setErro(true);
      });
    return () => { ativo = false; };
  }, [tentativa]);

  if (erro) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <p role="alert">Não foi possível carregar o catálogo.</p>
        <button onClick={() => { setErro(false); setTentativa((n) => n + 1); }}>
          Tentar novamente
        </button>
      </main>
    );
  }
  if (!catalogo) return <main role="status" style={{ padding: 40 }}>Carregando catálogo…</main>;

  return (
    <CatalogoContext.Provider value={catalogo}>
      <Outlet />
    </CatalogoContext.Provider>
  );
}

export function useCatalogo() {
  return useContext(CatalogoContext);
}

export function obrasDaColecao(colecao, obras) {
  return colecao.obras.map((id) => obras.find((obra) => obra.id === id)).filter(Boolean);
}
