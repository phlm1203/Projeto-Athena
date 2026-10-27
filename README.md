# Athena

Plataforma web para estudantes do ENEM encontrarem **repertórios socioculturais** para usar nas redações. Filmes, séries, animes, músicas, álbuns e documentários são organizados por tema, com explicação de por que usar cada obra, um exemplo de aplicação e as limitações do repertório.

> Projeto desenvolvido na Etec de Taboão da Serra pelos Alunos do 3ºA: Pedro Henrique de Lima Mendes, Lucas Duarte de Carvalho, Pietro Fernando Arruda Silvestre, Rafael Fonseca Xavier, Raphaela Lima Costa

## Funcionalidades

- **Explorar:** busca por obra, artista ou tema, com filtros por tipo de mídia, tema social e área do conhecimento.
- **Página da obra:** visão geral (ficha técnica e sinopse), por que usar como repertório, exemplo de aplicação em redação e limitações.
- **Minha Biblioteca:** obras salvas por usuário, organizadas por categoria, com contadores de progresso e gráfico dos temas estudados.
- **Coleções:** grupos de obras reunidos por tema.
- **Perfil:** dados da conta, resumo de estudo, atividade recente e coleções.
- **Autenticação:** cadastro e login com e-mail e senha ou com a conta Google.
- **Rotas protegidas:** Biblioteca e Perfil só abrem para usuários logados.

## Tecnologias

- [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Firebase Authentication](https://firebase.google.com/docs/auth) (login)
- [Cloud Firestore](https://firebase.google.com/docs/firestore) (obras salvas de cada usuário)
- [Recharts](https://recharts.org/) (gráfico de temas)

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- Um projeto no [Firebase](https://console.firebase.google.com/) com **Authentication** (e-mail/senha e Google) e **Firestore** ativados

### Passo a passo

1. Clone o repositório e entre na pasta:

   ```bash
   git clone <URL-DO-REPOSITORIO>
   cd <NOME-DA-PASTA>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o arquivo `.env` na raiz, copiando o modelo, e preencha com os dados do seu app web do Firebase:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

   Os valores estão em **Configurações do projeto → Seus aplicativos** no console do Firebase. O arquivo `.env` não deve ser enviado ao GitHub.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   O Vite mostra no terminal o endereço local (normalmente `http://localhost:5173`).

### Outros comandos

```bash
npm run build     # gera a versão de produção na pasta dist
npm run preview   # visualiza a versão de produção localmente
```

## Configuração do Firebase

1. Em **Authentication → Sign-in method**, ative **E-mail/senha** e **Google**.
2. Em **Firestore Database**, crie o banco e publique estas regras, para que cada usuário acesse apenas os próprios dados:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /usuarios/{uid}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```

3. Ao publicar o site, adicione o domínio de hospedagem em **Authentication → Configurações → Domínios autorizados**.

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
├── utils/        # funções auxiliares (tempoRelativo)
├── firebase.js   # configuração do Firebase
├── App.jsx       # rotas
└── main.jsx
```

## Como as obras são organizadas

Cada obra em `src/data/obras.js` tem campos como `id`, `nome`, `autor`, `tipo`, `ano`, `imagem`, `temas`, `midia`, `categorias` e `areas`, além dos textos de apoio à redação: `descricaoCurta`, `sinopse`, `porQueUsar`, `relacaoTemas`, `exemploAplicacao` e `limitacao`. As imagens ficam em `public/imgs/obras/`.

## Próximos passos

- [ ] Coleções criadas por cada usuário, salvas no Firestore
- [ ] Tela de configurações do perfil
- [ ] Troca de foto de perfil
- [ ] Mais obras e novas categorias (como jogos)

## Autor

Desenvolvido por <SEU NOME>.
