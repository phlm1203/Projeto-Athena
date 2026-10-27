import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);
const entrarComGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());


export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // dispara ao abrir o site e sempre que o login muda
    const cancelar = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
    return cancelar;
  }, []);

  async function cadastrar(nome, email, senha) {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(cred.user, { displayName: nome });
    return cred.user;
  }

  const entrar = (email, senha) => signInWithEmailAndPassword(auth, email, senha);
  const sair = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ usuario, carregando, cadastrar, entrar, entrarComGoogle, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}