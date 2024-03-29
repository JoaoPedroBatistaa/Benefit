import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./perfil.module.scss";

import Head from "next/head";

import Lottie from "react-lottie";
import animationData from "../../../../public/animation/loadBenefit.json";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Perfil(props: any) {
  const { isPerfilVisible, onClosePerfil, onLogoutPerfil } = props;

  const router = useRouter();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    if (isPerfilVisible) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isPerfilVisible]);

  const [link, setLink] = useState<string | null>(null);
  const [nomeCliente, setNomeCliente] = useState<string | null>(null);
  const [cpf, setCpf] = useState<string | null>(null);
  const [telefone, setTelefone] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [ativo, setAtivo] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentNomeCliente = localStorage.getItem("nomeCliente");
      const currentCpf = localStorage.getItem("cpf");
      const currentTelefone = localStorage.getItem("Telefone");
      const currentEmail = localStorage.getItem("email");
      const currentPaymentId = localStorage.getItem("paymentId");
      const currentAtivo = localStorage.getItem("Ativo");
      const currentUserId = localStorage.getItem("userId");

      setNomeCliente(currentNomeCliente || null);
      setCpf(currentCpf || null);
      setTelefone(currentTelefone || null);
      setEmail(currentEmail || null);
      setPaymentId(currentPaymentId || null);
      setAtivo(currentAtivo || null);
    }
  }, []);

  const primeiraLetraNome = nomeCliente ? nomeCliente.charAt(0) : "";

  const cancelSubscription = () => {
    const userConfirmed = window.confirm(
      "Tem certeza que deseja cancelar o plano?"
    );

    if (userConfirmed) {
      const paymentId =
        typeof window !== "undefined"
          ? localStorage.getItem("paymentId") || ""
          : "";
      const userId =
        typeof window !== "undefined"
          ? localStorage.getItem("userId") || ""
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
          userId,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro ao cancelar o pagamento.");
          }
          return res.json();
        })
        .then((data) => {
          toast.success("Assinatura cancelada com sucesso!");
          console.log("Assinatura cancelada com sucesso!");
          handleLogout();
          onClosePerfil();
        })
        .catch((error) => {
          toast.error(`Erro ao cancelar a assinatura: ${error}`);
          console.log(`Erro ao cancelar a assinatura: ${error}`);
        });
    }
  };

  function formatarCPF(cpf: any) {
    if (!cpf || typeof cpf !== "string" || cpf.length !== 11) {
      return cpf;
    }

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function formatarTelefone(telefone: any) {
    if (!telefone || typeof telefone !== "string") {
      return telefone;
    }

    if (telefone.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      return telefone;
    }
  }

  const handleLogout = () => {
    localStorage.clear();
    onLogoutPerfil();
  };

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

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
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

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ToastContainer />

      {isPerfilVisible && (
        <div className={styles.Container}>
          {isLoading && (
            <div className={styles.shadow}>
              <div className={styles.loadingContainer}>
                <Lottie options={defaultOptions} height={128} width={128} />
              </div>
            </div>
          )}

          <div className={styles.ContainerLeft}></div>
          <div className={styles.ContainerRight}>
            <div className={styles.header}>
              <img
                src="/closePerfil.png"
                alt=""
                className={styles.back}
                onClick={onClosePerfil}
              />
              <p className={styles.titleHeader}>Meu perfil</p>
            </div>

            <div className={styles.content}>
              <div className={styles.perfilHead}>
                <div className={styles.icon}>
                  <div className={styles.perfilIcon}>
                    <p className={styles.iconLet}>{primeiraLetraNome}</p>
                  </div>
                </div>

                <p className={styles.name}>{nomeCliente}</p>
              </div>

              <div className={styles.fields}>
                <div className={styles.data}>
                  <p className={styles.dataData}>{email}</p>
                </div>

                <div className={styles.data}>
                  <p className={styles.dataData}>{formatarCPF(cpf)}</p>
                </div>

                <div className={styles.data}>
                  <p className={styles.dataData}>
                    {formatarTelefone(telefone)}
                  </p>
                </div>

                <div className={styles.data}>
                  <p
                    className={styles.dataData}
                    style={{ color: ativo === "true" ? "#08d40a" : "red" }}
                  >
                    {ativo === "true" ? "Ativo" : "Inativo"}
                  </p>
                </div>

                {/* {ativo === "true" && (
                  <p className={styles.cancel} onClick={cancelSubscription}>
                    Cancelar plano
                  </p>
                )} */}
              </div>

              <div className={styles.buttons}>
                <button
                  onClick={
                    ativo === "true"
                      ? handleSubmit
                      : () => router.push("/register?contaCriada=true")
                  }
                  className={styles.Button}
                >
                  {ativo === "true" ? "Acessar clube" : "Obter acesso"}
                </button>

                <button onClick={handleLogout} className={styles.outButton}>
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
