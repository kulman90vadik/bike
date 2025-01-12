import { NavLink } from "react-router-dom";
import styles from './navigation.module.scss';
import { PropsNav } from "../../propstype";




const Navigation = ({navigation, classNameNav}: PropsNav) => {
  return (
    <nav className={styles[classNameNav]}>
      <ul className={styles.list}>
        {navigation.map((link) => {
          return (
            <li
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
