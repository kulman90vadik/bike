import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Card from "../Card";
import styles from "./scroll.module.scss";
import React from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const ScrollCards = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const products = useSelector((state: RootState) => state.products.data);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const divRef = React.useRef<HTMLDivElement | null>(null);

  const section = sectionRef.current;
  const container = containerRef.current;

  React.useLayoutEffect(() => {

    if (section && container) {
      const totalScroll = container.scrollWidth - window.innerWidth;
      console.log(totalScroll); 

        gsap.to(container, {
          x: totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "-40% 6%",
            markers: true,
            end: ` +=${totalScroll}`,
            scrub: true,
            pin: true,
          },
        });

        gsap.to(divRef.current, {
          scrollTrigger: {
            trigger: section,
            scrub: 1,
            
            start: "-70% 16%",
            end: ` +=${totalScroll}`,
            markers: true
          },
          duration: 1,
          scale: 1.5,
        })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [section, container]);



  return (
    <section className={styles.section} ref={sectionRef}>
      <div ref={divRef} className={styles.bg}></div> 
      
      <ul className={styles.list} ref={containerRef}>
        {products.map((item) => {
          return (
            <li className={styles.item} key={item._id}>
              <Card obj={item} isInBasket={false} isInFavorites={false} />
            </li>
          );
        })}
        {/* */}
      </ul>
    </section>
  );
};

export default ScrollCards;
