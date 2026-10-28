# Athena

Plataforma web para estudantes do ENEM encontrarem **repertórios socioculturais** para usar nas redações. Filmes, séries, animes, músicas, álbuns e documentários são organizados por tema, com explicação de por que usar cada obra, um exemplo de aplicação e as limitações do repertório.

## Autor

Desenvolvido pelos alunos da Etec de Taboão da Serra: **Pedro Henrique de Lima Mendes, Lucas Duarte de Carvalho, Pietro Fernando Arruda Silvestre, Rafael Fonseca Xavier, Raphaela Lima Costa.**

## O que o projeto faz

- **Explorar:** busca por obra, artista ou tema, com filtros por tipo de mídia, tema social e área do conhecimento.
- **Página da obra:** ficha técnica, sinopse, por que usar como repertório, exemplo de aplicação e limitações.
- **Minha Biblioteca:** obras salvas por usuário, com contadores e gráfico dos temas estudados.
- **Coleções:** grupos de obras reunidos por tema.
- **Perfil:** dados da conta, resumo de estudo e atividade recente.
- **Login e cadastro:** com e-mail e senha ou com a conta Google.

## Tecnologias

React, Vite, React Router, Firebase (Authentication e Firestore) e Recharts.

---

## Como rodar o projeto no seu computador

Siga os passos na ordem. Não é preciso ter experiência: basta copiar e colar os comandos.

### Passo 1: Instale o Node.js

O Node.js é o programa que executa o projeto.

1. Acesse [nodejs.org](https://nodejs.org/) e baixe a versão **LTS** (a recomendada).
2. Instale deixando as opções padrão.
3. Confira a instalação abrindo o terminal (veja o quadro abaixo) e digitando:

   ```bash
   node --version
   ```

   Deve aparecer algo como `v20.x.x` ou maior. Se aparecer um número menor que 20, instale uma versão mais nova.

> **Como abrir o terminal**
> - **Windows:** aperte a tecla `Windows`, digite `cmd` ou `PowerShell` e abra.
> - **Mac:** aperte `Cmd + Espaço`, digite `Terminal` e abra.
> - **Linux:** `Ctrl + Alt + T`.

### Passo 2: Instale o Git

O Git serve para baixar o projeto do GitHub.

1. Acesse [git-scm.com/downloads](https://git-scm.com/downloads) e baixe a versão do seu sistema.
2. Instale deixando as opções padrão.
3. Confira digitando no terminal:

   ```bash
   git --version
   ```

> Prefere não instalar o Git? Na página do repositório, clique no botão verde **Code → Download ZIP**, extraia a pasta e pule para o Passo 4 (abrindo o terminal dentro da pasta extraída).

### Passo 3: Baixe o projeto

No terminal, escolha uma pasta onde quer guardar o projeto (por exemplo, a Área de Trabalho) e rode:

```bash
git clone <URL-DO-REPOSITORIO>
```

O endereço está no botão verde **Code** desta página (aba HTTPS). Depois, entre na pasta que foi criada:

```bash
cd <NOME-DA-PASTA>
```

### Passo 4: Instale as dependências

Ainda dentro da pasta do projeto, rode:

```bash
npm install
```

Esse comando baixa tudo o que o projeto precisa. Pode demorar um ou dois minutos. Avisos amarelos (`warn`) são normais; só erros em vermelho indicam problema.

### Passo 5: Inicie o projeto

```bash
npm run dev
```

O terminal vai mostrar uma mensagem parecida com esta:

```
  VITE ready in 500 ms

  ➜  Local:   http://localhost:5173/
```

### Passo 6: Abra no navegador

Abra o endereço mostrado no terminal (normalmente **http://localhost:5173**). O Athena deve aparecer na tela. 🎉

Para **parar** o projeto, volte ao terminal e aperte `Ctrl + C`.

---

## Sobre o login e os dados

O projeto já vem configurado para usar o Firebase do autor, então o **cadastro, o login e o salvamento de obras funcionam sem nenhuma configuração extra**. Isso significa que:

- As contas que você criar ficam no banco de dados do projeto original.
- Cada usuário só consegue ver as próprias obras salvas.
- Se quiser usar o seu próprio Firebase, crie um projeto no [console do Firebase](https://console.firebase.google.com/), ative **Authentication** (e-mail/senha e Google) e **Firestore**, e troque os dados do arquivo `src/firebase.js` pelos do seu app web.

---

## Solução de problemas

| Problema | O que fazer |
|---|---|
| `'git' não é reconhecido` ou `command not found: git` | O Git não foi instalado ou o terminal precisa ser fechado e aberto de novo. Refaça o Passo 2. |
| `'npm' não é reconhecido` | O Node.js não foi instalado ou o terminal precisa ser reaberto. Refaça o Passo 1. |
| `npm install` termina com erros em vermelho | Confira se o Node é a versão 20 ou maior (`node --version`). Apague a pasta `node_modules` e rode `npm install` de novo. |
| `Port 5173 is already in use` | Já há outro programa usando a porta. Feche o outro terminal ou aceite a porta nova que o Vite sugerir. |
| A tela abre em branco | Aperte `F12`, abra a aba **Console** e veja a mensagem em vermelho. Abra uma *issue* aqui no repositório com o texto do erro. |
| O login com o Google não abre a janela | Libere pop-ups para `localhost` no navegador e tente de novo. |
| Mudei algo no código e nada atualiza | Salve o arquivo (`Ctrl + S`). Se ainda assim não atualizar, pare com `Ctrl + C` e rode `npm run dev` de novo. |

---

## Outros comandos

```bash
npm run build     # gera a versão de produção na pasta dist
npm run preview   # visualiza a versão de produção localmente
```

---

## Estrutura do projeto

```
src/
├── components/   # Abas, ColecaoCard, FiltroSlideBar, Footer, GraficoTemas,
│                 # Header, ObraCard, ObraSalvaCard, RotaProtegida, StatCard, Tag
├── context/      # AuthContext (estado de login)
├── data/         # obras.js, colecoes.js, filtros.js
├── hooks/        # useBiblioteca, useColecoes, usePerfil, useSalvas
├── telas/        # Auth, Biblioteca, ColecaoDetalhe, Colecoes, Explorar,
│                 # LP-Athena, Obra, Perfil
├── utils/        # funções auxiliares
├── firebase.js   # configuração do Firebase
├── App.jsx       # rotas
└── main.jsx
public/
└── imgs/obras/   # capas e banners das obras
```

## Autor

Desenvolvido por <SEU NOME>.
