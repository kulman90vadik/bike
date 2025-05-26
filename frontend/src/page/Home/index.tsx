
import AboutUs from "../../component/AboutUs";
import Catalog from "../../component/Catalog";
import Hero from "../../component/Hero";
import TopProducts from "../../component/TopProducts";
import useLenis from "../../useLenis";

const Home = () => {
  useLenis();
  return (
      <>
        <Hero />
        <Catalog />
        <TopProducts />
        <AboutUs />

        </>
  );
};

export default Home;
