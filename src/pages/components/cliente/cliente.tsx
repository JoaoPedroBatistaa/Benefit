import Head from "next/head";
import Link from "next/link";

const Cliente = () => {
  return (
    <section>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="cliente" id="cliente">
        <div className="image-wrapper"></div>
        <div className="container__cliente">
          <h2>Descubra o maior Clube de Vantagens da América Latina </h2>
          <div className="caixa__branca">
            <div className="content-block-caixa">
              <h1 id="number-clientes">+20.000 </h1>
              <p>Lojas </p>
            </div>
            <div className="content-block-caixa">
              <h1 id="number-clientes">+1.400 </h1>
              <p>Parceiras</p>
            </div>
          </div>
          <h3>
            Descubra o poder da economia inteligente! Junte-se ao Clube Poupy e
            acesse uma seleção exclusiva de ofertas e descontos por apenas R$
            9,90. <br />
            <br /> Economize com estilo, melhore seu dia-a-dia e faça parte de
            uma comunidade que valoriza mais por menos. Sua jornada para uma
            vida mais próspera começa aqui!
          </h3>
          <Link href="/register">
            <button className="botao__cliente">Quero economizar já</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Cliente;
