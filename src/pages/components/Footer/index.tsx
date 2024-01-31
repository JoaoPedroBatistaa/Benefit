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
                "https://www.instagram.com/clubebenefit?igsh=MThoM2FwcjN5ODA3NA%3D%3D"
              }
            >
              <p className={styles.description}>Instagram</p>
            </Link>
            <Link
              href={
                "https://www.facebook.com/profile.php?id=100092854661969&mibextid=WC7FNe"
              }
            >
              <p className={styles.description}>Facebook</p>
            </Link>
          </div>

          <div>
            <p className={styles.desc}>E-mail</p>
            <p className={styles.description}>
              atendimento@temmaisvantagens.com.br
            </p>
            <p className={styles.desc}>WhatsApp</p>
            <p className={styles.description}>(61) 99354-6881</p>
          </div>

          <img src="/logoEscura 2.png" alt="" />
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
                    "https://www.instagram.com/clubebenefit?igsh=MThoM2FwcjN5ODA3NA%3D%3D"
                  }
                >
                  <p className={styles.description}>Instagram</p>
                </Link>
                <Link
                  href={
                    "https://www.facebook.com/profile.php?id=100092854661969&mibextid=WC7FNe"
                  }
                >
                  <p className={styles.description}>Facebook</p>
                </Link>
              </div>
            </div>

            <div className={styles.rightInfo}>
              <p className={styles.desc}>E-mail</p>
              <p className={styles.description}>clubebenefit@gmail.com</p>
              <p className={styles.desc}>WhatsApp</p>
              <p className={styles.description}>(61) 99354-6881</p>
            </div>
          </div>

          <img src="/logoEscura 2.png" alt="" />
        </div>
      </div>
    </>
  );
}
