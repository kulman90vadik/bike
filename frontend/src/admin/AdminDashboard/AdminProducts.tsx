import { ChevronDown, PencilLine, Trash2, X } from "lucide-react"
import styles from "./dashboard.module.scss"
import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { useState } from "react"




const AdminProducts = () => {
    const { allproducts, statusAll } = useSelector((state: RootState) => state.products)
    const [count, setCount] = useState<number | null>(null)
    return (
            <div className={styles.list}>
                {statusAll === "loading" &&
                    [...Array(8)].map((_, index) => (
                        <div className={styles.card} key={index}>
                            <svg
                                className={styles.loading}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid"
                            >
                                <g>
                                    <g transform="rotate(0 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.9166666666666666s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(30 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.8333333333333334s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(60 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.75s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(90 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.6666666666666666s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(120 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.5833333333333334s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(150 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.5s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(180 50 50)">
                                        <rect fill="#fff" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.4166666666666667s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(210 50 50)">
                                        <rect fill="#f57520" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.3333333333333333s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(240 50 50)">
                                        <rect fill="#f57520" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.25s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(270 50 50)">
                                        <rect fill="#f57520" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.16666666666666666s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(300 50 50)">
                                        <rect fill="#f57520" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="-0.08333333333333333s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g transform="rotate(330 50 50)">
                                        <rect fill="#f57520" height="12" width="6" ry="6" rx="3" y="24" x="47">
                                            <animate
                                                repeatCount="indefinite"
                                                begin="0s"
                                                dur="1s"
                                                keyTimes="0;1"
                                                values="1;0"
                                                attributeName="opacity"
                                            ></animate>
                                        </rect>
                                    </g>
                                    <g></g>
                                </g>
                            </svg>
                        </div>
                    ))}
                {allproducts.map((product, index) => (
                    <article key={product._id} className={styles.products}>
                        <div>
                            <img className={styles.imageproduct} src={product.image} alt={product.name} />
                        </div>
                        <div className={styles.info}>
                            <div className={styles.block}>
                                <span>Product name:</span>
                                {product.name}
                            </div>
                            <div className={`${styles.block} ${styles.sale}`}>
                                <span>Product sale:</span>
                                {product.sale}
                            </div>
                            <div className={styles.block}>
                                <span>Product price:</span>
                                {product.price}
                            </div>
                            <div className={styles.block}>
                                <span>Sale Price:</span>
                                {Math.round(
                                    Number(product.price) * (1 - Number(product.sale?.replace(/%/g, "")) / 100)
                                )}
                            </div>
                            <div className={styles.block}>
                                <span>New product:</span>
                                {product.newproduct ? "new" : "old"}
                            </div>
                            <div className={`${styles.block} ${styles.country}`}>
                                <span>Product country:</span>
                                {product.country}
                            </div>

                            <div className={styles.block}>
                                <span>Product flag:</span>
                                <img className={styles.flag} src={product.flag} alt={product.country} />
                            </div>

                            <div className={styles.block}>
                                <span>Product category:</span>
                                {product.category}
                            </div>

                            <div className={`${styles.description}`}>
                                <button
                                    className={styles.block}
                                    onClick={() => {
                                        setCount(prev => (prev === index ? null : index))
                                        // setOpenWidget(!openWidget)
                                    }}
                                >
                                    <span>Product description:</span>
                                    <ChevronDown />
                                </button>

                                <p
                                    style={{
                                        maxHeight: count === index ? "460px" : "0px",
                                        padding: count === index ? "15px" : "0px",
                                        overflowY: count === index ? "auto" : "hidden"
                                    }}
                                    className={styles.text}
                                >
                                    <X onClick={() => setCount(prev => (prev === index ? null : index))} />
                                    {product.description}
                                </p>
                            </div>

                            <div className={styles.bottom}>
                                <button className={styles.btns} type="button">
                                    <PencilLine /> Edit
                                </button>
                                <button className={`${styles.btns} ${styles.delete}`} type="button">
                                    <Trash2 /> Delete
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
    )
}

export default AdminProducts
