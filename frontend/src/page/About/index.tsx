import Map from "./Map/index";
import ScrollCards from "../../component/ScrollCards";
import Layers from "./Layers";
import FaqAccordion from "../../component/FaqAccordion";

const About = () => {
  // useLenis();
  // useEffect(() => {
  //     const lenis = new Lenis({
  //       duration: 1.3,
  //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // необязательно, можешь свою функцию
  //       smooth: true,
  //     })

  //     const raf = (time: number) => {
  //       lenis.raf(time)
  //       requestAnimationFrame(raf)
  //     }

  //     requestAnimationFrame(raf)

  //     return () => {
  //       lenis.destroy()
  //     }
  //   }, [])

  // const [offsetY, setOffsetY] = React.useState(0);

  // const handleScroll = () => {
  //   setOffsetY(window.scrollY);
  // };

  // React.useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // const [offsetY, setOffsetY] = React.useState(0);

  return (
    <>
      <Layers />

      <ScrollCards />

      <FaqAccordion />

      <Map />
    </>
  );
};

export default About;
