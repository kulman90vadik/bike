import { ChevronDown } from "lucide-react"
import styles from "./accardion.module.scss"
import { motion } from "framer-motion"
import React from "react"

let data = [
    {
        head: "lorem lorem lorem",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, magnam provident quaerat officiis voluptatem suscipit consequuntur? Quis aliquam dolor reprehenderit at saepe pariatur, cumque soluta ipsa? Enim, ad exercitationem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, magnam provident quaerat officiis voluptatem suscipit consequuntur? Quis aliquam dolor reprehenderit at saepe pariatur, cumque soluta ipsa? Enim, ad exercitationem."
    },
    {
        head: "lorem lorem lore",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, magnam provident quaerat officiis voluptatem suscipit consequuntur? Quis aliquam dolor reprehenderit at saepe pariatur, cumque soluta ipsa? Enim, ad exercitationem."
    },
    {
        head: "lorem lorem lorem",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, magnam provident quaerat officiis voluptatem suscipit consequuntur? Quis aliquam dolor reprehenderit at saepe pariatur, cumque soluta ipsa? Enim, ad exercitationem."
    },
    {
        head: "lorem lorem lorem",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, magnam provident quaerat officiis voluptatem suscipit consequuntur? Quis aliquam dolor reprehenderit at saepe pariatur, cumque soluta ipsa? Enim, ad exercitationem."
    }
]

const FaqAccordion = () => {
    const [count, setCount] = React.useState(0) // изначально открыт первый

    const toggle = (index: number) => {
        if (count === index) {
            setCount(-1) // закрыть, если кликнули по открытому
        } else {
            setCount(index) // открыть новый
        }
    }

    return (
        <section className={styles.accardion}>
            <div className={styles.bg} style={{ backgroundImage: "url(/images/paralax/first2.png)" }}></div>
            <div className="container">
                <h2 className={styles.title}>Frequently Asked Questions</h2>
                <motion.ul>
                    {data.map((item, index) => (
                        <motion.li
                            className={styles.item}
                            key={index}
                            onClick={() => toggle(index)}
                            animate={{
                                height: count === index ? "auto" : 50
                                // opacity: count === index ? 1 : 0,
                            }}
                            style={{ overflow: "hidden" }}
                            transition={{ duration: 0.3 }}
                        >
                            <button className={`${styles.btn} ${count === index ? styles.rotate : ""}`}>
                                {item.head}
                                <ChevronDown />
                            </button>
                            <motion.p className={styles.text}>{item.text}</motion.p>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    )
}

export default FaqAccordion
