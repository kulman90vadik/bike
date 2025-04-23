
import AboutUs from "../../component/AboutUs";
import Catalog from "../../component/Catalog";
import Hero from "../../component/Hero";
import Screen from "../../component/Screen";
// import ScrollCards from "../../component/ScrollCards";
import TopProducts from "../../component/TopProducts";
import useLenis from "../../useLenis";
// import About from "../About";


const Home = () => {
  useLenis();
  return (
      <>
        <Hero />
        {/* <About /> */}
        <Catalog />
        {/* <ScrollCards /> */}
        <AboutUs />

        <Screen />
        <TopProducts />
        </>
  );
};

export default Home;
