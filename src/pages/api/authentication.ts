import { collection, getDocs, query, where } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../firebase';

type Data = {
   message: string;
   success?: boolean;
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

   const cleanedCpf = cpf.replace(/\D/g, '');

   try {
      const clientsRef = collection(db, 'Clients');
      const q = query(
         clientsRef,
         where('cpf', '==', cleanedCpf),
         where('senha', '==', senha),
         where('Ativo', '==', true)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
         return res.status(401).json({ message: 'CPF ou senha inválidos, ou conta inativa' });
      }

      return res.status(200).json({ message: 'Login liberado', success: true });
   } catch (error) {
      console.error('Erro ao verificar login:', error);
      return res.status(500).json({ message: 'Erro interno do servidor' });
   }
}
