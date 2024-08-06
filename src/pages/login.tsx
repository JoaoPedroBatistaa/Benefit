import Link from "next/link";
import { useEffect, useState } from "react";

import Head from "next/head";
import styles from "../styles/Login.module.scss";

import { useRouter } from "next/router";

import { getDocs } from "firebase/firestore";
import { collection, db } from "../../firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Login {
  id: string;
  email: string;

  senha: string;

  link: string;

  Telefone: string;

  cpf: string;

  nomeCliente: string;

  paymentId: string;
  ClienteId: string;

  Ativo: boolean;
  manual: boolean;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [teste, setTeste] = useState<Login[]>([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const dbCollection = collection(db, "Clients");
      const loginSnapshot = await getDocs(dbCollection);
      const loginList = loginSnapshot.docs.map((doc) => {
        const data = doc.data();
        const login: Login = {
          id: doc.id,
          email: data.email,
          senha: data.senha,
          link: data.link,
          Telefone: data.Telefone,
          nomeCliente: data.nomeCliente,
          Ativo: data.Ativo,
          cpf: data.cpf,
          paymentId: data.paymentId,
          ClienteId: data.ClienteId,
          manual: data.manual,
        };
        return login;
      });
      setTeste(loginList);
    };
    fetchData();
  }, []);

  const handleLogin = () => {
    const user = teste.find(
      (user) => user.email === email && user.senha === senha
    );

    if (user) {
      setUserId(user.id);

      localStorage.setItem("userId", user.id);
      localStorage.setItem("nomeCliente", user.nomeCliente);
      localStorage.setItem("cpf", user.cpf);
      localStorage.setItem("Telefone", user.Telefone);
      localStorage.setItem("email", user.email);
      localStorage.setItem("senha", user.senha);
      localStorage.setItem("paymentId", user.paymentId);
      localStorage.setItem("ClienteId", user.ClienteId);
      localStorage.setItem("Ativo", user.Ativo.toString());

      if (user.manual !== undefined) {
        localStorage.setItem("manual", user.manual.toString());
      }
      toast.success("Login bem-sucedido!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      toast.error("Email ou senha incorretos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError("Email ou senha incorretos");
    }
  };

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
        <div className={styles.ImageContainer}>
          <img className={styles.logo} src="/logoBenefit.png" alt="logo" />
          <div className={styles.Social}>
            <Link href="https://www.facebook.com/profile.php?id=61560889181740&mibextid=LQQJ4d">
              <img src="facebook.svg" alt="facebook" />
            </Link>
            <Link href="https://www.instagram.com/clubepoupy?igsh=N2FrajBpeW1heTJo">
              <img src="insatgram.svg" alt="instagram" />
            </Link>
          </div>
        </div>

        <div className={styles.LoginContainer}>
          <div className={styles.Login}>
            <p className={styles.title}>Login</p>
            <p className={styles.subtitle}>Informe seu acesso para entrar</p>

            <p className={styles.label}>Email</p>
            <input
              id="email"
              className={styles.field}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className={styles.label}>Senha</p>
            <input
              id="senha"
              className={styles.field}
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            {/* <Link href="/recuperar" className={styles.forget}>
              Esqueci minha senha
            </Link> */}

            <button className={styles.button} onClick={handleLogin}>
              Entrar
            </button>

            <div className={styles.linha}></div>

            <div className={styles.sign}>
              <p className={styles.signNew}>Ainda não tem uma conta? </p>
              <Link href="/register" className={styles.create}>
                Criar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
