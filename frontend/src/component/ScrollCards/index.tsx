import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Card from "../Card";
import styles from './scroll.module.scss'
import React from "react";

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollCards = () => {

  const products = useSelector((state: RootState) => state.products.data);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLUListElement | null>(null);

  React.useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) {
      console.log('Ошибка: refs не установлены');
      return;
    }

    // Вычисляем общее смещение: разница между шириной контейнера и шириной окна
    if(section && container ){
      const totalScroll = container.scrollWidth - window.innerWidth;
      
      // console.log(container.scrollWidth, 'container.scrollWidth'); 
      // console.log(window.innerWidth, 'window.innerWidth'); 
      // console.log(totalScroll); 


    // console.log('scrollAmount (разница в ширине):', totalScroll);
  
      // if (totalScroll > 0) {
      gsap.to(container, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 50% bottom',
          end: ` +=${totalScroll}`,
          // end: 'bottom 90%',
          scrub: true,
          pin: true,
          // markers: true,

          // markers: true, // Для отладки: показывает линии старта и конца ScrollTrigger
        },
      });
    }
    // }
      

    // Очистка ScrollTrigger при размонтировании компонента
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);






  return (
    <section className={styles.section} ref={sectionRef}>
      <ul className={styles.list} ref={containerRef}>
        {products.map(item => {
          return(
            <li className={styles.item } key={item._id}>
              <Card obj={item}  isInBasket={false} isInFavorites={false}/>
            </li>
          )
        })}
      </ul>
    </section>
  );
}
 
export default ScrollCards;