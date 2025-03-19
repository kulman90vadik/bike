import { NavLink } from "react-router-dom";
import styles from './navigation.module.scss';
import { PropsNav } from "../../propstype";
import gsap from "gsap";
import React from "react";

const Navigation = ({navigation, classNameNav}: PropsNav) => {
  const refLi = React.useRef<(HTMLLIElement | null)[]>([]);
  const addToRefs = (el: HTMLLIElement | null) => {
    if (el) {
      if (!refLi.current.includes(el)) {
        refLi.current.push(el);
      }
    }
  };

  React.useLayoutEffect(() => {
    gsap.fromTo(
      refLi.current,
      { y: -150 }, 
      {
        y: 0,       
        stagger: 0.15,
        duration: 3,
        delay: 2,
        ease: 'power3.out',
      }
    );
  }, []);


  return (
    <nav className={styles[classNameNav]}>
      <ul className={styles.list}>
        {navigation.map((link) => {
          return (
            <li
              ref={addToRefs} 
              className={styles.item} key={link.lebel}>
              <NavLink
                className={({ isActive }) => 
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
                to={link.link}
              >
                {link.lebel}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
