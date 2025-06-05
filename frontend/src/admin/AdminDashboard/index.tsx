import styles from "./dashboard.module.scss"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import AdminProducts from "./AdminProducts"
import AdminUsers from "./AdminUsers"

const variants = {
    hidden: { opacity: 0, y: 0, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -100, scale: 0 }
}

const AdminDashboard = () => {
    const route = useSelector((state: RootState) => state.admin.route)

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
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={variants}
                                    transition={{ duration: 0.4 }}
                                >
                                    <AdminProducts />
                                </motion.div>
                            )}

                            {route === "adminUsers" && (
                                <motion.div
                                    key="adminUsers"
                                    style={{ transformOrigin: "50% 50%" }}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={variants}
                                    transition={{ duration: 0.4 }}
                                >
                                    <AdminUsers />
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
