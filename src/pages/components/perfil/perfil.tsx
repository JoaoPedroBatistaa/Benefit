import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./perfil.module.scss";

export default function Perfil(props: any) {
  const { isPerfilVisible, onClosePerfil } = props;

  const router = useRouter();

  // scroll;
  useEffect(() => {
    if (isPerfilVisible) {
      // Bloqueie o scroll apenas quando isPerfilVisible for true
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      // Restaure o scroll quando isPerfilVisible for false
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    // Função para remover o bloqueio do scroll ao desmontar o componente
    return () => {
      // Restaure o scroll ao seu estado anterior
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

  useEffect(() => {
    // Verifica se o localStorage está disponível no navegador
    if (typeof window !== "undefined") {
      const currentLink = localStorage.getItem("link");
      const currentNomeCliente = localStorage.getItem("nomeCliente");
      const currentCpf = localStorage.getItem("cpf");
      const currentTelefone = localStorage.getItem("Telefone");
      const currentEmail = localStorage.getItem("email");
      const currentPaymentId = localStorage.getItem("paymentId");
      const currentAtivo = localStorage.getItem("Ativo");

      setLink(currentLink || null);
      setNomeCliente(currentNomeCliente || null);
      setCpf(currentCpf || null);
      setTelefone(currentTelefone || null);
      setEmail(currentEmail || null);
      setPaymentId(currentPaymentId || null);
      setAtivo(currentAtivo || null);
    }
  }, []);

  const primeiraLetraNome = nomeCliente ? nomeCliente.charAt(0) : "";

  // CANCELAR

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

  // FORMATS

  function formatarCPF(cpf: any) {
    // Verifica se o CPF não está vazio, não é nulo e tem pelo menos 11 dígitos
    if (!cpf || typeof cpf !== "string" || cpf.length !== 11) {
      return cpf; // Retorna o CPF sem formatação se não tiver 11 dígitos
    }

    // Continua com a formatação do CPF
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  function formatarTelefone(telefone: any) {
    // Verifica se o telefone não está vazio, não é nulo e é uma string
    if (!telefone || typeof telefone !== "string") {
      return telefone; // Retorna o telefone sem formatação se não for uma string válida
    }

    // Verifica se o telefone possui 10 ou 11 dígitos
    if (telefone.length === 10) {
      return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (telefone.length === 11) {
      return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      return telefone; // Retorna o telefone sem formatação se não for 10 ou 11 dígitos
    }
  }

  // logout

  const handleLogout = () => {
    localStorage.clear();
    onClosePerfil();
  };

  // ACESSAR CLUBE

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

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
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

  return (
    <>
      {isPerfilVisible && (
        <div className={styles.Container}>
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

            <div className={styles.icon}>
              <div className={styles.perfilIcon}>
                <p className={styles.iconLet}>{primeiraLetraNome}</p>
              </div>
            </div>

            <p className={styles.name}>{nomeCliente}</p>

            <div className={styles.data}>
              <p className={styles.dataData}>{email}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.dataData}>{formatarCPF(cpf)}</p>
            </div>

            <div className={styles.data}>
              <p className={styles.dataData}>{formatarTelefone(telefone)}</p>
            </div>

            <div className={styles.data}>
              <p
                className={styles.dataData}
                style={{ color: ativo === "true" ? "#08d40a" : "red" }}
              >
                {paymentId !== "" && paymentId !== "undefined"
                  ? "Ativo"
                  : "Inativo"}
              </p>
            </div>

            {paymentId !== "" && paymentId !== "undefined" && (
              <p className={styles.cancel} onClick={cancelSubscription}>
                Cancelar plano
              </p>
            )}

            <button
              onClick={
                paymentId !== "" && paymentId !== "undefined"
                  ? handleSubmit
                  : () => router.push("/Checkout")
              }
              className={styles.Button}
            >
              {paymentId !== "" && paymentId !== "undefined"
                ? "Acessar clube"
                : "Obter acesso"}
            </button>

            <button onClick={handleLogout} className={styles.outButton}>
              Sair
            </button>
          </div>
        </div>
      )}
    </>
  );
}
