const { Historico, Usuario } = require("../models");

const listarHistoricoPorChamado = async (req, res) => {
    const { chamadoId } = req.params;

    try {
        const historico = await Historico.findAll({
            where: { chamadoId },
            include: [
                {
                    model: Usuario,
                    attributes: ["id", "nome", "email"]
                }
            ],
            order: [["createdAt", "ASC"]],
        });

        if (!historico.length) {
            return res.status(404).json({ message: "Nenhum histórico para esse chamado", error });
        }

        res.json(historico);
    } catch (error) {
        console.error("Erro ao listar histórico:", error);
        res.status(500).json({ message: "Erro ao listar histórico", error: error.message || error.toString() });
    }
};

module.exports = {
    listarHistoricoPorChamado
};