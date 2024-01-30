import Link from "next/link";
import { useState } from "react";

import Head from "next/head";

import styles from "../styles/Create.module.scss";

import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [contaCriada, setContaCriada] = useState(false);
  const [mercadoPagoLink, setMercadoPagoLink] = useState("");

  async function emailJaCadastrado(email: string) {
    const q = query(collection(db, "Clients"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  function formatarCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, "");

    cpf = cpf.substring(0, 11);

    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return cpf;
  }

  const handleButtonClick = () => {
    if (contaCriada) {
      window.location.href = mercadoPagoLink;
    } else {
      handleRegisterClick();
    }
  };

  async function handleRegisterClick() {
    if (senha !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const jaCadastrado = await emailJaCadastrado(email);
    if (jaCadastrado) {
      toast.error("Erro: Email já cadastrado", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    await addDoc(collection(db, "Clients"), {
      nomeCliente: nome,
      cpf: cpf,
      email: email,
      senha: senha,
      Ativo: true,
    });

    toast.success("Usuário cadastrado com sucesso!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setContaCriada(true);
    setMercadoPagoLink(
      "https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=2c9380848d30419b018d332708e5023f"
    );
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

      <div className={styles.Container}>
        <div className={styles.LoginContainer}>
          <div className={styles.Login}>
            <p className={styles.title}>
              {contaCriada ? "Finalizar assinatura" : "Criar conta"}
            </p>
            <p className={styles.subtitle}>
              {contaCriada
                ? "Quase lá! Finalize o pagamento e complete sua assinatura."
                : "Preencha abaixo para criar conta"}
            </p>

            <p className={styles.label}>Seu nome</p>
            <input
              className={styles.field}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={contaCriada}
            />

            <p className={styles.label}>Email</p>
            <input
              className={styles.field}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={contaCriada}
            />

            <p className={styles.label}>CPF</p>
            <input
              className={styles.field}
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatarCPF(e.target.value))}
              disabled={contaCriada}
            />

            <p className={styles.label}>Senha</p>
            <input
              className={styles.field}
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={contaCriada}
            />

            <p className={styles.label}>Confirmar Senha</p>
            <input
              className={styles.field}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={contaCriada}
            />

            <button
              className={styles.button}
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {contaCriada ? "Finalizar assinatura" : "Criar conta"}
            </button>

            <div className={styles.linha}></div>
            {!contaCriada && (
              <div className={styles.sign}>
                <p className={styles.signNew}>Já possui uma conta?</p>
                <Link href="/login" className={styles.create}>
                  Fazer login
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={styles.ImageContainer}>
          <img className={styles.logo} src="/logo.svg" alt="logo" />
          <div className={styles.Social}>
            <Link href="/https://www.facebook.com/share/7dmxQuH9X6u3Sqh9/?mibextid=WC7FNe">
              <img src="facebook.svg" alt="facebook" />
            </Link>
            <Link href="/https://www.instagram.com/clubebenefit?igsh=MThoM2FwcjN5ODA3NA==">
              <img src="insatgram.svg" alt="instagram" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
