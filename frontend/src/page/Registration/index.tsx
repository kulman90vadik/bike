import { useForm } from "react-hook-form";
import styles from "./registration.module.scss";
import { useAppDispatch } from "../../redux/store";
import { FormValuesRegister } from "../../propstype";
import { fetchRegister } from "../../redux/slices/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { ImageUp } from "lucide-react";
import React from "react";
import {isAxiosError} from 'axios';
import axios from "../../axios";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  avatarFile?: FileList;
  avatarUrl?: string;
};

const Registration = () => {
  const [preview, setPreview] = React.useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";

  const[error, setError] = React.useState('')

  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);
  const { register, handleSubmit, watch, formState: { errors, isValid }} = useForm<FormValues>({
    defaultValues: {
      fullName: 'Tom',
      email: 'tom@outlook.com',
      password: '123456',
      avatarFile: undefined,
      avatarUrl: ''
    },
    mode: 'all' 
  })

  const avatarFile = watch("avatarFile") as FileList | undefined;


  React.useEffect(() => {
    if (avatarFile?.length) {
      const file = avatarFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
  
      return () => URL.revokeObjectURL(objectUrl); // очищаем после
    }
  }, [avatarFile]);

  const onSubmit = async (values:FormValuesRegister) => {
    const formData = new FormData();
    let avatarUrl = ''

    if (values.avatarFile?.[0]) {
      formData.append('image', values.avatarFile[0]); // важно: это массив! 
    
      try {
        const { data } = await axios.post('/uploads', formData);
        avatarUrl = data.url;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          // alert(error.response.data.message); // Показать ошибку пользователю
          setError(error.response.data.message)
          setPreview(null)
        } else {
          setError('Произошла неизвестная ошибка при загрузке файла.')
          setPreview(null)
        }
        return;
      }
    }

    let { avatarFile, ...restOfValues } = values;
    let mdata = await dispatch(fetchRegister({ ...restOfValues, avatarUrl }));

    if (!mdata.payload) {
      return alert('Registration failed')
    }

    if (mdata?.payload && typeof mdata.payload === 'object' && 'token' in mdata.payload) {
      window.localStorage.setItem('token', (mdata.payload as { token: string }).token);
    }

    localStorage.removeItem('adminToken');

    navigate(redirect);
  }

  return (
    <section className={styles.login}>
      <div className="container">
      <div className={styles.inner}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <span className={styles.title}>Registration</span>
        <label className={styles.photo} >    
          {!preview &&
          <ImageUp />
          }
          {preview
          &&
          <img  className={styles.preview} src={preview} alt="Preview" />
          }
          <input 
            type="file"
            accept="image/png, image/jpeg"
            // onChange={(event) => handleChangeFile(event)} 
            hidden 
            {...register("avatarFile")}
            />
        </label>  

        {error && <div className={styles.errorphoto}>{error}</div>}

          <div className={styles.block}>
          <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              {...register("fullName", { 
                required: "Enter your full name"
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
              required: "Enter your password",
              minLength: {
                value: 5,
                message: 'Minimum 5 characters'
              }
            })}
          />
           <div className={styles.error}>{errors?.password && <p>{errors.password.message}</p>}</div>
        </div>
          <button disabled={!isValid} className={styles.submit} type="submit">
          Register
          </button>
          <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className={styles.account} >
            Already have an account? Log in.
          </Link>

        </form>
      </div>
      </div>
    </section>
  );
};

export default Registration;


