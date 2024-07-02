import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
   success: boolean;
   message?: string;
   customer?: string;
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
   console.log("Recebendo requisição com:", { nome, email, cpf, telefone });

   // Tratamento do token de acesso para remover espaços e quebras de linha
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

   try {
      const asaasResponse = await axios.post('https://asaas.com/api/v3/customers', {
         name: nome,
         email: email,
         cpfCnpj: cpf,
         phone: telefone,
         mobilePhone: telefone,
      }, {
         headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'access_token': asaasAccessToken,
         }
      });

      console.log("Resposta do ASAAS:", asaasResponse.data);

      return res.status(200).json({
         success: true,
         customer: asaasResponse.data.id
      });
   } catch (error: any) {
      console.error('Erro ao criar cliente no ASAAS:', error.response ? error.response.data : error);

      if (error.response) {
         console.error("Detalhes do erro:", {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data,
         });
      }

      return res.status(500).json({
         success: false,
         message: 'Internal Server Error'
      });
   }
}
