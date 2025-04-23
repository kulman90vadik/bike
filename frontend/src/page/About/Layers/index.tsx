
import React, { useEffect } from 'react';
import styles from '../about.module.scss';
import Lenis from '@studio-freight/lenis';

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;  // Кастомная функция easing
  smooth?: boolean;
}

const Layers = () => {
  const bgRef = React.useRef<HTMLDivElement>(null);
  const firstRef = React.useRef<HTMLDivElement>(null);
  const twoRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    } as LenisOptions);
  
    const updateParallax = (scroll: number) => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0px, ${scroll / 1.6}px, 0px) scale(${1 + scroll / 6000})`;
      }
      if (firstRef.current) {
        firstRef.current.style.transform = `translate3d(0px, ${scroll / 5.5}px, 0px)`;
      }
      if (twoRef.current) {
        twoRef.current.style.transform = `translate3d(0px, ${scroll / 2.6}px, 0px)`;
      }
    };
  
    lenis.on('scroll', ({ scroll }: {scroll: number}) => {
      requestAnimationFrame(() => updateParallax(scroll));
    });
  
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
  
    requestAnimationFrame(raf);
  
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <section className={styles.about} >
    <div
    ref={bgRef}
    className={styles.layer}
    style={{
      backgroundImage: 'url(/images/paralax/about-bg.jpg)'
    }}
  />
  <div
    ref={firstRef}
    className={styles.layer}
    style={{
      backgroundImage: 'url(/images/paralax/first1.png)'
    }}
  />
  <div
    ref={twoRef}
    className={styles.layer}
    style={{
      backgroundImage: 'url(/images/paralax/two.png)'
    }}
  />
      {/* <div
        className={styles.layer}
        style={{
          backgroundImage: 'url(/images/paralax/three.png)',
          transform: `translate3d(0px, ${-offsetY * 0.2}px, 0px)`
        }}
      /> */}
      {/* <div className={styles.layer} style={{ backgroundImage: 'url(/images/paralax/three.png)' }}></div> */}
    </section>


  );
}
 
export default Layers;