import Image from "next/image";
import { FormEvent, useEffect } from "react";
import Logo from "../../../../public/logoClara.svg";

import { useRouter } from "next/router";
import { useState } from "react";

import { getDocs } from "firebase/firestore";
import { collection, db } from "../../../../firebase";

interface Login {
  id: string;
  email: string;

  senha: string;

  link: string;

  Telefone: string;

  cpf: string;

  nomeCliente: string;

  paymentId: string;

  Ativo: boolean;
}

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter(); // Instância do roteador
  const [teste, setTeste] = useState<Login[]>([]);
  const [error, setError] = useState("");

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
        };
        return login;
      });
      setTeste(loginList);
    };
    fetchData();
  }, []);

  const [userId, setUserId] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Handling login...");

    // console.log(teste);

    const user = teste.find(
      (user) => user.email === email && user.senha === senha
    );

    if (user) {
      setUserId(user.id);

      // console.log(user.Ativo);

      localStorage.setItem("userId", user.id);
      localStorage.setItem("link", user.link);
      localStorage.setItem("nomeCliente", user.nomeCliente);
      localStorage.setItem("cpf", user.cpf);
      localStorage.setItem("Telefone", user.Telefone);
      localStorage.setItem("email", user.email);
      localStorage.setItem("senha", user.senha);
      localStorage.setItem("paymentId", user.paymentId);
      localStorage.setItem("Ativo", user.Ativo.toString());
      router.push("/");
    } else {
      setError("Email ou senha incorretos");
      console.log("nao tem senha");
    }
  };

  return (
    <div className="container-cadastroLogin">
      <div className="cadastro-login-img">
        <div className="cadastro-img"></div>
        <div className="cadastro-clube">
          <div className="cadastro-form">
            <div className="logo-slogan">
              <Image className="logo-benefit" src={Logo} alt="Logo-BeneFit" />
              <h2 className="sub">
                Faça login para acessar o clube de benefícios
              </h2>
            </div>
            <div className="cadastro-input">
              <form onSubmit={handleLogin}>
                <div className="inf-input">
                  <label>
                    <p className="label-field">Email</p>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label>
                    <p className="label-field">Senha</p>
                    <input
                      id="senha"
                      type="password"
                      name="senha"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                  </label>

                  <button>Fazer login</button>
                  {error && <div className="error-message">{error}</div>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
