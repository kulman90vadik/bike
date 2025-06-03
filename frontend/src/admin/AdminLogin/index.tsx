import styles from "./adminlogin.module.scss"
import { useAppDispatch } from "../../redux/store"
import { useForm } from "react-hook-form"
import { fetchAuth } from "../../redux/slices/auth"
import { FormValueslogin } from "../../propstype"
import React from "react"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors, isValid }} = useForm({
        defaultValues: { email: "admin@example.com", password: "Vadik1990" },
        mode: "onChange" // при либом изменении формы
    })

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return <img className={styles.loading} src="/images/loading.gif" alt="Loading" />
    }

    const adminToken = localStorage.getItem("adminToken")
    if (adminToken) {
        navigate("/admin/dashboard");
    }


    const onSubmit = async (values: FormValueslogin) => {
        const data = await dispatch(fetchAuth(values))

        if (!data.payload) {
            return alert("Failed to log in")
        }

        if (data?.payload && typeof data.payload === "object" && "token" in data.payload && "role" in data.payload) {
            // window.localStorage.setItem('token', (data.payload as { token: string }).token);
            const { token, role } = data.payload as { token: string; role: string }

            // ⛔ Проверяем: только админ имеет доступ!
            if (role !== "admin") {
                return alert("У вас нет доступа к админ-панели")
            }

            localStorage.removeItem("token")
            // ✅ Сохраняем токен и пускаем админа   <!-- <a href="###URLV###" class="homepage">###URLV###</a> -->
            localStorage.setItem("adminToken", token)

            // window.localStorage.setItem('role', role);
            window.location.href = "/admin/dashboard" // или куда надо
        }
    }

    return (
        <section className={styles.login}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.title}>Admin Login</h2>

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
                        {...register("password", {
                            required: "Please enter your password",
                            minLength: {
                                value: 5,
                                message: "Minimum 5 characters"
                            }
                        })}
                    />
                    <div className={styles.error}>{errors?.password && <p>{errors.password.message}</p>}</div>
                </div>
                <button disabled={!isValid} className={styles.submit} type="submit">
                    Login
                </button>
            </form>
        </section>
    )
}

export default AdminLogin
