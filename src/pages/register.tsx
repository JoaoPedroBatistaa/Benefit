import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../firebase";
import styles from "../styles/Create.module.scss";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [contaCriada, setContaCriada] = useState(false);
  const [mercadoPagoLink, setMercadoPagoLink] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [nomeNoCartao, setNomeNoCartao] = useState("");
  const [numeroDoCartao, setNumeroDoCartao] = useState("");
  const [mesVencimento, setMesVencimento] = useState("");
  const [anoVencimento, setAnoVencimento] = useState("");
  const [cvv, setCvv] = useState("");
  const [cep, setCep] = useState("");
  const [numeroEndereco, setNumeroEndereco] = useState("");

  useEffect(() => {
    if (router.query.contaCriada === "true") {
      setContaCriada(true);
      const nomeLocalStorage = localStorage.getItem("nomeCliente");
      const cpfLocalStorage = localStorage.getItem("cpf");
      const emailLocalStorage = localStorage.getItem("email");
      const telefoneLocalStorage = localStorage.getItem("Telefone");
      const clienteLocalStorage = localStorage.getItem("ClienteId");

      if (nomeLocalStorage) setNome(nomeLocalStorage);
      if (cpfLocalStorage) setCpf(cpfLocalStorage);
      if (emailLocalStorage) setEmail(emailLocalStorage);
      if (telefoneLocalStorage) setTelefone(telefoneLocalStorage);
      if (clienteLocalStorage) setClienteId(clienteLocalStorage);
    }
  }, [router.query]);

  async function emailJaCadastrado(email: unknown) {
    const q = query(collection(db, "Clients"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  function formatarCEP(cep: string) {
    cep = cep.replace(/\D/g, "");
    cep = cep.substring(0, 8);
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2");
    return cep;
  }

  function formatarNumeroDoCartao(numero: string) {
    numero = numero.replace(/\D/g, "");
    numero = numero.substring(0, 16);
    numero = numero.replace(/(\d{4})(\d)/g, "$1 $2");
    return numero;
  }

  function formatarCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.substring(0, 11);
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  }

  const formatarTelefone = (telefone: string) => {
    telefone = telefone.replace(/\D/g, "");
    if (telefone.length <= 10) {
      telefone = telefone.replace(
        /(\d{2})(\d{0,4})?(\d{0,4})/,
        (_match: any, g1: any, g2 = "", g3 = "") => {
          if (g3) {
            return `(${g1}) ${g2}-${g3}`;
          } else if (g2) {
            return `(${g1}) ${g2}`;
          } else {
            return `(${g1}`;
          }
        }
      );
    } else {
      telefone = telefone.substring(0, 11);
      telefone = telefone.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    return telefone;
  };

  const handleTelefoneChange = (e: { target: { value: any } }) => {
    const valorFormatado = formatarTelefone(e.target.value);
    setTelefone(valorFormatado);
  };

  const handleButtonClick = () => {
    if (contaCriada) {
      handlePayment();
    } else {
      handleRegisterClick();
    }
  };

  async function handleRegisterClick() {
    if (isLoading) return;
    setIsLoading(true);

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
      setIsLoading(false);
      return;
    }

    try {
      const clienteId = await criarClienteNoAsaas();
      const telefoneNumeros = telefone.replace(/\D/g, "");

      await addDoc(collection(db, "Clients"), {
        nomeCliente: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        Ativo: false,
        Telefone: telefoneNumeros,
        ClienteId: clienteId,
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
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
      toast.error("Erro ao finalizar o cadastro. Por favor, tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function criarClienteNoAsaas() {
    const clienteData = {
      nome,
      email,
      cpf,
      telefone,
    };

    const response = await fetch("/api/create-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clienteData),
    });

    if (!response.ok) {
      throw new Error("Falha ao criar cliente no ASAAS");
    }

    const responseData = await response.json();
    console.log("ID do cliente criado no ASAAS:", responseData.customer);
    setClienteId(responseData.customer);

    return responseData.customer;
  }

  async function updatePaymentIdForUser(email: unknown, paymentId: any) {
    try {
      const usersRef = collection(db, "Clients");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          const userDocRef = doc(db, "Clients", document.id);
          await updateDoc(userDocRef, { paymentId: paymentId });
        });
        console.log(
          "ID do pagamento atualizado com sucesso para o usuário:",
          email
        );
      } else {
        console.log("Usuário não encontrado:", email);
      }
    } catch (error) {
      console.error(
        "Erro ao atualizar ID do pagamento para o usuário:",
        email,
        error
      );
    }
  }

  async function handlePayment() {
    const paymentData = {
      billingType: "CREDIT_CARD",
      cycle: "MONTHLY",
      creditCard: {
        holderName: nomeNoCartao,
        number: numeroDoCartao.replace(/\s+/g, ""),
        expiryMonth: mesVencimento,
        expiryYear: anoVencimento,
        ccv: cvv,
      },
      creditCardHolderInfo: {
        name: nome,
        email: email,
        cpfCnpj: cpf.replace(/\D/g, ""),
        postalCode: cep.replace("-", ""),
        addressNumber: numeroEndereco,
        addressComplement: null,
        phone: telefone.replace(/\D/g, ""),
        mobilePhone: telefone.replace(/\D/g, ""),
      },
      customer: clienteId,
      nextDueDate: new Date(new Date().setDate(new Date().getDate() + 0))
        .toISOString()
        .split("T")[0],
      value: 9.9,
      description: "Poupy - Clube de Benefícios",
      creditCardToken: "",
    };

    try {
      console.log("Enviando dados de pagamento:", paymentData);
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar pagamento");
      }

      const responseData = await response.json();
      console.log("Pagamento finalizado com sucesso:", responseData);

      const paymentId = responseData.id;
      await updatePaymentIdForUser(email, paymentId);

      toast.success("Pagamento finalizado com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => router.push("/login"),
      });
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);

      toast.error("Erro ao criar pagamento. Por favor, tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

            {!contaCriada && (
              <>
                <p className={styles.label}>Seu nome</p>
                <input
                  className={styles.field}
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <p className={styles.label}>Email</p>
                <input
                  className={styles.field}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <p className={styles.label}>CPF</p>
                <input
                  className={styles.field}
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(formatarCPF(e.target.value))}
                />

                <p className={styles.label}>Telefone</p>
                <input
                  className={styles.field}
                  type="text"
                  value={telefone}
                  onChange={handleTelefoneChange}
                />

                <p className={styles.label}>Senha</p>
                <input
                  className={styles.field}
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </>
            )}

            {contaCriada && (
              <>
                <p className={styles.label}>Nome no cartão</p>
                <input
                  className={styles.field}
                  type="text"
                  value={nomeNoCartao}
                  onChange={(e) => setNomeNoCartao(e.target.value)}
                />

                <p className={styles.label}>Número do cartão</p>
                <input
                  className={styles.field}
                  type="text"
                  value={numeroDoCartao}
                  onChange={(e) =>
                    setNumeroDoCartao(formatarNumeroDoCartao(e.target.value))
                  }
                />

                <div className={styles.fields}>
                  <div>
                    <p className={styles.label}>Mês de vencimento</p>
                    <input
                      className={styles.fieldS}
                      type="number"
                      // @ts-ignore
                      maxLength="2"
                      value={mesVencimento}
                      onChange={(e) => setMesVencimento(e.target.value)}
                      placeholder="00"
                    />
                  </div>

                  <div>
                    <p className={styles.label}>Ano de vencimento</p>
                    <input
                      className={styles.fieldS}
                      type="number"
                      // @ts-ignore
                      maxLength="4"
                      value={anoVencimento}
                      onChange={(e) => setAnoVencimento(e.target.value)}
                      placeholder="0000"
                    />
                  </div>
                </div>

                <p className={styles.label}>CVV</p>
                <input
                  className={styles.field}
                  type="number"
                  // @ts-ignore
                  maxLength="3"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />

                <div className={styles.fields}>
                  <div>
                    <p className={styles.label}>Número do endereço</p>
                    <input
                      className={styles.fieldS}
                      type="number"
                      value={numeroEndereco}
                      onChange={(e) => setNumeroEndereco(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className={styles.label}>CEP</p>
                    <input
                      className={styles.fieldS}
                      type="text"
                      value={cep}
                      onChange={(e) => setCep(formatarCEP(e.target.value))}
                    />
                  </div>
                </div>
              </>
            )}

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
      </div>
    </>
  );
}
