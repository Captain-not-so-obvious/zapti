const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Função para enviar e-mail de resolução de chamado
const enviarEmailChamadoResolvido = async (destinatario, nomeSolicitante, tituloChamado) => {
  const mailOptions = {
    from: `"Suporte TI" <${process.env.SMTP_USER}>`,
    to: destinatario,
    subject: `Seu chamado foi resolvido: ${tituloChamado}`,
    html: `
      <p>Olá ${nomeSolicitante},</p>
      <p>O chamado <strong>${tituloChamado}</strong> foi marcado como resolvido.</p>
      <p>Se o problema persistir, você pode abrir um novo chamado a qualquer momento.</p>
      <br/>
      <p>Atenciosamente,<br/>Equipe de Suporte</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { enviarEmailChamadoResolvido };