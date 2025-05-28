import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Card from "../Card";
import styles from "./scroll.module.scss";
import React, { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { ProductProps } from "../../propstype";
import axios from "../../axios";

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
}

gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < 768;

const ScrollCards = () => {
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLUListElement | null>(null);
  const [products, setProducts] = React.useState<ProductProps[] | null>(null);
  const [status, setStatus] = React.useState<"loading" | "success" | "error">("loading");

  React.useEffect(() => {
      setStatus("loading");
      axios
        .get<ProductProps[]>("/products")
        .then((res) => {
          setProducts(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.warn(err);
          setStatus("error");
        });
    }, []);

  useLayoutEffect(() => {
    if (isMobile) return;

    const lenis = new Lenis({
      smooth: true,
    } as LenisOptions);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    const container = containerRef.current;
    const section = sectionRef.current;

    if (container && section) {
      const scrollLength = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: () => `-${scrollLength}`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top", 
          end: () => `+=${scrollLength}`,
          scrub: true, 
          pin: true, 
          anticipatePin: 1,
        },
      });
    }

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [status, products]);
  

  return (
    <section className={styles.section} ref={sectionRef}>
      <div
        className={styles.bgtop}
        style={{ backgroundImage: "url(/images/paralax/first2.png)" }}
      ></div>
      <div
        className={styles.bgbottom}
        style={{ backgroundImage: "url(/images/paralax/first2.png)" }}
      ></div>

       {status === "loading" && 
         <img
          className={styles.loading}
          src="/images/loading.gif"
          alt="Loading"
        /> 
       }
      {status === "error" && <div className={styles.error}>
        Error loading
        <img
          width={55}
          height={55}
          src="/images/err.svg"
          alt="Error"
        /> 
        </div>}

      <ul className={styles.list} ref={containerRef}>
        {
          status === "success" && products?.map((obj) => {
            const isInBasket = basket?.some(
              (item: ProductProps) => item.productId === obj._id
            );
            const isInFavorites = favorites?.some(
              (item: ProductProps) => item.productId === obj._id
            );

            return (
              <li className={styles.item} key={obj._id}>
                <Card
                  obj={obj}
                  isInBasket={!!isInBasket}
                  isInFavorites={!!isInFavorites}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default ScrollCards;

// React.useEffect(() => {
// const fetchData = async () => {
//   try {
//     const res = await axios.get<ProductProps[]>('./products');
//     setProducts(res.data); // сохраняем данные в state
//     setLoading(true)
//   } catch (err) {
//     console.warn('Error fetching products:', err);
//   }
// };
// fetchData(); // вызываем асинхронную функцию
// }, [])

{
  /* 
      <svg
        ref={refSvg}
        className={styles.images}
        viewBox="0 0 32 32"
        enableBackground="new 0 0 32 32"
        id="_x3C_Layer_x3E_"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
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
      </svg> */
}

// React.useLayoutEffect(() => {
//   if (section && container && refSvg.current) {
//     const totalScroll = container.scrollWidth - window.innerWidth;

//     gsap.to(container, {
//       x: -section.scrollWidth,
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "-40% -16%",
//         // markers: true,
//         end: ` +=${totalScroll}`,
//         scrub: true,
//         pin: true,
//       },
//     });

//     gsap.fromTo(refSvg.current,
//       { x: -150 },
//       {
//         x: () => window.innerWidth,  // движение до конца контейнера
//         ease: "none",  // без easing, чтобы скролл был плавным
//         scrollTrigger: {
//           trigger: section,
//           start: "-40% -16%", // начинает анимацию, когда верхняя часть секции попадает в верх экрана
//           end: ` +=${totalScroll}`,  // конец анимации после полной ширины контейнера
//           scrub: true,  // привязка анимации к скроллу
//         },
//       });

//     gsap.to(divRef.current, {
//       scrollTrigger: {
//         trigger: section,
//         scrub: 1,
//         start: "-70% 16%",
//         end: ` +=${totalScroll}`,
//       },
//       duration: 1,
//       scale: 1.5,
//     });

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: section,
//         // markers: true,
//         start: "-40% -16%",
//         scrub: 1,
//       },
//     });

//     tl.from(divlinieRef.current, {
//       opacity: 0,
//       duration: 0.5,
//       ease: "power3.out",
//     });
//   }

//   return () => {
//     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//   };
// }, [section, window.innerWidth, container]);
