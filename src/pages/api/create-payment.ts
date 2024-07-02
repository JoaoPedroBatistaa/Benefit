import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   console.log("Recebendo requisição para create-payment", req.body); // Loga os dados recebidos

   let asaasAccessToken = process.env.ASAAS_ACCESS_TOKEN?.trim().replace(/\s/g, '');

   // Adicionando $ e == diretamente ao token
   asaasAccessToken = `$${asaasAccessToken}==`;

   // Log do token de acesso
   console.log("Token de acesso ASAAS:", asaasAccessToken.replace(/\s/g, ''));

   if (!asaasAccessToken) {
      console.error("Token de acesso ASAAS não encontrado nas variáveis de ambiente.");
      return res.status(500).json({
         success: false,
         message: 'Token de acesso não configurado',
      });
   }

   if (req.method === 'POST') {
      try {
         console.log("Enviando dados para ASAAS", req.body);
         const { data } = await axios.post('https://asaas.com/api/v3/subscriptions/', req.body, {
            headers: {
               'accept': 'application/json',
               'content-type': 'application/json',
               'access_token': asaasAccessToken,
            },
         });
         console.log("Resposta do ASAAS", data);
         res.status(200).json(data);
      } catch (error: any) {
         console.error('Erro na API create-payment:', error);
         if (error.response) {
            console.error("Detalhes do erro:", error.response.data);
         }
         res.status(500).json({ message: 'Erro interno no servidor' });
      }
   } else {
      console.warn(`Método não permitido: ${req.method}`);
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
