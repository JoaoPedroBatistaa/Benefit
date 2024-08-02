import Gains from "../../components/DetailsPayment";
import Footer from "../../components/Footer";
import Header from "../../components/header/header";
import HeaderMobile from "../../components/headerMobile/Index";
function Home() {
  return (
    <div>
      <section>
        <Header />
        <HeaderMobile />

        <Gains></Gains>
        {/* <SectionApp /> */}
        <Footer></Footer>
      </section>
    </div>
  );
}

export default Home;
