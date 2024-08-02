import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
   host: process.env.SMTP_HOST,
   port: Number(process.env.SMTP_PORT),
   auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
   },
   tls: {
      rejectUnauthorized: false,
   },
});

export async function sendWelcomeEmail(data: { email: string; name: string }) {
   const { email, name } = data;

   const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: 'Bem-vindo ao Clube Poupy!',
      text: `Olá ${name}, bem-vindo ao Clube Poupy!`,
      html: `
            <div style="padding: 20px; background-color: #E0E0E0; font-size: 18px;">
                <div style="background-color: #fff; border-radius: 8px; overflow: hidden;">
                    <div style="padding: 20px; background-color: #08d40a; text-align: left;">
                        <img src="https://firebasestorage.googleapis.com/v0/b/benefitclients-eaba4.appspot.com/o/Digital%20Logo%20Completa%20-%20Transparente.png?alt=media&token=f647341c-cdf4-47d5-9bc5-f939dca3defd" alt="Logo Clube Poupy" style="max-width: 20%; height: auto;">
                    </div>
                    <div style="padding: 20px; border-bottom: 20px solid #08d40a; border-radius: 8px;">
                        <p><strong style="color: #08d40a;">Olá ${name},</strong></p>
                        <p style="color: #404049;">Bem-vindo ao <strong style="color: #08d40a;">Clube Poupy</strong>!</p>
                        <p style="color: #404049;">Estamos entusiasmados por tê-lo(a) conosco. No <strong style="color: #08d40a;">Clube Poupy</strong>, você tem acesso ao maior clube de benefícios da América Latina, com descontos e ofertas exclusivas de mais de 1.600 empresas parceiras!</p>
                        <p style="color: #404049;"><strong style="color: #08d40a;">Com o Clube Poupy, você pode:</strong></p>
                        <ul style="color: #404049;">
                            <li>Aproveitar descontos em uma ampla variedade de produtos e serviços, incluindo vestuário, tecnologia, beleza, e muito mais!</li>
                            <li>Receber cashback em compras selecionadas</li>
                            <li>Acessar promoções exclusivas através de links, cupons e vouchers</li>
                            <li>Utilizar sua carteirinha digital em lojas físicas parceiras</li>
                        </ul>
                        <p style="color: #404049;">Para começar, visite nosso portal e explore todas as vantagens disponíveis. Em breve, você também poderá aproveitar nossos benefícios através do nosso aplicativo, que está quase pronto para ser lançado!</p>
                        <p style="color: #404049;">Se precisar de qualquer assistência, nossa equipe de suporte está sempre pronta para ajudá-lo(a).</p>
                        <p style="color: #404049;">Atenciosamente,</p>
                        <p><strong style="color: #08d40a;">Equipe Clube Poupy</strong></p>
                    </div>
                </div>
            </div>
        `,
   };


   try {
      console.log('Tentando enviar e-mail de boas-vindas para:', email);
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail de boas-vindas enviado com sucesso. ID da mensagem:', info.messageId);
   } catch (error) {
      if (error instanceof Error) {
         console.error('Erro ao enviar e-mail:', error.message);
      } else {
         console.error('Erro ao enviar e-mail:', error);
      }
   }
}
