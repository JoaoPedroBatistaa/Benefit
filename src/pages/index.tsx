import Head from "next/head";
import Home from "../pages/Pages/Home/Home";

export default function Index() {
  return (
    <div className="Global">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>Clube Poupy</title>
        <link rel="icon" href="/fav.png" />
      </Head>
      <Home />
    </div>
  );
}
