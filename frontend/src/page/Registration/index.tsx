import { useForm } from "react-hook-form";
import styles from "./registration.module.scss";
import { useAppDispatch } from "../../redux/store";
import { FormValuesRegister } from "../../propstype";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Registration = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register, handleSubmit, formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      fullName: 'ВАСЯ',
      email: 'vasja@outlook.com',
      password: '123456'
    },
    mode: 'all' // при либом изменении формы
  })


  // будет выполняться после того как форм поймёт что валидация норм 
  const onSubmit = async (values:FormValuesRegister) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Не удалось зарегестрироваться')
    }

    if (data?.payload && typeof data.payload === 'object' && 'token' in data.payload) {
      window.localStorage.setItem('token', (data.payload as { token: string }).token);
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }


  return (
    <section className={styles.login}>
      <div className="container">
      <div className={styles.inner}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.block}>
          <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              {...register("fullName", { 
                required: "Укажите полное имя"
               })}
              />
            <div className={styles.error}>{errors?.fullName && <p>{errors.fullName.message}</p>}</div>
          </div>
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
           Зарегистрироваться
          </button>

        </form>
      </div>
      </div>
    </section>
  );
};

export default Registration;


