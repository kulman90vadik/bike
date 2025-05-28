import styles from "./dashboard.module.scss"

const AdminDashboard = () => {
    return (
        <section className={styles.dashboard}>
            <div className={styles.hero}>
                <div className="container">Admin Dashboard</div>
            </div>
        </section>
    )
}

export default AdminDashboard
