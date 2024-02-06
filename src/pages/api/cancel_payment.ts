import axios from 'axios';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async (req: { method: string; body: { paymentId: any; userId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) => {
   if (req.method === 'PUT') {
      const { paymentId, userId } = req.body;

      if (!paymentId || !userId) {
         return res.status(400).json({ error: 'O paymentId e userId são necessários.' });
      }

      try {
         const cancelData = { status: "cancelled" };

         // Cancela a assinatura
         await axios.put(
            `https://api.mercadopago.com/preapproval/${paymentId}`,
            cancelData,
            {
               headers: {
                  'Authorization': `Bearer APP_USR-1815818743124652-080317-109bb5a9f9ff314ed07f81d1d040b4dd-1441472886`,
                  'Content-Type': 'application/json',
               },
            }
         );

         // Referência ao documento do usuário no Firestore
         const userRef = doc(db, "Clients", userId);

         // Atualiza o campo "Ativo" do usuário para false
         await updateDoc(userRef, {
            Ativo: false
         });

         res.status(200).json({
            message: 'Assinatura cancelada com sucesso!',
         });
      } catch (error) {
         console.error("Erro ao cancelar a assinatura ou ao atualizar o usuário:", error);
         return res.status(500).json({ error: 'Ocorreu um erro ao cancelar a assinatura ou ao atualizar o usuário.' });
      }
   } else {
      res.status(405).json({ error: 'Método não permitido' });
   }
};
