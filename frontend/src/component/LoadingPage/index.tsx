import styles from "./loading.module.scss"


const LoadingPage = () => {
    return (
        <div className={styles.loading}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
               
            >
                <circle strokeWidth="1" stroke="#f57520" fill="none" r="0" cy="50" cx="50">
                    <animate
                        begin="0s"
                        calcMode="spline"
                        keySplines="0 0.2 0.8 1"
                        keyTimes="0;1"
                        values="0;40"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="r"
                    ></animate>
                    <animate
                        begin="0s"
                        calcMode="spline"
                        keySplines="0.2 0 0.8 1"
                        keyTimes="0;1"
                        values="1;0"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="opacity"
                    ></animate>
                </circle>
                <circle strokeWidth="1" stroke="#f57520" fill="none" r="0" cy="50" cx="50">
                    <animate
                        begin="-0.5s"
                        calcMode="spline"
                        keySplines="0 0.2 0.8 1"
                        keyTimes="0;1"
                        values="0;40"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="r"
                    ></animate>
                    <animate
                        begin="-0.5s"
                        calcMode="spline"
                        keySplines="0.2 0 0.8 1"
                        keyTimes="0;1"
                        values="1;0"
                        dur="1s"
                        repeatCount="indefinite"
                        attributeName="opacity"
                    ></animate>
                </circle>
            </svg>
        </div>
    )
}

export default LoadingPage
