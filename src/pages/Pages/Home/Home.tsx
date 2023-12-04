import CarroselBanner from "../../components/CarroselBanner/Index";
import CarrroselMobile from "../../components/CarrroselMobile/Index";
import Banner from "../../components/banners/banners";
import CashBack from "../../components/cashback/cashback";
import Cliente from "../../components/cliente/cliente";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import HeaderMobile from "../../components/headerMobile/Index";
import SectionCalculadora from "../../components/sectionCalculadora/sectionCalculadora";
function Home() {
  return (
    <div>
      <section>
        <Header />
        <HeaderMobile />
        <CarroselBanner />
        <Banner />
        <CarrroselMobile />
        <Cliente />
        <CashBack />
        <SectionCalculadora />
        {/* <SectionApp /> */}
        <Footer />
      </section>
    </div>
  );
}

export default Home;
