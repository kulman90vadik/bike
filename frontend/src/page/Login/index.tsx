import { useForm } from "react-hook-form";
import styles from "./login.module.scss";
import { useAppDispatch } from "../../redux/store";
import { FormValueslogin } from "../../propstype";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  
  const { register, handleSubmit, formState: {errors, isValid} } = useForm({
    defaultValues: { email: "jan@outlook.com", password: "12345" },
    mode: "onChange", // при либом изменении формы
  });
  
    
  const onSubmit = async (values:FormValueslogin) => {
      const data = await dispatch(fetchAuth(values));
      console.log(data, ' data');
      if(!data.payload) {
        return alert('Не удалось авторизоваться')
      }
    
      if (data?.payload && typeof data.payload === 'object' && 'token' in data.payload) {
        window.localStorage.setItem('token', (data.payload as { token: string }).token);
      }
    
      // reset();
    }
    if(isAuth) {
      return <Navigate to="/" />
    }

  return (
    <section className={styles.login}>
      <div className="container">
        <div className={styles.inner}>

       
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.block}>
          <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              {...register("email", { 
                required: "Укажите почту",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Введите корректный email"
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
              required: "Укажите пароль",
              minLength: {
                value: 5,
                message: 'Минимум 5 символов'
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


