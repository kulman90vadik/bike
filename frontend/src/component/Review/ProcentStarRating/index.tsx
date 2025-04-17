import styles from "./procentstarrating.module.scss";


type Props = {
  rating: number
}

const ProcentStarRating = ({ rating }: Props) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={styles.procentstar}>
      {stars.map((_, index) => {
        const percentage = Math.min(Math.max(rating - index, 0), 1) * 100;
        return (
          <span className={styles.star} key={index}>
          <span className={styles.starleer}>☆</span>
          <span className={styles.starvoll} style={{ width: `${percentage}%` }}>
            <span className={styles.staricon}>★</span>
          </span>
        </span>
        );
      })}
    </div>
  );
};

export default ProcentStarRating;