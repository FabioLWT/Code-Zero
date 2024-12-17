const express = require("express");

// cria um novo app usando express
const app = express();

// configura o express para usar o padrão json de comunicação
app.use(express.json());

// cria uma rota get para testar a api
app.get("/health", (request, response) => {
  response.send("Seja Bem-vindo à minha API || Vai coringão");
});

let users = [];

// cria uma rota post para inserir um novo usuário
app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    age,
  };
  users.push(newUser);

  response.send(newUser);
});

// cria uma rota get para listar todos os users
app.get("/users", (request, response) => {
  response.send(users);
});

// cria uma rota get para listar um user específico
app.get("/users/:id", (request, response) => {
  const userId = parseInt(request.params.id, 10); // --- Converte o id para número
  console.log(userId); // --- Para verificar o valor do id
  const currentUser = users.find((user) => user.id === userId);

  if (currentUser) {
    response.send(currentUser);
  } else {
    response.status(404).send({ error: "Usuário não encontrado" });
  }
});

// cria uma rota para atualizar um usuário
app.put("/users/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return response.status(404).send("Não foi encontrado nenhum usuário");
  }

  // --- Atualiza os dados do usuário existente com as informações enviadas no body
  const updatedUser = {
    ...users[index], // --- Mantém os dados atuais do usuário
    ...request.body, // --- Sobrescreve os dados com os enviados no body da requisição
  };

  users[index] = updatedUser;

  response.send(updatedUser); // --- Retorna o usuário atualizado
});

// cria uma rota para deletar um usuário
app.delete("/users/:id", (request, response) => {
  const index = users.findIndex(
    (user) => user.id === parseInt(request.params.id)
  );

  if (index === -1) {
    return response.status(404).send("Não foi encontrado nenhum usuário");
  }

  users.splice(index, 1);

  response.send("Usuário excluído com sucesso");
});

// inicia o servidor na porta 3001
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});
