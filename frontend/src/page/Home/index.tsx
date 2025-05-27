// import AboutUs from "../../component/AboutUs";
import Catalog from "../../component/Catalog"
import FaqAccordion from "../../component/FaqAccordion"
import Hero from "../../component/Hero"
import TopProducts from "../../component/TopProducts"
import useLenis from "../../useLenis"

const Home = () => {
    useLenis()
    return (
        <>
            <Hero />
            <Catalog />
            <TopProducts />
            <FaqAccordion />
            {/* <AboutUs /> */}
        </>
    )
}

export default Home
