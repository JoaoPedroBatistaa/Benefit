import axios from "axios";

export default async function handler(req: any, res: any) {

  const { accessToken, nome, cpf, email, telefone } = req.body;

  const data = new URLSearchParams();
  data.append("nome", nome);
  data.append("cpf", cpf);
  data.append("email_pessoal", email);
  data.append("telefone_pessoal", telefone);

  try {
    const response = await axios.post(
      "https://apiv4.markt.club/login/api",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
    res.status(200).json({ link: response.data });

  } catch (error: any) {
    console.log("Erro durante a requisição POST:", error?.response?.data?.erro?.mensagem);

    const externalStatusCode = error?.response?.status;
    const externalErrorMessage = error?.response?.data?.erro?.mensagem;

    if (externalStatusCode && externalErrorMessage) {
      res.status(externalStatusCode).json({ error: externalErrorMessage });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Um erro desconhecido ocorreu" });
    }
  }
}
