import { Link } from 'react-router-dom';
import styles from './hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.inner}>
          <h1 className={styles.title}>
          Electric bicycles</h1>
          <p className={styles.text}>
          The Cento10 Hybrid is a racing bicycle with pedal-assist electric drive, setting a new, exceptionally high standard for this category.
          </p>
          <Link className={styles.link} to='/' >More details</Link>
        </div>
      </div>
    </section>
  );
}
 
export default Hero;