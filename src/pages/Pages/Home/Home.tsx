import Benefits from "../../components/Benefits";
import Cashback from "../../components/Cashback";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Cliente from "../../components/cliente/cliente";
import Header from "../../components/header/header";
import HeaderMobile from "../../components/headerMobile/Index";
import SectionCalculadora from "../../components/sectionCalculadora/sectionCalculadora";
function Home() {
  return (
    <div>
      <section>
        <Header />
        <HeaderMobile />
        <Hero></Hero>
        {/* <CarroselBanner /> */}
        {/* <Banner /> */}
        {/* <CarrroselMobile /> */}
        <Cliente />
        <Benefits></Benefits>
        <SectionCalculadora />
        <Cashback></Cashback>
        {/* <SectionApp /> */}
        <Footer></Footer>
      </section>
    </div>
  );
}

export default Home;
