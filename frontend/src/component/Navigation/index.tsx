import { NavLink, useLocation } from "react-router-dom";
import styles from './navigation.module.scss';
import { PropsNav } from "../../propstype";
import gsap from "gsap";
import React from "react";
import { LayoutGroup, motion } from "framer-motion";

const Navigation = ({navigation, classNameNav}: PropsNav) => {
  const[isSelected, setIsSelected] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenBurger, setIsOpenBurger] = React.useState(false);

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

  const MotionNavLink = motion(NavLink);
  const location = useLocation();

  React.useEffect(() => {
    const currentIndex = navigation.findIndex(
      (link) => link.link === location.pathname
    );
    if (currentIndex !== -1) {
      setIsSelected(currentIndex);
    } else {
      setIsSelected(0); 
    }
  }, [location.pathname]);


  return (
    <LayoutGroup >
    <motion.nav
   
     layout 
     className={`${styles[classNameNav]} ${isOpen ? styles.active : ""}`}
     
    >
      <ul className={styles.list} >
        {navigation.map((link, index) => {
          return (
            <motion.li
              ref={addToRefs} 
              className={styles.item} key={link.lebel}>
              <MotionNavLink
                exit={{opacity: 0}}
                onClick={() => setIsSelected(index)}     
                animate={{
                  color: isSelected === index ? '#000' : '#ffd700',
                }}
                className={styles.link}
                to={link.link}
              >
                {link.lebel}
                
                {(isSelected === index ) && <BgSelector />}  
                  
              </MotionNavLink>
            </motion.li>
          );
        })}
      </ul>
    </motion.nav>
      <button className={styles.burger}  onClick={() => setIsOpen(!isOpen)}>
        X
      </button>
    </LayoutGroup>
  );
};

const BgSelector = () => {
  return(
    <motion.div
      // layout 
      layoutId="bg-selector"
      // exit={{ width: 0 }}
      // animate={{ width: '100%' }}
      style={{
        width: "100%",
        height: "100%",
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: "-1",
        backgroundColor: "#ffd700"
      }}
    
    >
    </motion.div>
  )
}

export default Navigation;
