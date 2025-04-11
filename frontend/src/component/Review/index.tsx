import { useSelector } from "react-redux";
import styles from "./review.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IComment, ProductProps } from "../../propstype";
import { motion } from "framer-motion";
import axios from "../../axios";

type Props = {
  data: ProductProps | null
}

const Review = ({data}: Props) => {
  const [m, setM] = React.useState<ProductProps | null>(data);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const[isForm, setIsForm] = React.useState(false)

// console.log(isAuth, 'isAuth')


  const reviewHandler = () => {
    if (!isAuth) {
      // navigate('/login');
      navigate('/login?redirect=' + encodeURIComponent(location.pathname));
      // setIsForm(true) 

    } else {
      setIsForm(true)
      // логика для оставления отзыва
    }
  }


  const test = () => {
    let arr = {
      "text": 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam natus officiis distinctio! Mollitia repellendus qui dignissimos ducimus ipsam ut officiis, labore quia!',
      "rating": 2
    }

     axios
          .patch(`./products/${m?._id}/comments`, arr)
          .then((res) => {
            setM(res.data);
            // setIsLoading(false);
          })
          .catch((err) => {
            console.warn(err);
          });
  }


  console.log(m, 'm')

  
  return (
    <div className={styles.review}>
      <div className={styles.top}>
      <p>Bike reviews</p>
      <button onClick={reviewHandler} className={styles.btn} type="button">
        Add a review
      </button>
      </div>

      <ul className={styles.reviewlist}>
        {m?.comments.map((item: IComment) => {
          return(
            <li className={styles.reviewitem} key={item?._id}>
              <div className={styles.reviewtop}>
                <img className={styles.image} src={`http://localhost:5555${item.avatarUrl ? item.avatarUrl : '/uploads/d-person.png' }`} alt={item.fullName} />
                <span className={styles.reviewname}>{item.fullName}</span>
                <span className={styles.reviewdate}>{new Date(item.date).toLocaleDateString('de-DE')}</span>
                <span className={styles.reviewrating}>{item.rating}</span>
              </div>
              <div className={styles.reviewtext}>{item.text}</div>
            </li>
          )
        })}
      </ul>
      
      <motion.form
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isForm ? "auto" : 0,
          opacity: isForm ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={styles.form}>
            <span className={styles.title}>Leave your review {m?.name}</span>
            <label htmlFor="text"></label>
            <textarea className={styles.text} name="text" id="text" placeholder="....."></textarea>
            <button onClick={test} className={styles.submit}>addddd</button>
      </motion.form>

   

    </div>
  );
};

export default Review;
