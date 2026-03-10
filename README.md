# Resumo

Nesse projeto pessoal decidi criar uma plataforma de Linktree para seguir treinando o que aprendi recentemente, esse sistema permitirá que o usuário crie sua própria conta e salve os links que desejar

Os links poderão ser customizados com a cor da fonte e cor de fundo que o usuário desejar

# Funcionalidades
- Criação de conta
- Login
- Criação de links

# 🛠️ Tecnologias 
- React
- TypeScript
- Firebase (banco de dados e autenticação)
- Tailwind

# ⚙️ Como rodar localmente
Para rodar esse projeto é necessário:

### NodeJS
Realizar a instalação do **NodeJS**  (https://nodejs.org/en/download) em sua máquina

### Firebase
Criar uma conta no **Firebase** (https://firebase.google.com/?hl=pt-br), em seguida configurar o Firestore e Authentication para possuir o sistema de banco de dados e autenticação

Após isso basta acessar a configuração do projeto para obter os dados da integração com o Firebase que ficarão no arquivo **firebase.tsx** ou em um arquivo **.env**

### Vite
Utilizamos o **Vite** (https://vite.dev/) para rodar o projeto, com isso basta acessar a pasta do projeto para abrir o CMD e utilizar o comando **npm run dev**

Com isso o projeto será iniciado através do **http://localhost:5173/**