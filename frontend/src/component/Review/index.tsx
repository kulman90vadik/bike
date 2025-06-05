import { useSelector } from "react-redux";
import styles from "./review.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FormReview, PropsEditComment } from "../../propstype";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import StarRating from "./StarRating";
import ReviewList from "./ReviewList";
import ProcentStarRating from "./ProcentStarRating";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchEditProductComment, fetchProductComment } from "../../redux/slices/fullproduct";

const Review = () => {
  const dispatch = useAppDispatch();
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [starNumber, setStarNumber] = React.useState(0);
  const [rating, setRating] = React.useState(0);
  const [errorStar, setErrorStar] = React.useState(true);
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const reviewProduct = useSelector((state: RootState) => state.fullproduct.data);

   const ratings = reviewProduct?.comments?.map(item => item.rating) || [];
   const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      : 0;
    const roundedAverage = Math.round(averageRating * 10) / 10;
    const [editValue, setEditValue] = React.useState<PropsEditComment | null>(null);

    const editPost = async (productId: string, reviewId: string, text: string, rating: number, isEdit: boolean) => {
      setEditValue({ productId, reviewId, text, rating, isEdit });
      setRating(rating)
      setValue('text', text);
    };


  const { register, handleSubmit, reset, setValue, formState: { isValid, errors }} = useForm({
    defaultValues: { text: "" },
    mode: "onChange",
  });

  const reviewHandler = () => {
    if (!isAuth) {
      navigate("/registration?redirect=" + encodeURIComponent(location.pathname));
    }
  };

  const onSubmit = async (values: FormReview) => {
    if(editValue?.isEdit ) {
      await dispatch(fetchEditProductComment({
        productId: editValue.productId,
        reviewId: editValue.reviewId,
        text: values.text,
        rating: rating
      }));

      reset();
      setRating(0);
      setErrorStar(false);
    } else {
      setErrorStar(false);
    }

    if ((starNumber > 0 && reviewProduct?._id) && !editValue?.isEdit) {
      await dispatch(fetchProductComment({
        id: reviewProduct?._id,
        values,
        rating: starNumber,
      }));

      reset();
      setRating(0);
      setErrorStar(false);
    } else {
      setErrorStar(false);
    }
  };

  const onChange = (n: number) => {
    setStarNumber(n);
    setErrorStar(false);
  };

  return (
    <div className={styles.review}>
      <div className={styles.top}>
        <p className={styles.head}>Bike reviews ({ratings.length})</p>
 
         {ratings.length > 0 &&
          <div className={styles.heading}>Product rating:
            <ProcentStarRating rating={roundedAverage}/>
           {roundedAverage}  
           </div>
        }
        
        <button
          onClick={reviewHandler}
          className={styles.btn}
          type="button"
          disabled={isAuth}
        >
          Add a review
        </button>
      </div>

      <ReviewList editPost={editPost}/>

      {isAuth && (
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}  
        >
          <span className={styles.title}>
            Leave your review {reviewProduct?.name}
          </span>
   
          <StarRating
            onChange={onChange}
            rating={rating}
            setRating={setRating}
          />

          <div className={styles.block}>
          <div className={styles.textarea}>
            <textarea
              className={styles.text}
              placeholder="Enter your message"
              id="text"
              {...register("text", { required: "Please enter text" })}
              ></textarea>
              {/* <label htmlFor="text" className={styles.label}>Enter your message</label> */}
            </div>
          <div className={styles.error}>
            {errors?.text && <p>{errors.text.message}</p>}
          </div>
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={!isValid || errorStar}
          >
            {editValue?.isEdit ? 'Edit Review' : 'Add Review'}
            
          </button>
        </motion.form>
      )}
    </div>
  );
};


export default Review;
