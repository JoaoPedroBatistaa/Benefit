import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

type Data = {
   message: string;
   success?: boolean;
   nome?: string;
   email?: string;
};

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse<Data>
) {
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Método não permitido' });
   }

   const { cpf, senha } = req.body;

   if (!cpf || !senha) {
      return res.status(400).json({ message: 'CPF e senha são obrigatórios' });
   }

   // Remover sinais não numéricos do CPF
   const cleanedCpf = cpf.replace(/\D/g, '');

   if (cleanedCpf.length !== 11) {
      return res.status(400).json({ message: 'CPF inválido. Verifique e tente novamente.' });
   }

   try {
      const clientsRef = collection(db, 'Clients');
      const q = query(clientsRef, where('senha', '==', senha), where('Ativo', '==', true));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
         return res.status(401).json({ message: 'Senha incorreta ou conta inativa. Verifique suas credenciais.' });
      }

      // Verificação do CPF armazenado no banco (removendo sinais não numéricos)
      const validUser = querySnapshot.docs.find((doc) => {
         const storedCpf = doc.data().cpf.replace(/\D/g, '');
         return storedCpf === cleanedCpf;
      });

      if (!validUser) {
         return res.status(404).json({ message: 'CPF não encontrado. Verifique e tente novamente.' });
      }

      // Sucesso no login
      const userData = validUser.data();
      const nomeCliente = userData.nomeCliente;
      const email = userData.email;

      return res.status(200).json({
         message: 'Login liberado',
         success: true,
         nome: nomeCliente,
         email: email
      });
   } catch (error) {
      console.error('Erro ao verificar login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.' });
   }
}
