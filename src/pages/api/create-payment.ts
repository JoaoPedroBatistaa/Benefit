import axios from 'axios';
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   console.log("Recebendo requisição para create-payment", req.body);

   if (req.method === 'POST') {
      const { email, ...paymentData } = req.body;

      try {
         console.log("Enviando dados para ASAAS", paymentData);
         const response = await axios.post('https://sandbox.asaas.com/api/v3/subscriptions/', paymentData, {
            headers: {
               'accept': 'application/json',
               'content-type': 'application/json',
               'access_token': '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzY2MzE6OiRhYWNoX2M5MzZkNzU3LTNjM2MtNDg1MC05OTlhLTVjMmZkNjM1ODFjZg==', // Substitua pelo seu token de acesso
            },
         });
         const { data } = response;
         console.log("Resposta do ASAAS", data);

         const usersRef = collection(db, 'Clients');
         const q = query(usersRef, where('email', '==', email));
         const querySnapshot = await getDocs(q);

         if (!querySnapshot.empty) {
            querySnapshot.forEach(async (document) => {
               const userDocRef = doc(db, 'Clients', document.id);
               await updateDoc(userDocRef, { paymentId: data.id });
            });

            res.status(200).json(data);
         } else {
            throw new Error('Usuário não encontrado.');
         }
      } catch (error: any) {
         console.error('Erro na API create-payment:', error);
         res.status(500).json({ message: 'Erro interno no servidor', details: error.response?.data || error.message });
      }
   } else {
      console.warn(`Método não permitido: ${req.method}`);
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
