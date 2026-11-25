import { useEffect, useState } from "react";
import {
  collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function useSalvas() {
  const { usuario } = useAuth();
  const uid = usuario?.uid;
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    if (!uid) return;
    return onSnapshot(collection(db, "usuarios", uid, "biblioteca"), (snap) => {
      setEstado({ uid, salvas: snap.docs.map((d) => ({ ...d.data(), obraId: d.id })) });
    }, (erro) => setEstado({ uid, erro, salvas: [] }));
  }, [uid]);

  function ref(obraId) {
    if (!uid) throw new Error("Entre na sua conta para usar a biblioteca.");
    return doc(db, "usuarios", uid, "biblioteca", String(obraId));
  }

  function salvarObra(obraId) {
    return setDoc(ref(obraId), { status: "revisao", salvaEm: serverTimestamp() });
  }

  const atual = estado?.uid === uid ? estado : null;
  return {
    salvas: atual?.salvas ?? [],
    carregando: Boolean(uid && !atual),
    erro: atual?.erro,
    salvarObra,
    atualizarStatus: (obraId, status) => updateDoc(ref(obraId), { status }),
    removerObra: (obraId) => deleteDoc(ref(obraId)),
  };
}
