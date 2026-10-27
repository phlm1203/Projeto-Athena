import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function useSalvas() {
  const { usuario } = useAuth();
  const [salvas, setSalvas] = useState([]);

  useEffect(() => {
    if (!usuario) return;
    const ref = collection(db, "usuarios", usuario.uid, "biblioteca");
    // atualiza em tempo real
    return onSnapshot(ref, (snap) => {
      setSalvas(snap.docs.map((d) => ({ obraId: Number(d.id), ...d.data() })));
    });
  }, [usuario]);

  const salvarObra = (obraId, status = "revisao") =>
    setDoc(doc(db, "usuarios", usuario.uid, "biblioteca", String(obraId)), { status });

  const removerObra = (obraId) =>
    deleteDoc(doc(db, "usuarios", usuario.uid, "biblioteca", String(obraId)));

  return { salvas, salvarObra, removerObra };
}