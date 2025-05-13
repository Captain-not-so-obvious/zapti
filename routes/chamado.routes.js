const express = require("express");
const router = express.Router();
const chamadoController = require("../controllers/chamado.controller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", chamadoController.criarChamado);
router.put("/:id/resolver", authMiddleware, chamadoController.resolverChamado);

module.exports = router;