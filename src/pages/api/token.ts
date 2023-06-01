import axios from 'axios';
import qs from 'qs';

export default async function handler(req: any, res: any) {
  const data = {
    client_id: "5483038437-7e5PxK3L0dYgLCuF!xfb4jp8v%Ud3g#u56ZquehsGtut$adT5HyAMdW$5VJQbXpb8S1!Y*R3E.benefit.com.br",
    secret_id: "82500-AAJaz0z04HIDT0B4bR4S1JckG9QR1J388Z6Ztb*qz6AhQ2pqeX2UO4cn$Sgcbb60ieuXVm374C",
    audience: "web",
    grant_type: "client_credentials",
    scope: "login:api"
  };

  axios({
    method: 'post',
    url: "https://apiv4.marktclub.net.br/token",
    data: qs.stringify(data),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Referer': 'https://clubebenefit.com.br' // Adicionado cabeçalho 'Referer'
    }
  })
    .then((response) => {
      if (response.data && response.data.dado && response.data.dado.access_token) {
        res.status(200).json({ accessToken: response.data.dado.access_token });
      } else {
        console.error('Resposta inesperada: ', response.data);
        res.status(500).json({ error: 'Unexpected response structure' });
      }
    })
    .catch((error) => {
      console.error('Erro ao obter o token de acesso: ', error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    });

}
