
import styles from "./dashboard.module.scss"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { UsersProps } from "../../propstype"


const AdminUsers = () => {
    const users = useSelector((state: RootState) => state.auth.users)

    return (
            <div className={styles.list}>
                {users.map((user: UsersProps) => (
                    <article key={user._id} className={styles.users}>
                        {user.avatarUrl != "" ? (
                            <img
                                className={styles.smallimg}
                                src={`https://honest-bikeapp.up.railway.app${user.avatarUrl}`}
                                // src={`${import.meta.env.VITE_API_BASE_URL}${user.avatarUrl}`}
                                alt={user.fullName}
                            />
                        ) : (
                            <img
                                className={styles.smallimg}
                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/d-person.png`}
                                alt="Person"
                            />
                        )}

                        <span>{user.email}</span>
                        <div>{user.fullName}</div>
                        <div>role: {user.role}</div>
                    </article>
                ))}
            </div>
     
    )
}

export default AdminUsers
