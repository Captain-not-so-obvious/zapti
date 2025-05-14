const express = require("express");
const router = express.Router();
const chamadoController = require("../controllers/chamado.controller");
const authMiddleware = require("../middleware/authMiddleware");

//Qualquer pessoa pode criar um chamado
router.post("/", chamadoController.criarChamado);

// Mas apenas usuários autenticados podem resolver um chamado
router.put("/:id/resolver", authMiddleware, chamadoController.resolverChamado);

// Rota que lista chamado por status ou técnico
router.get("/listar", chamadoController.listarChamados);

router.put("/atribuir-tecnico/:id", chamadoController.atribuirTecnico);

module.exports = router;