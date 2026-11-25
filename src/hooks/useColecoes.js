import { useEffect, useState } from "react";
import {
  addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc,
  onSnapshot, runTransaction, serverTimestamp, updateDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCatalogo } from "../context/CatalogoContext";
import { db } from "../firebase";

async function iniciarColecoes(uid, exemplos) {
  const marcador = doc(db, "usuarios", uid, "configuracoes", "colecoes");
  await runTransaction(db, async (transacao) => {
    if ((await transacao.get(marcador)).exists()) return;
    for (const { id, nome, descricao, obras, ordem } of exemplos) {
      transacao.set(doc(db, "usuarios", uid, "colecoes", id), {
        nome, descricao: descricao ?? "", obras, ordem: ordem ?? 0,
      });
    }
    transacao.set(marcador, { iniciadas: true });
  });
}

export function useColecoes() {
  const { usuario } = useAuth();
  const { colecoesIniciais } = useCatalogo();
  const uid = usuario?.uid;
  const [estado, setEstado] = useState(null);
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    if (!uid) return;
    let ativo = true;
    let cancelar;
    const falhar = (erro) => {
      if (ativo) setEstado({ uid, tentativa, erro, colecoes: [] });
    };

    iniciarColecoes(uid, colecoesIniciais).then(() => {
      if (!ativo) return;
      cancelar = onSnapshot(collection(db, "usuarios", uid, "colecoes"), (snapshot) => {
        const colecoes = snapshot.docs.map((item) => ({ ...item.data(), id: item.id }));
        colecoes.sort((a, b) =>
          (b.criadaEm?.toMillis() ?? 0) - (a.criadaEm?.toMillis() ?? 0) ||
          (a.ordem ?? 0) - (b.ordem ?? 0) || a.id.localeCompare(b.id)
        );
        setEstado({ uid, tentativa, colecoes });
      }, falhar);
    }).catch(falhar);

    return () => { ativo = false; cancelar?.(); };
  }, [uid, colecoesIniciais, tentativa]);

  const atual = estado?.uid === uid && estado?.tentativa === tentativa ? estado : null;
  const ref = (id) => doc(db, "usuarios", uid, "colecoes", id);

  async function criar({ nome, descricao }) {
    const criada = await addDoc(collection(db, "usuarios", uid, "colecoes"), {
      nome: nome.trim(), descricao: descricao.trim(), obras: [], criadaEm: serverTimestamp(),
    });
    return criada.id;
  }

  return {
    colecoes: atual?.colecoes ?? [],
    carregando: !atual,
    erro: atual?.erro,
    tentarNovamente: () => setTentativa((valor) => valor + 1),
    criar,
    excluir: (id) => deleteDoc(ref(id)),
    atualizar: (id, campos) => updateDoc(ref(id), campos),
    adicionarObra: (id, obraId) => updateDoc(ref(id), { obras: arrayUnion(obraId) }),
    removerObra: (id, obraId) => updateDoc(ref(id), { obras: arrayRemove(obraId) }),
  };
}
