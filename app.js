require("dotenv").config();
const express = require("express");
const app = express();
const { sequelize } = require("./models"); // Alterado para importar diretamente do models
const chamadoRoutes = require("./routes/chamado.routes");

// Middlewares
app.use(express.json());

// Rotas
app.use("/chamados", chamadoRoutes);

// Conecta e sincroniza o banco
sequelize.authenticate()
  .then(() => console.log("Conexão com banco estabelecida com sucesso"))
  .catch(err => console.error("Erro na conexão com o banco:", err));

sequelize.sync({ alter: true })
  .then(() => console.log("Modelos sincronizados com sucesso"))
  .catch(err => console.error("Erro ao sincronizar modelos", err));

// Inicia o servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});