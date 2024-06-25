import axios from 'axios';
import qs from 'qs';

export default async function handler(req: any, res: any) {
  const data = {
    client_id: "9532239410-7mcUpqGbrWnd43$n2tfmI4O4QXxC8UXhonWVMNzq4VEzye9vxs$8QjB2uxJhgSh6mD8dlw.clubepoupy.com.br",
    secret_id: "15365-kdihPVdnM5!F%S2eqZ9#heA6ehin%!hjfmcQqXTCm1GmRqQ6fhM$#v#XWbS734RwUuBkjr*947",
    audience: "web",
    grant_type: "client_credentials",
    scope: "login:api"
  };

  axios({
    method: 'post',
    url: "https://apiv4.markt.club/token",
    data: qs.stringify(data),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Referer': 'https://clubepoupy.com.br'
    }
  })
    .then((response) => {
      if (response.data && response.data.dado && response.data.dado.access_token) {
        res.status(200).json({ accessToken: response.data.dado.access_token });
      } else {
        console.error('Resposta inesperada: ', JSON.stringify(response.data, null, 2));
        res.status(500).json({
          error: 'Unexpected response structure',
          responseData: response.data
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        console.error('Erro na resposta da API: ', JSON.stringify(error.response.data, null, 2));
        res.status(500).json({
          error: 'API Response Error',
          responseData: error.response.data
        });
      } else {
        console.error('Erro ao obter o token de acesso: ', error.message);
        res.status(500).json({ error: error.message });
      }
    });
}
