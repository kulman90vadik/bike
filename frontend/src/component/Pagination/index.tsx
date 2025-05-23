import React from 'react';
import { fetchProducts, fetchProductsPag } from '../../redux/slices/products';
import { useAppDispatch } from '../../redux/store';
import styles from './pagination.module.scss';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


type Props = {
  totalPages: number
  page: number
}

const Pagination = ({ totalPages, page }: Props) => {
  gsap.registerPlugin(ScrollTrigger);
  const dispatch = useAppDispatch();
 
  const clickPage = (n: number) => {

 
  dispatch(fetchProductsPag({page: n}))

  
  }
    const listRefs = React.useRef<HTMLUListElement | null>(null);
    React.useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        if (totalPages) {
            if (listRefs.current) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: listRefs.current,
                  start: "top 95%",
                  end: "top 40%",
                },
              });

              tl.from(listRefs.current, {
                opacity: 0,
                // scale: 0.5,
                y: 160,
                duration: 4,
                ease: "power3.out",
              });
            }
          // });
        }
      });
      return () => ctx.revert();
    }, [totalPages]);



  return (
    <ul ref={listRefs} className={styles.pagination}>
      {totalPages > 1 && [...Array(totalPages)].map((_, index) => {
        return (
          <li key={index} className={styles.item}>
            <button 
              onClick={() => clickPage(index + 1)}
              className={`${styles.btn} ${page === index + 1 ? styles.active : ''}`}>
              {index + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
