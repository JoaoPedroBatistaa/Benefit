// Arquivo: pages/api/create-client.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
   success: boolean;
   message?: string;
   customer?: string; // Ajustei para retornar apenas o ID do cliente, conforme sua última versão
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<ResponseData>
) {
   if (req.method !== 'POST') {
      console.log("Método não permitido");
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
   }

   const { nome, email, cpf, telefone } = req.body;
   console.log("Recebendo requisição com:", { nome, email, cpf, telefone }); // Log de entrada

   try {
      const asaasResponse = await axios.post('https://sandbox.asaas.com/api/v3/customers', {
         name: nome,
         email: email,
         cpfCnpj: cpf,
         phone: telefone,
         mobilePhone: telefone,
         // Os demais campos estão sendo enviados como strings vazias
      }, {
         headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzY2MzE6OiRhYWNoX2M5MzZkNzU3LTNjM2MtNDg1MC05OTlhLTVjMmZkNjM1ODFjZg==' // Certifique-se de substituir este valor
         }
      });

      console.log("Resposta do ASAAS:", asaasResponse.data); // Log da resposta do ASAAS

      return res.status(200).json({
         success: true,
         customer: asaasResponse.data.id // Retorna apenas o ID do cliente
      });
   } catch (error: any) {
      console.error('Erro ao criar cliente no ASAAS:', error.response ? error.response.data : error); // Log detalhado do erro
      return res.status(500).json({
         success: false,
         message: 'Internal Server Error'
      });
   }
}
