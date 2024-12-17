const express = require("express");

// cria um novo app usando express
const app = express();

// configura o express para usar o padrão json de comunicação
app.use(express.json());

// cria uma rota get para testar a api
app.get("/health", (request, response) => {
  response.send("Seja Bem-vindo à minha API Vai corinthais");
});

let users = [];

// cria uma rota post para inserir um novo usuário
app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const newUser = { name, age };
  users.push(newUser);

  response.send(newUser);
});

app.get("/users", (request, response) => {
  response.send(users);
});

// inicia o servidor na porta 3001
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
