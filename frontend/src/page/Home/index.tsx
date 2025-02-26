// import styles from './home.module.scss';
import Catalog from "../../component/Catalog";
import Hero from "../../component/Hero";
import TopProducts from "../../component/TopProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <TopProducts />
    </>
  );
};

export default Home;
