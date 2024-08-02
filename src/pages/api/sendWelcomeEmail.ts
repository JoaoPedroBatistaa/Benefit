// pages/api/sendWelcomeEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { sendWelcomeEmail } from '../../server/sendWelcomeEmail';

export default async (req: NextApiRequest, res: NextApiResponse) => {
   if (req.method === 'POST') {
      try {
         const { email, name } = req.body;
         await sendWelcomeEmail({ email, name });
         res.status(200).json({ success: true });
      } catch (error) {
         console.error('Erro ao enviar e-mail de boas-vindas:', error);
         res.status(500).json({ error: 'Falha ao enviar e-mail de boas-vindas' });
      }
   } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
};
