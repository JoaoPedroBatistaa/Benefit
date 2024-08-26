import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: { method: string; body: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string[]) => void; }) {
   if (req.method === 'DELETE') {
      const { id } = req.body;
      console.log("Recebido id para cancelamento:", id);

      const apiUrl = `https://asaas.com/api/v3/subscriptions/${id}`;
      console.log("Fazendo requisição para ASAAS API:", apiUrl);

      const accessToken = process.env.ASAAS_ACCESS_TOKEN;
      if (!accessToken) {
         console.error("ASAA_ACCESS_TOKEN não está definido");
         res.status(500).json({ message: 'Erro de configuração do servidor' });
         return;
      }

      try {
         const apiResponse = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
               'accept': 'application/json',
               'content-type': 'application/json',
               'access_token': accessToken
            }
         });

         console.log("Resposta da API ASAAS recebida, status:", apiResponse.status);

         if (!apiResponse.ok) {
            console.error("Resposta da API ASAAS não foi ok:", apiResponse.statusText);
            throw new Error(`Erro na requisição para a API do ASAAS: ${apiResponse.statusText}`);
         }

         const data = await apiResponse.json();
         console.log("Dados recebidos da API ASAAS:", data);
         res.status(200).json(data);
      } catch (error) {
         console.error("Erro ao fazer requisição para a API do ASAAS:", error);
         res.status(500).json({ message: 'Erro ao se comunicar com a API do ASAAS' });
      }
   } else {
      console.warn(`Método não permitido: ${req.method}`);
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
   }
}
