import Head from "next/head";

function sectionCalculadora() {
  return (
    <section>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="container-section-calculadora">
        <div className="container-calculadora">
          <div className="text">
            <h2>
              Adicione grátis a extensão do Clube Benefit e nunca perca um
              desconto! Seu próximo grande achado está a um clique de distância.
            </h2>
          </div>
          <a href="https://chrome.google.com/webstore/detail/tem-mais-vantagens/ghhhocjedgofpmjjgkkkibcmjlldolpc">
            <div className="button">
              <button>Adicionar agora</button>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default sectionCalculadora;
