import styles from "./styles.module.scss";

export default function Hero() {
  return (
    <>
      <div className={styles.container} id="Home">
        <div className={styles.leftContainer}>
          <p className={styles.title}>
            Revitalize suas compras com o poder do Cashback!
          </p>

          <p className={styles.description}>
            Transforme cada compra numa <span>oportunidade de economizar</span>{" "}
            . Com cashback, parte do dinheiro que você gasta volta para você,
            oferecendo descontos e benefícios em futuras aquisições. <br />
            <br /> Compre o que ama e seja <span>recompensado</span> . Descubra
            como é gratificante fazer seu dinheiro valer mais!
          </p>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.light}></div>
        </div>
      </div>
    </>
  );
}
