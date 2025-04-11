import { Link } from 'react-router-dom';
import styles from './hero.module.scss';
import gsap from 'gsap';
import React from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';


const Hero = () => {
  gsap.registerPlugin(ScrollTrigger);
  function random (min: number, max: number) {
    return(Math.random() * (max - min)) + min;
  }
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
          <Link ref={btnRef} className={styles.link} to='/' >
            {/* <motion.div
             animate={{ scaleX: [0, 1]}}
             transition={{
               delay: 2,
               repeat: Infinity,
               repeatType: "reverse",
               repeatDelay: 1,
               duration: 4,
             }}
            whileHover={{
              scale: 1.1
            }}
            className={styles.line}></motion.div> */}
            More details

            <motion.svg 
              className={styles.icon} xmlns="http://www.w3.org/2000/svg"  
              viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round">

              <motion.line
                animate={{scaleY: 0.4,}}
                transition={{
                  delay: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                  duration: 1,
                }}
                x1="6" x2="6" y1="4" y2="20"/>
              <motion.polygon
                animate={{scale: 1.3, translateX: 5, rotate: 180}}
                transition={{
                  repeatType: "reverse",
                  type: "spring",
                  repeatDelay: 1,
                  repeat: Infinity,
                  delay: 2,
                  duration: 1,
                }}
                points="10,4 20,12 10,20"
              />
            </motion.svg>

          </Link>
        </div>
      </div>
    </section>
  );
}
 
export default Hero;