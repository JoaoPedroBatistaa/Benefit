import styles from "./styles.module.scss";

export default function Hero() {
  return (
    <>
      <div className={styles.container} id="Home">
        <div className={styles.leftContainer}>
          <p className={styles.title}>
            Tenha o Clube Poupy na palma da sua mão!
          </p>

          <p className={styles.description}>
            Baixe agora o app oficial do <span>maior clube de benefícios</span>{" "}
            e descontos da América Latina, disponível na App Store e Google
            Play. Com ele, você acessa todos os nossos descontos exclusivos,
            acumula cashback e transforma suas compras em{" "}
            <span>vantagens reais</span> , onde quer que esteja. Experimente o
            jeito mais fácil e inteligente de economizar. <br /> <br /> Tenha o
            Clube Poupy sempre com você!
          </p>

          <div className={styles.dowloads}>
            <a
              href="https://play.google.com/store/apps/details?id=com.temvantagens.poupy&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/googlePlay.png" alt="Google Play" />
            </a>
            <a
              href="https://apps.apple.com/br/app/clube-poupy/id6503719320"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/appStore.png" alt="App Store" />
            </a>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.light}></div>
        </div>
      </div>
    </>
  );
}
