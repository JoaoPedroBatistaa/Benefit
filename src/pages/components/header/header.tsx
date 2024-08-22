import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../../../public/animation/loadBenefit.json";
import Perfil from "../perfil/perfil";

const Header = () => {
  const [link, setLink] = useState<string | null>(null);
  const router = useRouter();
  const [ativo, setAtivo] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ativoPorApi, setAtivoPorApi] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const currentPaymentId = localStorage.getItem("paymentId");
    const currentManual = localStorage.getItem("manual");
    const currentAtivo = localStorage.getItem("Ativo");

    if (currentManual) {
      setAtivo(currentAtivo === "true" ? "Ativo" : "Inativo");
      setIsLoggedIn(true);
    } else if (currentPaymentId) {
      checkSubscriptionStatus(currentPaymentId);
    }
  }, []);

  const checkSubscriptionStatus = async (paymentId: string) => {
    try {
      const response = await fetch("/api/checkSubscriptionStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId }),
      });

      const data = await response.json();
      if (data.status === "ACTIVE") {
        setAtivo("Ativo");
        setAtivoPorApi(true);
        setIsLoggedIn(true);
      } else {
        setAtivo("Inativo");
        setAtivoPorApi(false);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Erro ao verificar status da assinatura:", error);
      setAtivo("Erro ao carregar status");
      setAtivoPorApi(false);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
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

      const encryptedNome = await encryptData(
        localStorage.getItem("nomeCliente") || ""
      );
      const encryptedCpf = await encryptData(localStorage.getItem("cpf") || "");
      const encryptedEmail = await encryptData(
        localStorage.getItem("email") || ""
      );
      const encryptedTelefone = await encryptData(
        localStorage.getItem("Telefone") || ""
      );

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

  const [isPerfilVisible, setIsPerfilVisible] = useState(false);

  const togglePerfilVisibility = () => {
    setIsPerfilVisible(!isPerfilVisible);
  };

  const handleClosePerfil = () => {
    setIsPerfilVisible(false);
  };

  const handleLogoutPerfil = () => {
    setIsPerfilVisible(false);
    handleLogout();
  };

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section className="container-header">
        {isLoading && (
          <div className="shadow">
            <div className="loadingContainer">
              <Lottie options={defaultOptions} height={128} width={128} />
            </div>
          </div>
        )}

        <Perfil
          isPerfilVisible={isPerfilVisible}
          onClosePerfil={handleClosePerfil}
          onLogoutPerfil={handleLogoutPerfil}
        ></Perfil>
        <div className="content-header-desktop">
          <Link href="/">
            <img
              className="logo-benefit"
              src="/logoBenefit.png"
              alt="Logo-BeneFit"
            />
          </Link>
          <div className="nav-items-desktop">
            <a
              id="item"
              onClick={() => {
                router.push("/#inicio");
              }}
            >
              Início
            </a>

            <a
              id="item"
              onClick={() => {
                router.push("/#cliente");
              }}
            >
              Faça parte
            </a>

            <a
              id="item"
              onClick={() => {
                router.push("/#contato");
              }}
            >
              Contato
            </a>

            {isLoggedIn ? (
              ativo === "Ativo" ? (
                <p id="item" onClick={handleSubmit}>
                  Acessar clube
                </p>
              ) : (
                <Link
                  href={{
                    pathname: "/register",
                    query: { contaCriada: "true" },
                  }}
                >
                  <p id="item">Obter acesso</p>
                </Link>
              )
            ) : (
              <Link href="/login">
                <p id="item">Fazer login</p>
              </Link>
            )}
            {isLoggedIn ? (
              <button className="Login" onClick={togglePerfilVisibility}>
                Meu perfil
              </button>
            ) : (
              <Link href="/register">
                <button className="Login">Obter acesso</button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
