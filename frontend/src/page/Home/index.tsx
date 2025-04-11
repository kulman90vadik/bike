// import styles from './home.module.scss';

import AboutUs from "../../component/AboutUs";
import Catalog from "../../component/Catalog";
import Hero from "../../component/Hero";
import Screen from "../../component/Screen";
// import ScrollCards from "../../component/ScrollCards";
import TopProducts from "../../component/TopProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <Catalog />
      {/* <ScrollCards /> */}
      <AboutUs />

      <Screen />
      <TopProducts />
    </>
  );
};

export default Home;
