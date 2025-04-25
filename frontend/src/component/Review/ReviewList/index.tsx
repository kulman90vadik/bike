import React from "react";
import { IComment, likesUp } from "../../../propstype";
import styles from "./reviewlist.module.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import { Pencil, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import {
  fetchDelProductComment,
  fetchLikeComment,
} from "../../../redux/slices/fullproduct";
import { selectIsAuth } from "../../../redux/slices/auth";

const stars = Array.from({ length: 5 }, (_, i) => i + 1);
const selectedIcon = "★";
const deselectedIcon = "☆";

const ReviewList = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useAppDispatch();
  const refUl = React.useRef<HTMLUListElement | null>(null);
  const authData = useSelector((state: RootState) => state.auth.data);
  const fullProduct = useSelector((state: RootState) => state.fullproduct.data);
  const status = useSelector((state: RootState) => state.fullproduct.status);

  const deleteReview = async (productId: string, reviewId: string) => {
    await dispatch(fetchDelProductComment({ productId, reviewId }));
  };

  const likeHandler = async (id: string, idcomment: string, like: string) => {
    await dispatch(fetchLikeComment({ id, idcomment, like }));
  };

  console.log(fullProduct, "fullProduct");

  // let iComment: IComment[] = fullProduct?.comments;

  const funcActive = (commentUserId: string, likesUp: likesUp[]) => {
    // console.log(authDataId, 'authDataId')
    console.log(commentUserId, 'commentUserId')
    console.log(likesUp, 'likesUp')
    let active = likesUp.find(item => item.user === commentUserId);
    
    console.log(active, 'active')

    if(active ) {
      return 'active'
    } else {
      return ''
    }
  }

  return (
    <ul ref={refUl} className={styles.reviewlist}>
      {status == "loading" ? (
        <img
          className={styles.loading}
          src="/images/loading.gif"
          alt="Loading"
        />
      ) : (
        fullProduct?.comments.map((item: IComment) => {
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

                <div className={styles.buttons}>
                  {authData?._id === item.user && (
                    <>
                      <button
                        className={styles.button} // onClick={() => editPost(data._id, item._id)}
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => deleteReview(fullProduct._id, item._id)}
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                  <button
                    className={`${styles.button} ${styles.buttonlike} ${styles[funcActive( item.user, item.likesUp)]}`}


                    disabled={!isAuth}
                    onClick={() =>
                      likeHandler(fullProduct._id, item._id, "likeUp")
                    }
                  >
                    <ThumbsUp size={20} />
                  
                    {/* <span className={`${item._id === item.likesUp.like }`}> */}
                    <span >
                      {
                        item.likesUp.length > 0 ? item.likesUp.length : '0'
                      }
                    </span>
                  </button>
                  <button
                    className={`${styles.button} ${styles.buttonlike}`}
                    disabled={!isAuth}
                  >
                    <ThumbsDown size={20} />
                    <span>10</span>
                  </button>
                </div>
              </div>
              <div className={styles.reviewtext}>{item.text}</div>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default ReviewList;
