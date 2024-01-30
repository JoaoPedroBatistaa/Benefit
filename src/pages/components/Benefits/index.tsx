import styles from "./styles.module.scss";

export default function Benefits() {
  return (
    <>
      <div className={styles.container} id="Home">
        <div className={styles.leftContainer}>
          <p className={styles.title}>
            O que você ganha se tornando membro do Clube Benefit?
          </p>

          <div className={styles.item}>
            <img src="/sports.svg" alt="" />

            <p className={styles.description}>
              Descubra um mundo de descontos em saúde, educação e lazer com
              nossos parceiros de prestígio. Economize em cada compra, elevando
              sua experiência de consumo. A cada transação, a certeza de um
              negócio vantajoso.
            </p>
          </div>

          <div className={styles.item}>
            <img src="/health.svg" alt="" />

            <p className={styles.description}>
              Redescubra o prazer de economizar com cupons, recompensas de
              cashback e parcerias exclusivas online. Sua carteirinha digital é
              a passagem para um universo de descontos, sempre ao seu alcance.
            </p>
          </div>

          <div className={styles.item}>
            <img src="/old.svg" alt="" />

            <p className={styles.description}>
              No Clube Benefit, temos ofertas para todos, de jovens aficionados
              por compras online a experientes caçadores de ofertas. Participe
              de uma comunidade que valoriza a economia inteligente em todas as
              fases da vida.
            </p>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.light}></div>
        </div>
      </div>
    </>
  );
}
