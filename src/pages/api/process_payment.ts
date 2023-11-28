import axios from 'axios';

export default async (req: { method: string; body: { payer: any; token: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; message?: string; data?: any; }): void; new(): any; }; }; }) => {
  if (req.method === 'POST') {
    const { token, payer: { email } } = req.body;

    let planID;

    // Primeira requisição: Criação do Plano
    try {
      const planData = {


        reason: "Clube de Benefícios - Benefit",
        back_url: "https://web.whatsapp.com/",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          repetitions: 12,
          billing_day: 10,
          billing_day_proportional: true,
          free_trial: {
            frequency: 1,
            frequency_type: "months"
          },
          transaction_amount: 9.90, // Valor correto
          currency_id: "BRL"
        },
        "payment_methods_allowed": {
          "payment_types": [
            {}
          ],
          "payment_methods": [
            {}
          ]
        },
      };

      const planResponse = await axios.post(
        'https://api.mercadopago.com/preapproval_plan',
        planData,
        {
          headers: {
            'Authorization': `Bearer APP_USR-1815818743124652-080317-109bb5a9f9ff314ed07f81d1d040b4dd-1441472886`,
            'Content-Type': 'application/json',
          },
        }
      );

      planID = planResponse.data.id;



    } catch (error) {
      console.error("Erro ao criar plano:", error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar o plano.' });
    }

    // Segunda requisição: Criação da Assinatura
    const now = new Date();
    const startDate = now.toISOString();
    const endDate = new Date(now.setFullYear(now.getFullYear() + 2)).toISOString();

    console.log(email, "    ", token);

    try {
      const subscriptionData = {
        preapproval_plan_id: planID,
        payer_email: email,
        card_token_id: token,
        reason: "Clube de Benefícios - Benefit",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 9.90,
          currency_id: "BRL",
          start_date: startDate,
          end_date: endDate
        },
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

      res.status(200).json({
        message: 'Assinatura criada com sucesso!',
        data: subscriptionResponse.data,
      });

      console.log("===========================================================")
      console.log("===========================================================")
      console.log(subscriptionResponse.data);
      console.log("===========================================================")
      console.log("===========================================================")
    } catch (error) {
      console.error("Erro ao criar assinatura:", error);
      return res.status(500).json({ error: 'Ocorreu um erro ao criar a assinatura.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
