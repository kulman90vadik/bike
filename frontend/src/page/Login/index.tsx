import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import { useAppDispatch } from "../../redux/store";
import { FormValueslogin } from "../../propstype";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAllBasket } from "../../redux/slices/basket";
import { fetchAllFavorites } from "../../redux/slices/favorites";
import React from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuth) {
      // Получаем параметр redirect из URL
      const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';
      navigate(redirectTo); // Перенаправляем после успешного логина
    }
  }, [isAuth, location.search, navigate]);

  
  const { register, handleSubmit, formState: {errors, isValid} } = useForm({
    defaultValues: { email: "tom@outlook.com", password: "123456" },
    mode: "onChange", // при либом изменении формы
  });
    
  const onSubmit = async (values:FormValueslogin) => {
      const data = await dispatch(fetchAuth(values));
      if(!data.payload) {
        return alert('Failed to log in')
      }
    
      if (data?.payload && typeof data.payload === 'object' && 'token' in data.payload) {
        window.localStorage.setItem('token', (data.payload as { token: string }).token);
      }

 localStorage.removeItem('adminToken');

      await dispatch(fetchAllBasket())
      await dispatch(fetchAllFavorites())
  }

  

  return (
    <section className={styles.login}>
      <div className="container">
        <div className={styles.inner}>     
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <span className={styles.title}>Login</span>
          <div className={styles.block}>
          <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              {...register("email", { 
                required: "Enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email"
                }
               })}
              />
            <div className={styles.error}>{errors?.email && <p>{errors.email.message}</p>}</div>
          </div>
          <div className={styles.block}>
          <label className={styles.label}>Password</label>
          <input 
            className={styles.input} 
            type="text" 
            {...register('password', {
              required: "Please enter your password",
              minLength: {
                value: 5,
                message: 'Minimum 5 characters'
              }
            })}
          />
           <div className={styles.error}>{errors?.password && <p>{errors.password.message}</p>}</div>
        </div>
          <button disabled={!isValid} className={styles.submit} type="submit">
            Login
          </button>

        </form>
      </div>
      </div>
    </section>
  );
};

export default Login;


