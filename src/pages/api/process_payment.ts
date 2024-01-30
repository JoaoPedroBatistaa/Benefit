import axios from 'axios';

export default async (req: { method: string; body: { token: any; payer: { email: any; }; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; data?: any; error?: string; }): void; new(): any; }; }; }) => {
  if (req.method === 'POST') {
    const { token, payer: { email } } = req.body;

    // ID do plano já existente
    const planID = "2c9380848d30419b018d332708e5023f";

    // Criação da Assinatura
    const now = new Date();
    const startDate = now.toISOString();
    const endDate = new Date(now.setFullYear(now.getFullYear() + 2)).toISOString();

    console.log(email, "    ", token, "    ", planID);

    try {
      const subscriptionData = {
        preapproval_plan_id: planID,
        payer_email: email,
        card_token_id: token,
        reason: "Clube Benefit",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 9.90,
          currency_id: "BRL",
          start_date: startDate,
          end_date: endDate
        },
        back_url: "https://www.clubbenefit.com.br/",
        external_reference: "",
        status: "authorized"
      };

      const subscriptionResponse = await axios.post(
        'https://api.mercadopago.com/preapproval',
        subscriptionData,
        {
          headers: {
            'Authorization': `Bearer APP_USR-1815818743124652-080317-109bb5a9f9ff314ed07f81d1d040b4dd-1441472886`,
            'Content-Type': 'application/json',
          },
        }
      );

      const responseData = {
        ...subscriptionResponse.data,
        planID: planID
      };

      res.status(200).json({
        message: 'Assinatura criada com sucesso!',
        data: responseData,
      });

      console.log("===========================================================")
      console.log(subscriptionResponse.data);
      console.log("===========================================================")
    } catch (error) {
      console.error("Erro ao criar assinatura:", error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a assinatura.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
