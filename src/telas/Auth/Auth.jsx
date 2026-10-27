import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

function traduzirErro(codigo) {
  const erros = {
    "auth/invalid-credential": "E-mail ou senha incorretos.",
    "auth/email-already-in-use": "Este e-mail já está cadastrado.",
    "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
    "auth/invalid-email": "E-mail inválido.",
    "auth/popup-blocked": "O navegador bloqueou a janela do Google. Libere pop-ups e tente de novo.",
    "auth/network-request-failed": "Sem conexão. Verifique sua internet.",
  };
  return erros[codigo] || "Algo deu errado. Tente novamente.";
}

function IconeGoogle() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
      <path fill="#FBBC05" d="M10.5 28.7a14.5 14.5 0 010-9.4l-7.9-6.1a24 24 0 000 21.6l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export default function Auth({ modo = "entrar" }) {
  const { entrar, cadastrar, entrarComGoogle } = useAuth();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const ehCadastro = modo === "cadastrar";

  async function aoEnviar(e) {
    e.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      if (ehCadastro) await cadastrar(nome, email, senha);
      else await entrar(email, senha);
      navigate("/biblioteca");
    } catch (err) {
      setErro(traduzirErro(err.code));
    } finally {
      setEnviando(false);
    }
  }

  async function aoClicarGoogle() {
    setErro("");
    setEnviando(true);
    try {
      await entrarComGoogle();
      navigate("/biblioteca");
    } catch (err) {
      // fechar a janela do Google não é erro de verdade
      if (err.code !== "auth/popup-closed-by-user") {
        setErro(traduzirErro(err.code));
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth__card">
        <Link to="/" className="auth__logo">Athena</Link>

        <h1 className="auth__titulo">
          {ehCadastro ? "Crie sua conta" : "Bem-vindo de volta"}
        </h1>
        <p className="auth__sub">
          {ehCadastro
            ? "Comece a montar sua biblioteca de repertórios."
            : "Entre para acessar seus repertórios salvos."}
        </p>

        <button
          type="button"
          className="auth__google"
          onClick={aoClicarGoogle}
          disabled={enviando}
        >
          <IconeGoogle />
          Continuar com o Google
        </button>

        <div className="auth__divisor"><span>ou</span></div>

        <form className="auth__form" onSubmit={aoEnviar}>
          {ehCadastro && (
            <div className="auth__campo">
              <label htmlFor="nome">Nome</label>
              <input
                id="nome"
                type="text"
                autoComplete="name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Como quer ser chamado"
                required
              />
            </div>
          )}

          <div className="auth__campo">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              required
            />
          </div>

          <div className="auth__campo">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              autoComplete={ehCadastro ? "new-password" : "current-password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo de 6 caracteres"
              minLength={6}
              required
            />
          </div>

          {erro && <p role="alert" className="auth__erro">{erro}</p>}

          <button type="submit" className="auth__botao" disabled={enviando}>
            {enviando ? "Aguarde..." : ehCadastro ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <p className="auth__troca">
          {ehCadastro ? (
            <>Já tem conta? <Link to="/entrar">Entrar</Link></>
          ) : (
            <>Não tem conta? <Link to="/cadastro">Cadastre-se</Link></>
          )}
        </p>
      </div>
    </main>
  );
}