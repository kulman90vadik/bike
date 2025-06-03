// import React from "react"
import styles from "./dashboard.module.scss"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { UsersProps } from "../../propstype"
import { PencilLine, Trash2 } from "lucide-react"

const AdminDashboard = () => {
    const products = useSelector((state: RootState) => state.products.allproducts)
    const users = useSelector((state: RootState) => state.auth.users)
    const route = useSelector((state: RootState) => state.admin.route)

    console.log(users)

    const variants = {
        hidden: { opacity: 0, y: 0, scale: 0 }, // чуть уменьшен при скрытии
        visible: { opacity: 1, y: 0, scale: 1 }, // нормальный размер при показе
        exit: { opacity: 0, y: -100, scale: 0 } // чуть уменьшается при уходе
    }

    return (
        <section className={styles.dashboard}>
            <div className={styles.hero}>
                <div className="container">
                    <div className={styles.top}></div>
                    <motion.div style={{ overflow: "hidden" }} transition={{ height: { duration: 0.3 } }}>
                        <AnimatePresence mode="wait">


                            {route === "adminProducts" && (
                                <motion.div
                                    style={{ transformOrigin: "50% 50%" }}
                                    key="adminProducts"
                                    // ref={containerRef}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={variants}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className={styles.list}>
                                        {products.map(product => (
                                            <article key={product._id} className={styles.products}>
                                                <div>
                                                    <img
                                                        className={styles.imageproduct}
                                                        src={product.image}
                                                        alt={product.name}
                                                    />
                                                </div>
                                                <div className={styles.info}>
                                                    <div className={styles.name}>
                                                        <span>Product name:</span>
                                                        {product.name}
                                                    </div>
                                                    <div className={styles.sale}>
                                                        <span>Product sale:</span>
                                                        {product.sale}
                                                    </div>
                                                    <div className={styles.price}>
                                                        <span>Product price:</span>
                                                        {product.price}
                                                    </div>

                                                    <div className={styles.bottom}>
                                                        <button className={styles.btns} type="button">
                                                            <PencilLine /> Edit
                                                        </button>
                                                        <button
                                                            className={`${styles.btns} ${styles.delete}`}
                                                            type="button"
                                                        >
                                                            <Trash2 /> Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {route === "adminUsers" && (
                                <motion.div
                                    key="adminUsers"
                                    style={{ transformOrigin: "50% 50%" }}
                                    // ref={containerRef}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={variants}
                                    transition={{ duration: 0.4 }}
                                >
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
                                </motion.div>
                            )}



                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard

