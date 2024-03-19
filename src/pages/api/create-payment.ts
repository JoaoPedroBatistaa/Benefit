import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   console.log("Recebendo requisição para create-payment", req.body); // Loga os dados recebidos

   if (req.method === 'POST') {
      try {
         console.log("Enviando dados para ASAAS", req.body);
         const { data } = await axios.post('https://sandbox.asaas.com/api/v3/subscriptions/', req.body, {
            headers: {
               'accept': 'application/json',
               'content-type': 'application/json',
               'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzY2MzE6OiRhYWNoX2M5MzZkNzU3LTNjM2MtNDg1MC05OTlhLTVjMmZkNjM1ODFjZg==',
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

