import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Logo from "../../../../public/logoClara.svg";

import styles from "../../../styles/Login.module.scss";

import { useRouter } from "next/router";
import { addDoc, collection, db } from "../../../../firebase";

function CadastroLogin() {
  const router = useRouter();

  // REQUISIÇÃO BLOQUEADA POR ERRO DE POLÍTICA DE CORS
  const senhaRef = useRef<HTMLInputElement>(null);
  const nomeRef = useRef<HTMLInputElement>(null);
  const cpfRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telefoneRef = useRef<HTMLInputElement>(null);

  const [payerId, setPayerId] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [nextPaymentDate, setNextPaymentDate] = useState<string | null>(null);

  useEffect(() => {
    const payerIdFromLocalStorage = localStorage.getItem("payerId");
    const paymentIdFromLocalStorage = localStorage.getItem("paymentId");
    const nextPaymentDateFromLocalStorage =
      localStorage.getItem("nextPaymentDate");

    if (payerIdFromLocalStorage) {
      setPayerId(payerIdFromLocalStorage);
    }

    if (paymentIdFromLocalStorage) {
      setPaymentId(paymentIdFromLocalStorage);
    }

    if (nextPaymentDateFromLocalStorage) {
      setNextPaymentDate(nextPaymentDateFromLocalStorage);
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/token", {
        method: "POST",
      });

      const data = await response.json();

      const accessToken = data.accessToken;

      const nome = nomeRef.current?.value || "";
      const cpf = cpfRef.current?.value || "";
      const email = emailRef.current?.value || "";
      const telefone = telefoneRef.current?.value || "";
      const senha = senhaRef.current?.value || "";

      const encryptedNome = await encryptData(nome);
      const encryptedCpf = await encryptData(cpf);
      const encryptedEmail = await encryptData(email);
      const encryptedTelefone = await encryptData(telefone);

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

        await addDoc(collection(db, "Clients"), {
          nomeCliente: nomeRef.current?.value.toString(),
          Telefone: telefoneRef.current?.value.toString(),
          cpf: cpfRef.current?.value.toString(),
          email: emailRef.current?.value.toString(),
          senha: senhaRef.current?.value.toString(),
          payerId: payerId ? payerId.toString() : "",
          paymentId: paymentId ? paymentId.toString() : "",
          nextPaymentDate: nextPaymentDate ? nextPaymentDate.toString() : "",
          link: url,
          Ativo: true,
        });

        localStorage.setItem("link", url);
        localStorage.setItem("senha", emailRef.current?.value.toString() || "");
        localStorage.setItem("email", senhaRef.current?.value.toString() || "");
        router.push("/Checkout");
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
    <div className="container-cadastroLogin">
      <div className="cadastro-login-img">
        <div className="cadastro-img"></div>
        <div className="cadastro-clube">
          <div className={styles.stepsC}>
            <div className={styles.stepName}>
              <p className={styles.this}>Cadastro</p>
              <p className={styles.next}>Checkout</p>
            </div>
            <div className={styles.bar}></div>
          </div>

          <div className="cadastro-formC">
            <div className="logo-slogan">
              <Image className="logo-benefit" src={Logo} alt="Logo-BeneFit" />
              <h2>Cadastre-se para acessar o clube de benefícios</h2>
            </div>
            <div className="cadastro-input">
              <form onSubmit={handleSubmit}>
                <div className="inf-input">
                  <label>
                    <p className="label">Nome</p>
                    <input ref={nomeRef} id="name" type="text" />
                  </label>
                  <label>
                    <p className="label">CPF</p>
                    <input ref={cpfRef} id="cpf" type="text" />
                  </label>

                  <label>
                    <p className="label">Telefone</p>
                    <input
                      ref={telefoneRef}
                      id="telefone"
                      type="tel"
                      name="telefone"
                    />
                  </label>

                  <label>
                    <p className="label">Email</p>
                    <input
                      ref={emailRef}
                      id="email"
                      type="email"
                      name="email"
                    />
                  </label>
                  <label>
                    <p className="label-field">Senha</p>
                    <input
                      ref={senhaRef}
                      id="senha"
                      type="password"
                      name="senha"
                    />
                  </label>
                  <button>Cadastrar</button>
                  <label htmlFor="">
                    <a
                      className="signed"
                      href="https://login.marktclub.com.br/auth/login?client_id=a41KceqtO0QbF7iRdh8561&response_type=code&redirect_uri=https://clubebenefit.com.br/login/retorno/api&audience=browser&scope=all&state=9a178377-496f-4e43-8af4-53455976890f"
                    >
                      Já sou cadastrado
                    </a>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroLogin;
