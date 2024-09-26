import "../styles/globals.scss";
// Estilo Home
import "../styles/Home/banners.scss";
import "../styles/Home/carrosel.scss";
import "../styles/Home/carroselBanner.scss";
import "../styles/Home/carroselMobile.scss";
import "../styles/Home/cashback.scss";
import "../styles/Home/cliente.scss";
import "../styles/Home/footer.scss";
import "../styles/Home/header.scss";
import "../styles/Home/headerMobile.scss";
import "../styles/Home/sectionApp.scss";
import "../styles/Home/sectionCalculadora.scss";

// Estilo Login
import "../styles/Login/cadastroLogin.scss";
import "../styles/Login/headerLogin.scss";

import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Seu Título</title>
        <meta name="description" content="Descrição do seu site" />
        {/* Qualquer outra tag que você queira adicionar */}
      </Head>

      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M6QZ6LQD');`,
        }}
      />

      {/* Renderiza o componente da página */}
      <Component {...pageProps} />
    </>
  );
}
