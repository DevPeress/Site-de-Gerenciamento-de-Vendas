# Site de Gerenciamento de Vendas

Sistema full-stack desenvolvido com **Next.js**, **Tailwind CSS**, **Prisma ORM**, **MySQL** e autenticação via **cookies**. A aplicação permite gerenciar compradores, produtos e vendas em um painel administrativo moderno, responsivo e seguro.

## ✨ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) — Framework full-stack React
- [TypeScript](https://www.typescriptlang.org/) — Tipagem estática
- [Tailwind CSS](https://tailwindcss.com/) — Estilização moderna com utilitários
- [Prisma ORM](https://www.prisma.io/) — ORM para integração com o banco MySQL
- [MySQL](https://www.mysql.com/) — Banco de dados relacional
- [Cookies HttpOnly](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) — Autenticação persistente e segura

## ⚙️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/DevPeress/Site-de-Gerenciamento-de-Vendas
cd Site-de-Gerenciamento-de-Vendas

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite as informações do banco de dados e secret de JWT no arquivo .env

# Gere o client do Prisma e execute as migrations
npx prisma generate
npx prisma migrate dev --name init

# Inicie o servidor de desenvolvimento
npm run dev
 Funcionalidades
 Cadastro e login de usuários com cookies (HttpOnly e Secure)

 CRUD de produtos

 CRUD de compradores

 CRUD de vendas

 Proteção de rotas

 Dashboard com estatísticas e gráfico de vendas

 Responsividade para dispositivos móveis

 Filtro de busca nas listagens

 Exportação de dados (em desenvolvimento)
