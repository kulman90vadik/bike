import React from "react";
import { IComment } from "../../../propstype";
import styles from "./reviewlist.module.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { Pencil, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import { fetchDelProductComment } from "../../../redux/slices/fullproduct";

const stars = Array.from({ length: 5 }, (_, i) => i + 1);
const selectedIcon = "★";
const deselectedIcon = "☆";

const ReviewList = () => {
  const dispatch = useAppDispatch();
  const refUl = React.useRef<HTMLUListElement | null>(null);
  const authData = useSelector((state: RootState) => state.auth.data);
  const fullProduct = useSelector((state: RootState) => state.fullproduct.data);

  const deleteReview = async (productId: string, reviewId: string) => {
      await dispatch(fetchDelProductComment({productId, reviewId}));
  }

  return (
    <ul ref={refUl} className={styles.reviewlist}>
      {fullProduct?.comments.map((item: IComment) => {
        return (
          <li className={styles.reviewitem} key={item?._id}>
            <div className={styles.reviewtop}>
              <img
                className={styles.image}
                src={`http://localhost:5555${
                  item.avatarUrl ? item.avatarUrl : "/uploads/d-person.png"
                }`}
                alt={item.fullName}
              />
              <span className={styles.reviewname}>{item.fullName}</span>
              <span className={styles.reviewdate}>
                {item.date
                  ? new Date(item.date).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </span>

              {stars.map((star, index) => (
                <span className={styles.star} key={star}>
                  {item.rating >= index + 1 ? selectedIcon : deselectedIcon}
                </span>
              ))}


              {authData?._id === item.user &&
                <div className={styles.buttons}>
                  <button 
                    className={styles.button}
                    // onClick={() => editPost(data._id, item._id)}
                  ><Pencil /></button> 
                  <button 
                    className={styles.button}
                    onClick={() => deleteReview(fullProduct._id, item._id)}
                  ><Trash2 /></button> 
                  <button className={styles.button}><ThumbsUp /></button> 
                  <button className={styles.button}><ThumbsDown /></button> 
                </div>
              }

            </div>
            <div className={styles.reviewtext}>{item.text}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
