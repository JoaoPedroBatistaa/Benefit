import Image from "next/image";
import Link from "next/link";
import Logo from "../../../../public/logoClara.svg";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Perfil from "../perfil/perfil";

import Head from "next/head";

const Header = () => {
  const [link, setLink] = useState<string | null>(null);

  const router = useRouter();

  // Monitorar mudanças no localStorage
  useEffect(() => {
    const currentLink = localStorage.getItem("link");
    if (currentLink) {
      setLink(currentLink);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  async function handleSubmit(event: any) {
    event.preventDefault();

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
    } catch (error) {
      console.error("Erro ao obter o access token:", error);
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

      <section className="container-header">
        <Perfil
          isPerfilVisible={isPerfilVisible}
          onClosePerfil={handleClosePerfil}
          onLogoutPerfil={handleLogoutPerfil}
        ></Perfil>
        <div className="content-header-desktop">
          <Link href="/">
            <Image className="logo-benefit" src={Logo} alt="Logo-BeneFit" />
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
              <p id="item" onClick={handleSubmit}>
                Acessar clube
              </p>
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
