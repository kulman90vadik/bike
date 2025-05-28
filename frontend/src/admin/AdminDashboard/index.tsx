import React from "react"
import styles from "./dashboard.module.scss"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"

const AdminDashboard = () => {
    const products = useSelector((state: RootState) => state.products.allproducts)
    console.log(products);

    return (
        <section className={styles.dashboard}>
            <div className={styles.hero}>
                <div className="container">
                    <div className={styles.list}>

                    {products.map(product => {
                        return(
                            <article key={product._id} className={styles.article}>
                                <div><img src={product.image} alt="" /></div>
                                <span>{product.name}</span>
                                <div>{product.price}</div>
                                {/* <p>{product.description}</p> */}
                            </article>
                        )
                    })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard
