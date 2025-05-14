const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");

// Rota para registrar novo usuário
router.post("/registro", usuarioController.criarUsuario);

// Rota para login
router.post("/login", usuarioController.login);

module.exports = router;