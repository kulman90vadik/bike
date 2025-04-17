import { useState } from "react";
import styles from "./rating.module.scss";

type Props = {
  onChange: (n: number) => void
  rating: number
  setRating: (n: number) => void
  // errorStar: boolean
}

const StarRating = ({ setRating, rating, onChange }: Props) => {
  const [hovered, setHovered] = useState(0);
  const selectedIcon = "★";
  const deselectedIcon = "☆";
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);


  const changeRating = (newRating: number) => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };


  return (
    <div>
      <div className={styles.rating}>
        {stars.map((star) => (
          <span
            key={star}
            style={{ cursor: "pointer" }}
            onClick={() => changeRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
          >
            {rating < star
              ? hovered < star
                ? deselectedIcon
                : selectedIcon
              : selectedIcon}
          </span>
        ))}
        {/* {errorStar && <p style={{color: 'red'}}>Error</p>} */}
      </div>
    </div>
  );
};

export default StarRating;
