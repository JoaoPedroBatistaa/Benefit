
export default async function handler(req: { method: string; body: { name: any; email: any; mobile_phone: any; document: any; address: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {
   if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
   }

   const { name, email, mobile_phone, document, address } = req.body;

   const body = {
      name,
      person_type: 'NATURAL',
      email,
      mobile_phone,
      document,
      address,
   };

   try {
      const response = await fetch('https://api.contaazul.com/v1/customers', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CONTA_AZUL_ACCESS_TOKEN}`,
         },
         body: JSON.stringify(body),
      });

      if (!response.ok) {
         throw new Error('Failed to create customer on ContaAzul');
      }

      const data = await response.json();
      res.status(200).json(data);
   } catch (error) {
      console.error('Error creating customer on ContaAzul:', error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
}
