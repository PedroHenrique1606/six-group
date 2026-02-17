# Six Group – VSL & E-commerce

Página VSL (Video Sales Letter) responsiva com fluxo de produtos, carrinho, checkout e página de obrigado. Desafio Desenvolvedor Front-end React 2026 – Grupo Six.

**Documentação técnica e critérios de avaliação:** [DOCUMENTACAO.md](./DOCUMENTACAO.md).

---

## Como executar localmente

**Pré-requisitos:** Node.js 18+ e npm (ou yarn/pnpm).

1. Clone o repositório e entre na pasta do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Suba o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

**Rotas principais:** `/` (landing), `/checkout`, `/obrigado`, `/produto/maxx`, `/produto/thermo`, `/produto/gold`.

Para build de produção e rodar localmente:
```bash
npm run build
npm run start
```

---

## Deploy na Vercel

Conecte o repositório à [Vercel](https://vercel.com); o build usa `next build`. Variáveis de ambiente não são obrigatórias para o fluxo atual.

---

## Scripts

| Comando        | Descrição                    |
|----------------|------------------------------|
| `npm run dev`  | Servidor de desenvolvimento  |
| `npm run build`| Build de produção            |
| `npm run start`| Servidor de produção (após build) |
| `npm run lint` | Executa o ESLint             |
