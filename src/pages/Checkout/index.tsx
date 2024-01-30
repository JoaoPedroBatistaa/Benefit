import Head from "next/head";
import { useEffect } from "react";
import styles from "../../styles/Login.module.scss";
import MercadoPago from "../components/MercadoPago";

export default function Checkout() {
  useEffect(() => {
    const script = document.createElement("script");

    script.type = "text/javascript";
    script.async = true;
    script.src = "//secure.mlstatic.com/mptools/render.js";

    // Append the script to the 'body' and remove it when the component unmounts
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

          {/* Botão de Assinatura do Mercado Pago */}
          <a
            href="https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380848d30419b018d332708e5023f"
            //@ts-ignore
            name="MP-payButton"
            className="blue-ar-l-rn-none"
          >
            Suscribirme
          </a>
        </div>
      </div>
    </>
  );
}
