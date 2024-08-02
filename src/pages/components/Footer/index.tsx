import Link from "next/link";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <p className={styles.title}>
          Comece a <span>economizar</span> já!
        </p>

        <hr className={styles.separetor} />

        <div className={styles.footer}>
          <div>
            <Link href={"/#inicio"}>
              <p className={styles.description}>Início</p>
            </Link>
            <Link href={"/#cliente"}>
              <p className={styles.description}>Faça parte</p>
            </Link>
            <Link href={"/#contato"}>
              <p className={styles.description}>Contato</p>
            </Link>
          </div>

          <div>
            <Link
              href={
                "https://www.instagram.com/clubepoupy?igsh=N2FrajBpeW1heTJo"
              }
            >
              <p className={styles.description}>Instagram</p>
            </Link>
            <Link
              href={
                "https://www.facebook.com/profile.php?id=61560889181740&mibextid=LQQJ4d"
              }
            >
              <p className={styles.description}>Facebook</p>
            </Link>
          </div>

          <div>
            <p className={styles.desc}>Dúvidas com sua conta ou pagamento?</p>
            <p className={styles.description}>atendimento@clubepoupy.com.br </p>
            <p className={styles.desc}>
              Dúvidas dentro do Clube ou algum com benefício?
            </p>
            <p className={styles.description}>
              atendimento@temmaisvantagens.com.br{" "}
            </p>
            <p className={styles.desc}>WhatsApp</p>
            <p className={styles.description}>(61) 99354-6881</p>
          </div>

          <img src="/logoClaraNova.png" alt="" />
        </div>

        <div className={styles.footerMobile}>
          <div className={styles.infosContent}>
            <div className={styles.leftInfo}>
              <div>
                <Link href={"/#Home"}>
                  <p className={styles.description}>Início</p>
                </Link>
                <Link href={"/#Form"}>
                  <p className={styles.description}>Faça parte</p>
                </Link>
                <Link href={"/#About"}>
                  <p className={styles.description}>Contato</p>
                </Link>
              </div>

              <div>
                <Link
                  href={
                    "https://www.instagram.com/clubepoupy?igsh=N2FrajBpeW1heTJo"
                  }
                >
                  <p className={styles.description}>Instagram</p>
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/profile.php?id=61560889181740&mibextid=LQQJ4d"
                  }
                >
                  <p className={styles.description}>Facebook</p>
                </Link>
              </div>
            </div>

            <div className={styles.rightInfo}>
              <p className={styles.desc}>Dúvidas com sua conta ou pagamento?</p>
              <p className={styles.description}>
                atendimento@clubepoupy.com.br{" "}
              </p>
              <p className={styles.desc}>
                Dúvidas dentro do Clube ou algum com benefício?
              </p>
              <p className={styles.description}>
                atendimento@temmaisvantagens.com.br{" "}
              </p>
              <p className={styles.desc}>WhatsApp</p>
              <p className={styles.description}>(61) 99354-6881</p>
            </div>
          </div>

          <img src="/logoClaraNova.png" alt="" />
        </div>
      </div>
    </>
  );
}
