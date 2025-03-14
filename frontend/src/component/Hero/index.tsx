import { Link } from 'react-router-dom';
import styles from './hero.module.scss';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(useGSAP);

  let str = 'Electric bicycles';
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const textRef = React.useRef<HTMLParagraphElement | null>(null);
  const btnRef = React.useRef<HTMLAnchorElement | null>(null);
  const wordRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const heroRefs = React.useRef<(HTMLDivElement | null)>(null);

  // useGSAP(
  //   () => {
    //  gsap.from(heroRefs.current, {scale: 1, y: 100, duration: 0.8})
    // gsap.fromTo(heroRefs.current, 
    //   {
    //     scale: 1,    // Начальное значение
    //     delay: 1
    //   }, 
    //   {
    //     delay: 1,
    //     scale: 1.2,    // Конечное значение
    //     duration: 8 // Продолжительность анимации
    //   });
    React.useLayoutEffect(() => {
     gsap
     .timeline()
     .from(textRef.current, {opacity: 0, y: 200, delay: 2, duration: 2})
     .from(btnRef.current, {opacity: 0, y: 300, duration: 1.2})
    }, []);


  //   },
  // );

  function random (min: number, max: number) {
    return(Math.random() * (max - min)) + min;
  }


  React.useLayoutEffect(() => {
    wordRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.from(ref, 0.9, {
            opacity: 0,
            scale: .1,
            x: random(-500, 500),
            y: random(-500, 500),
            z: random(-500, 500),
            delay: index * 0.1,
            repeat: 0
          })
        }
      });
  }, []);


  React.useLayoutEffect(() => {
    // console.log(heroRefs.current)/
    gsap.to(heroRefs.current, {
      scrollTrigger: {
        trigger: heroRefs.current,
        scrub: 1,
        start: 'top top',
        end: "+=600",
        // markers: true
      },
      scale: 1.2,
    })
  }, []);






  
  return (
    <section  className={styles.hero}>
      <div ref={heroRefs} className={styles.bg}></div>
      <div className="container">
        <div className={styles.inner}>
          <h1 ref={titleRef} className={styles.title}>

            {str.split(' ').map((word, wordIndex) => (
              <div key={wordIndex} className={styles.word}>
                {word.split('').map((letter, letterIndex) => (
                  <div 
                  ref={(el) => (wordRefs.current[wordIndex * 10 + letterIndex] = el)}
                  className={styles.letter} 
                  key={letterIndex}>{letter}</div>
                ))}
              </div>
            ))}

          </h1>
          <p  ref={textRef} className={styles.text}>
          The Cento10 Hybrid is a racing bicycle with pedal-assist electric drive, setting a new, exceptionally high standard for this category.
          </p>
          <Link ref={btnRef} className={styles.link} to='/' >More details</Link>
        </div>
      </div>
    </section>
  );
}
 
export default Hero;