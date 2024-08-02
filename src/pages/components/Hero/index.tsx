import Link from "next/link";
import styles from "./styles.module.scss";

export default function Hero() {
  return (
    <>
      <div className={styles.container} id="inicio">
        <div className={styles.leftContainer}>
          <p className={styles.title}>
            Seja Membro do Clube Poupy e Economize todos os dias!
          </p>

          <p className={styles.description}>
            Junte-se a <span>milhares de pessoas</span> que estão{" "}
            <span>economizando</span> em suas compras diárias com o Clube Poupy.
            Por apenas R$9,90 por mês, tenha acesso a{" "}
            <span>descontos exclusivos</span> em todo o Brasil.
          </p>

          <div className={styles.buttonsContainer}>
            <Link href={"/register"}>
              <button className={styles.ctaButton}>Quero fazer parte</button>
            </Link>
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.light}></div>
        </div>
      </div>
    </>
  );
}
