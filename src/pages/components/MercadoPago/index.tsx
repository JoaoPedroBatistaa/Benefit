// components/MercadoPago/index.tsx

import { loadMercadoPago } from "@mercadopago/sdk-js";
import { useRouter } from "next/router";
import { useEffect } from "react";

import styles from "../../../styles/Login.module.scss";

import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { collection, db } from "../../../../firebase";

interface Window {
  MercadoPago: any;
}

export default function MercadoPago() {
  const router = useRouter();

  let emailReg: string | null = null;
  let senhaReg: string | null = null;

  if (typeof window !== "undefined") {
    emailReg = window.localStorage.getItem("email");
    senhaReg = window.localStorage.getItem("senha");
  }

  async function verificarUsuarioExistente(email: string, senha: string) {
    const q = query(
      collection(db, "Clients"),
      where("email", "==", email),
      where("senha", "==", senha)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {
      console.error("Usuário não encontrado");
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    if (!userDoc) {
      console.error("Documento do usuário não encontrado");
      return null;
    }

    // console.log(userDoc.id);
    return userDoc.id;
  }

  async function inserirDadosNoFirebase(
    userId: string,
    payerId: any,
    paymentId: any,
    nextPaymentDate: any,
    planID: any
  ) {
    const dados = {
      payerId,
      paymentId,
      nextPaymentDate,
      planID,
    };

    await setDoc(doc(db, "Clients", userId), dados, { merge: true });
    console.log("Dados inseridos no Firebase com sucesso");
  }

  useEffect(() => {
    const iniciarProcesso = async () => {
      if (!emailReg || !senhaReg) {
        console.error("Email ou senha não disponíveis");
        return;
      }

      const userID = await verificarUsuarioExistente(emailReg, senhaReg);
      if (!userID) {
        return;
      }

      await loadMercadoPago();
      const mp = new window.MercadoPago(
        "APP_USR-417396bf-ccb9-4eab-bd11-5e50c1684ba6"
      );

      const cardForm = mp.cardForm({
        amount: "9.99",
        iframe: true,
        form: {
          id: "form-checkout",
          cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
          },
          expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YY",
          },
          securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
          },
          cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular do cartão",
          },
          issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emissor",
          },
          installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
          },
          identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
          },
          identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número do CPF",
          },
          cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
          },
        },
        callbacks: {
          onFormMounted: (error: any) => {
            if (error)
              return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
          },
          onSubmit: (event: any) => {
            event.preventDefault();
            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              amount,
              token,
              installments,
              identificationNumber,
              identificationType,
            } = cardForm.getCardFormData();

            fetch("/api/process_payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Clube de Benefícios - Benefit",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("payerId", data.data.payer_id);
                localStorage.setItem("paymentId", data.id);
                localStorage.setItem(
                  "nextPaymentDate",
                  data.data.next_payment_date
                );
                localStorage.setItem("planID", data.planID);

                inserirDadosNoFirebase(
                  userID,
                  data.data.payer_id,
                  data.id,
                  data.data.next_payment_date,
                  data.planID
                );

                router.push("/");
              })
              .catch((error) => {
                console.error("Erro ao processar o pagamento:", error);
              });
          },
          onFetching: (resource: any) => {
            console.log("Fetching resource: ", resource);

            const progressBar = document.querySelector(".progress-bar");
            if (progressBar) {
              progressBar.removeAttribute("value");
              return () => {
                progressBar.setAttribute("value", "0");
              };
            }
          },
        },
      });
    };
    iniciarProcesso();
  }, []);

  return (
    <>
      <style jsx>
        {`
          #form-checkout {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            max-width: 70%;
          }

          #form-checkout__submit {
            max-width: 94%;
          }

          @media only screen and (max-width: 768px) {
            #form-checkout {
              display: flex;
              flex-direction: column;
              gap: 1.5rem;
              max-width: 100%;

              width: 100vw;

              padding-left: 15rem;
            }

            #form-checkout__submit {
              max-width: 100%;
            }
          }

          .container {
            height: 18px;
            display: inline-block;
            border: 1px solid rgb(118, 118, 118);
            border-radius: 2px;
            padding: 1px 2px;
          }

          .selectForm {
            display: none;
          }

          .valueContainer {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            width: 95%;
          }

          .valueContainer p {
            font-size: 20px;
            font-weight: 600;

            font-family: "Outfit", sans-serif;
          }
        `}
      </style>

      <form id="form-checkout">
        <div id="form-checkout__cardNumber" className={styles.fieldC}></div>
        <div id="form-checkout__expirationDate" className={styles.fieldC}></div>
        <div id="form-checkout__securityCode" className={styles.fieldC}></div>
        <input
          type="text"
          id="form-checkout__cardholderName"
          className={styles.fieldC}
        />
        <select id="form-checkout__issuer" className="selectForm"></select>
        <select
          id="form-checkout__installments"
          className="selectForm"
        ></select>
        <select
          id="form-checkout__identificationType"
          className="selectForm"
        ></select>
        <input
          type="text"
          id="form-checkout__identificationNumber"
          className={styles.fieldC}
        />
        <input
          type="email"
          id="form-checkout__cardholderEmail"
          className={styles.fieldC}
        />

        <div className="valueContainer">
          <p>Valor total</p>
          <p>R$ 9,90</p>
        </div>

        <button type="submit" id="form-checkout__submit">
          Pagar
        </button>
        <progress value="0" className="progress-bar">
          Carregando...
        </progress>
      </form>
    </>
  );
}
