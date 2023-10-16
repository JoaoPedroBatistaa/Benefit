import Head from "next/head";
import { useRef } from "react";
import styles from "../../styles/Login.module.scss";

import axios from "axios";

import MercadoPago from "../components/MercadoPago";

interface Login {
  id: string;
  Login: string;

  Senha: string;
}

export default function Checkout() {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const cardNumberRef = useRef<HTMLInputElement | null>(null);
  const expiryDateRef = useRef<HTMLInputElement | null>(null);
  const cvvRef = useRef<HTMLInputElement | null>(null);

  const nameValue =
    nameRef.current && nameRef.current instanceof HTMLInputElement
      ? nameRef.current.value
      : "";
  const emailValue = emailRef.current ? emailRef.current.value : "";
  const cardNumberValue = cardNumberRef.current
    ? cardNumberRef.current.value
    : "";
  const expiryDateValue = expiryDateRef.current
    ? expiryDateRef.current.value
    : "";
  const cvvValue = cvvRef.current ? cvvRef.current.value : "";

  const createSubscription = async (tokenizedCard: any) => {
    try {
      // Dados do plano
      const planData = {
        reason: "Clube de Benefícios - Benefit",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          repetitions: 12,
          billing_day: 10,
          billing_day_proportional: true,
          free_trial: {
            frequency: 1,
            frequency_type: "months",
          },
          transaction_amount: 9.99, // Valor correto
          currency_id: "ARS",
        },
        payment_methods_allowed: {
          payment_types: [{ id: "credit_card" }],
          payment_methods: [
            {
              id: "visa",
              name: "Visa",
              payment_type_id: "credit_card",
              status: "active",
              secure_thumbnail:
                "https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif",
              thumbnail:
                "http://img.mlstatic.com/org-img/MP3/API/logos/visa.gif",
              deferred_capture: "supported",
              settings: {
                bin: {
                  pattern: "^(4)",
                  exclusion_pattern:
                    "^(400163|400176|400178|400185|400199|423808|439267|471233|473200|476332|482481|451416|438935|(40117[8-9])|(45763[1-2])|457393|431274)",
                  installments_pattern:
                    "^(?!(417401|453998|426398|462437|451212|456188))",
                },
                card_number: {
                  length: 16,
                  validation: "standard",
                },
                security_code: {
                  mode: "mandatory",
                  length: 3,
                  card_location: "back",
                },
              },
              additional_info_needed: [],
              min_allowed_amount: 0.5,
              max_allowed_amount: 60000,
              accreditation_time: 2880,
              financial_institutions: {},
              processing_modes: "aggregator",
            },
          ],
        },
        // Adicione outros campos necessários aqui...
      };

      // Primeira requisição: Criação do Plano
      const planResponse = await axios.post(
        "https://api.mercadopago.com/preapproval_plan",
        planData,
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "Content-Type": "application/json",
          },
        }
      );

      const planID = planResponse.data.id;

      // Dados da assinatura
      const subscriptionData = {
        preapproval_plan_id: planID,
        payer_email: emailValue,
        card_token_id: tokenizedCard, // Supondo que você tenha tokenizado o cartão anteriormente
        reason: "Clube de Benefícios - Benefit",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 9.99,
          currency_id: "ARS",
        },
      };

      // Segunda requisição: Criação da Assinatura com o ID do plano
      const subscriptionResponse = await axios.post(
        "https://api.mercadopago.com/preapproval",
        subscriptionData,
        {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Assinatura criada com sucesso!", subscriptionResponse.data);
    } catch (error) {
      console.error("Erro ao criar assinatura:", error);
    }
  };

  return (
    <>
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');
        `}</style>
      </Head>

      <div className={styles.container}>
        <div className={styles.bg}>
          <div className={styles.ImageContainer}>
            <img className={styles.logo} src="/logoClara.png" alt="logo" />
          </div>
        </div>

        <div className={styles.checkoutContainer}>
          <div className={styles.steps}>
            <div className={styles.stepName}>
              <p className={styles.next}>Cadastro</p>
              <p className={styles.this}>Checkout</p>
            </div>
            <div className={styles.barC}></div>
          </div>
          <MercadoPago />
        </div>
      </div>
    </>
  );
}
