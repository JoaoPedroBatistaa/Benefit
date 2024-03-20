import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../../../../public/logoClara.svg";

import Perfil from "../perfil/perfil";

import { useRouter } from "next/router";

import Head from "next/head";
import styles from "./styles.module.scss";

import Lottie from "react-lottie";
import animationData from "../../../../public/animation/loadBenefit.json";

const HeaderMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [ativo, setAtivo] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  async function handleSubmit(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/token", {
        method: "POST",
      });

      const data = await response.json();
      const accessToken = data.accessToken;

      const encryptedNome = await encryptData(nomeFromStorage);
      const encryptedCpf = await encryptData(cpfFromStorage);
      const encryptedEmail = await encryptData(emailFromStorage);
      const encryptedTelefone = await encryptData(telefoneFromStorage);

      await loginApi(
        accessToken,
        encryptedNome,
        encryptedCpf,
        encryptedEmail,
        encryptedTelefone
      );

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Erro ao realizar o login:", error);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentAtivo = localStorage.getItem("Ativo");
      setAtivo(currentAtivo);
      if (currentAtivo) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    const linkValue = localStorage.getItem("link");
    if (linkValue) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  let linkValue = "/";
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      linkValue = localStorage.getItem("link") || "/";
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }
  const validLink = linkValue;

  // LOGIN VIA API

  const nomeFromStorage =
    typeof window !== "undefined"
      ? localStorage.getItem("nomeCliente") || ""
      : "";
  const cpfFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("cpf") || "" : "";
  const telefoneFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("Telefone") || "" : "";
  const emailFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("email") || "" : "";
  const senhaFromStorage =
    typeof window !== "undefined" ? localStorage.getItem("senha") || "" : "";

  async function encryptData(data: string) {
    try {
      const response = await fetch("/api/encrypt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      const { encrypted } = await response.json();

      return encrypted;
    } catch (error) {
      console.error("Erro ao encriptar os dados:", error);
    }
  }

  async function loginApi(
    accessToken: string,
    nome: string,
    cpf: string,
    email: string,
    telefone: string
  ) {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accessToken,
          nome,
          cpf,
          email,
          telefone,
        }),
      });

      const data = await response.json();

      console.log(data);
      console.log(data.link);

      if (!response.ok) {
        alert(data.error);
        return;
      }

      if (data && data.link && data.link.dado && data.link.dado.link) {
        const url = data.link.dado.link;

        window.location.href = url;
      } else {
        console.log(
          "URL de redirecionamento não encontrada na resposta do servidor"
        );
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  }

  // CANCELAR PAGAMENTO

  // Obter o paymentId do localStorage ou de onde você armazenou
  const paymentId =
    typeof window !== "undefined"
      ? localStorage.getItem("paymentId") || ""
      : "";

  // if (!paymentId) {
  //   console.log("Payment ID não encontrado.");
  //   return;
  // }

  const cancelSubscription = () => {
    const userConfirmed = window.confirm(
      "Tem certeza que deseja cancelar o plano?"
    );

    if (userConfirmed) {
      // O código de cancelamento do plano que você já tem vai aqui
      const paymentId =
        typeof window !== "undefined"
          ? localStorage.getItem("paymentId") || ""
          : "";

      if (!paymentId) {
        console.error("Payment ID não encontrado.");
        return;
      }

      fetch("/api/cancel_payment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentId,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro ao cancelar o pagamento.");
          }
          return res.json();
        })
        .then((data) => {
          alert(`Assinatura cancelada com sucesso: ${data.message}`);
        })
        .catch((error) => {
          alert(`Erro ao cancelar a assinatura: ${error}`);
        });
    }
  };

  const [isPerfilVisible, setIsPerfilVisible] = useState(false);

  const togglePerfilVisibility = () => {
    setIsPerfilVisible(!isPerfilVisible);
  };

  const handleClosePerfil = () => {
    setIsPerfilVisible(false);
    // setIsLoggedIn(false);
  };

  const handleLogoutPerfil = () => {
    setIsPerfilVisible(false);
    setIsLoggedIn(false);
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      {isLoading && (
        <div className="shadow">
          <div className="loadingContainer">
            <Lottie options={defaultOptions} height={128} width={128} />
          </div>
        </div>
      )}

      <div className={styles.perfilHead}>
        <div className={styles.navToggle} onClick={() => setIsOpen(!isOpen)}>
          <img src="/menu.svg" alt="" />
        </div>

        <Link href="/">
          <Image className={styles.logo} src={Logo} alt="Logo-BeneFit" />
        </Link>
      </div>

      <div className={`${styles.navBar} ${isOpen ? styles.open : ""}`}>
        <img
          src="/close.svg"
          alt="Fechar"
          className={styles.close}
          onClick={() => setIsOpen(false)}
        />

        <div className={styles.nav}>
          <div
            className={styles.navItem}
            onClick={() => router.push("/#inicio")}
          >
            Início
          </div>
          <div
            className={styles.navItem}
            onClick={() => router.push("/#cliente")}
          >
            Faça parte
          </div>
          <div
            className={styles.navItem}
            onClick={() => router.push("/#contato")}
          >
            Contato
          </div>

          {isLoggedIn ? (
            ativo === "true" ? (
              <p className={styles.navItem} onClick={handleSubmit}>
                Acessar clube
              </p>
            ) : (
              <Link
                href={{
                  pathname: "/register",
                  query: { contaCriada: "true" },
                }}
              >
                {" "}
                <p className={styles.navItem}>Obter acesso</p>
              </Link>
            )
          ) : (
            <Link href="/login">
              <p className={styles.navItem}>Fazer login</p>
            </Link>
          )}
        </div>

        {isLoggedIn ? (
          <button
            className={styles.loginButton}
            onClick={togglePerfilVisibility}
          >
            Meu perfil
          </button>
        ) : (
          <Link href="/login">
            <button className={styles.loginButton}>Obter acesso</button>
          </Link>
        )}
      </div>

      <Perfil
        isPerfilVisible={isPerfilVisible}
        onClosePerfil={handleClosePerfil}
        onLogoutPerfil={handleLogoutPerfil}
      />
    </>
  );
};

export default HeaderMobile;
