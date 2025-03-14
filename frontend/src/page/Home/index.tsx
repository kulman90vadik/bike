// import styles from './home.module.scss';
import Catalog from "../../component/Catalog";
import Hero from "../../component/Hero";
import ScrollCards from "../../component/ScrollCards";
import TopProducts from "../../component/TopProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <ScrollCards />
      <TopProducts />
    </>
  );
};

export default Home;
