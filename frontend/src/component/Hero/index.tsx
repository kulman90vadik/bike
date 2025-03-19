import { Link } from 'react-router-dom';
import styles from './hero.module.scss';
import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  function random (min: number, max: number) {
    return(Math.random() * (max - min)) + min;
  }
  // gsap.registerPlugin(useGSAP);
  let str = 'Electric bicycles';
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);
  const textRef = React.useRef<HTMLParagraphElement | null>(null);
  const btnRef = React.useRef<HTMLAnchorElement | null>(null);
  const wordRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const heroRefs = React.useRef<(HTMLDivElement | null)>(null);

  // to ---- на месте 
  // from ---- будет выехзжать 
  // 1  gsap.to('.box', {scale: 2})  просто при загрузке просиходит анамицая
  // 2  const heroRefs = React.useRef<(HTMLDivElement | null)>(null); 
        // gsap.context(() => {
          // gsap.to('.box', {scale: 2})  будет только в блоке с данным рефом
        // }, herpRefs)
  // 3  gsap  -------------  ПОСЛЕДОВАТЕЛНЬО ОДНА ПОСЛЕ ВТОРОЙ
      //  .timeline()
      //  .from(textRef.current, {opacity: 0, y: 200, delay: 2, duration: 2})
  // 4 gsap.fromTo('.box', {scale: 2}, {scale: 0}) // БУДЕТ МЕНЯТЬ ОТ... ДО...  


    React.useLayoutEffect(() => {
     gsap
     .timeline()
     .from(textRef.current, {opacity: 0, y: 200, delay: 2, duration: 2}) // ВЫЕЗЖАТЬ БУДЕТ ПРОСТО
     .from(btnRef.current, {opacity: 0, y: 300, duration: 1.2})
    }, []);

    React.useLayoutEffect(() => {
      wordRefs.current.forEach((ref, index) => {
          if (ref) {
            gsap.from(ref, 0.9, { // ПРИЛЕТИТ ОТКУДА ТО ЭТО FROM
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


    // React.useEffect(() => {
    //   // gsap.from(heroRefs.current, {


    //     const tl = gsap.timeline({
    //       scrollTrigger: {
    //         trigger: heroRefs.current,
    //         markers: true,
    //         start: 'top top',
    //         end: 'bottom bottom',
    //         scrub: 1,
    //       },
    //     });

    //     tl.from(heroRefs.current, {
    //       // opacity: 0,
    //       // scale: 0.5,
    //       y: 0,
    //       x: 0,

    //       // duration: 4,
    //       scale: 1,
    //       ease: "power3.out",
    //     }).to(heroRefs.current, {
    //       scale: 2, 
    //       y: 220,
    //       opacity: 0
    //     })

          
          // scrollTrigger: {
          //   trigger: heroRefs.current,
          //   scrub: true,
          //   start: 'top 80%',
          //   end: 'bottom 20%',
          //   markers: true
          // },
          // scale: 2,
      // })
    // }, []);






  
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