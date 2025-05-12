const db = require("../models");
const { Usuario, Chamado, Historico } = db;

const criarChamado = async (req, res) => {
    const { solicitanteNome, solicitanteEmail, titulo, descricao, prioridade } = req.body;

    try {
        //Verifica se o solicitante já existe
        let usuario = await Usuario.findOne({ where: { email: solicitanteEmail } });

        if (!usuario) {
            // Cria um novo usuário
            usuario = await Usuario.create({
                nome: solicitanteNome,
                email: solicitanteEmail,
                tipo: "usuario",
            });
        }
        // Cria o chamado vinculado ao usuário
        const chamado = await Chamado.create({
            titulo,
            descricao,
            prioridade,
            usuarioId: usuario.id // associação
        });

        // Adiciona entrada no histórico
        await Historico.create({
            chamadoId: chamado.id,
            descricao: "Chamado criado pelo solicitante",
            autorId: usuario.id,
        });

        res.status(201).json({ message: "Chamado criado com sucesso", chamado });
    } catch (error) {
        console.error("Erro ao criar chamado:", error);
        res.status(500).json({ message: "Erro interno ao criar chamado" });
    }
};

module.exports = {
    criarChamado,
};