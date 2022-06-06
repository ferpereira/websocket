const WebSocketServer = require("ws");
const wss = new WebSocketServer.Server({ port: 4000 });
console.log("Servidor WS ta rodando na porta 4000");

var clientes = new Array();

const perguntasRespostas = new Map();
perguntasRespostas.set("Preciso de ajuda", "Olá, descreva seu problema!");
perguntasRespostas.set("Problema com software", "Qual é o nome do software?");
perguntasRespostas.set("Teams", "Abra e feche  o aplicativo Teams!");
perguntasRespostas.set("Chrome", "Limpe o cache do navegador!");
perguntasRespostas.set(
  "Word",
  "Entre em contato com o suporte 11 1 1111 1111!"
);

//Ciclo de vida de conexoes do cliente ao servidor
wss.on("connection", (ws) => {
  clientes.push(ws);
  console.log("Conexão foi estabelecida");

  ws.on("message", (data) => {
    let resposta = "Não encontramos na base a sua solicitação";
    perguntasRespostas.forEach((value, key) => {
      if (key == data) {
        resposta = value;
      }
    });
    console.log(resposta);
  });

  ws.on("close", () => {
    console.log("Conexao encerrada pelo cliente");
  });
});
