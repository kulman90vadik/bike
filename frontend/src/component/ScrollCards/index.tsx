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
  const divlinieRef = React.useRef<SVGSVGElement | null>(null);
  const refSvg = React.useRef<SVGSVGElement | null>(null);

  const section = sectionRef.current;
  const container = containerRef.current;

  React.useLayoutEffect(() => {
    if (section && container && refSvg.current) {
      const totalScroll = container.scrollWidth - window.innerWidth;
      console.log(totalScroll);

      gsap.to(container, {
        x: totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "-40% -16%",
          // markers: true,
          end: ` +=${totalScroll}`,
          scrub: true,
          pin: true,
        },
      });

      gsap.fromTo(refSvg.current, 
        { x: -150 }, 
        { 
          x: () => window.innerWidth,  // движение до конца контейнера
          ease: "none",  // без easing, чтобы скролл был плавным
          scrollTrigger: {
            trigger: section,
            start: "-40% -16%", // начинает анимацию, когда верхняя часть секции попадает в верх экрана
            end: ` +=${totalScroll}`,  // конец анимации после полной ширины контейнера
            scrub: true,  // привязка анимации к скроллу
            // onUpdate: (self) => {
            //   // Синхронизируем движение SVG с прокруткой контейнера
            //   gsap.to(refSvg.current, { x: self.scroll() });
            // },
            // pin: true,  // фиксирует секцию, если нужно
          },
        });


      gsap.to(divRef.current, {
        scrollTrigger: {
          trigger: section,
          scrub: 1,

          start: "-70% 16%",
          end: ` +=${totalScroll}`,
          // markers: true
        },
        duration: 1,
        scale: 1.5,
      });



      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          markers: true,
          // start: "-70% 16%",
          start: "-40% -16%",
          // end: "top 40%",
          scrub: 1,
        },
      });

      tl.from(divlinieRef.current, {
        opacity: 0,
        // scale: 0.5,
        // y: 25,
        duration: 0.5,
        ease: "power3.out",
      });
      
   
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [section, container]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div ref={divRef} className={styles.bg}></div>
      {/* <div  className={styles.linie}></div> */}


      {/* <svg ref={divlinieRef} className={styles.svg} width="100%" height="29" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line strokeDasharray="15, 10, 5" x1="0" y1="16" x2="100%" y2="16"></line>
			</svg>
		   */}

      <svg
        ref={refSvg}
        className={styles.images}
        viewBox="0 0 32 32"
        enableBackground="new 0 0 32 32"
        id="_x3C_Layer_x3E_"
        version="1.1"
        // xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g id="cyclist_x2C__bike">
          <g id="XMLID_551_">
            <circle
              cx="21"
              cy="5.5"
              id="XMLID_552_"
              r="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
               fill="none"
            />

            <path
              d="M16.71,25.516L18,19.479c0-0.468-0.219-0.908-0.59-1.192l-3.194-2.437l3.331-3.641l2.655,2.959    c0.189,0.211,0.46,0.332,0.744,0.332H25c0.553,0,1-0.447,1-1s-0.447-1-1-1h-3.586l-2.42-3.571    c-1.533-2.263-4.834-2.356-6.492-0.183l-2.913,3.818c-0.86,1.157-0.568,2.801,0.64,3.588L15,20.264l-0.362,5.241    c-0.074,1.079,0.78,1.995,1.862,1.995l0,0"
              id="XMLID_553_"
              // strokeMinejoin="round"
              strokeMiterlimit="10"
            />

            <line
              id="XMLID_554_"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              x1="7"
              x2="7.101"
              y1="25"
              y2="25"
            />

            <line
              id="XMLID_555_"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              x1="25"
              x2="25.101"
              y1="25"
              y2="25"
            />
          </g>

          <circle
            cx="25"
            cy="25.063"
            id="XMLID_547_"
            r="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
             fill="none"
          />

          <circle
            cx="7"
            cy="25.063"
            id="XMLID_556_"
            r="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            fill="none"
          />

          <line
            id="XMLID_557_"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="14.5"
            x2="6.5"
            y1="4.5"
            y2="4.5"
          />

          <line
            id="XMLID_558_"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            x1="2.5"
            x2="9.5"
            y1="7.5"
            y2="7.5"
          />
        </g>
      </svg>

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
