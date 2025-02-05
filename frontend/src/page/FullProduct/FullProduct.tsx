import React from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { ProductProps } from "../../propstype";
import styles from './fullproduct.module.scss';
// import Counter from "../../component/Counter";

const FullProduct = () => {
    const [data, setData] = React.useState<ProductProps | null>(null);
    const {id} = useParams();
    const [isLoading, setIsLoading] = React.useState(true);
  
   
    React.useEffect(() => {  
      axios.get(`./products/${id}`).then(res => {
        setData(res.data); 
        setIsLoading(false)
      }).catch(err => {
        console.warn(err);
      })
    }, [])
  
  
    return (
     <section className={styles.product}>
      <div className="container">

        <div className={styles.inner}>
          {isLoading && 
            <img className={styles.loading} src="/images/loading.gif" alt="Loading" />
          }
          <div className={styles.left}>
            <img className={styles.image} src={data?.image} alt={data?.name} />
          </div>
          <div className={styles.right}>
            <h1>
              {data?.name}
            </h1>
            {/* {
             data && 
             <div className={styles.counter}>
               <Counter obj={data}/>
             </div>
            } */}
            </div>
        </div>

      </div>
     </section>
    );
  }
   
  export default FullProduct;

//  const { slugOrId } = useParams(); // Приходит либо id, либо slug
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:5000/products/${slugOrId}`) // Запрос по ID
//       .then((res) => res.json())
//       .then((data) => {
//         setProduct(data);

//         // 🟢 Если в URL id, меняем на slug
//         if (slugOrId === data._id) {
//           navigate(`/products/${data.slug}`, { replace: true });
//         }
//       })
//       .catch((err) => console.error("Ошибка загрузки:", err));
//   }, [slugOrId, navigate]);

//   if (!product) return <p>Загрузка...</p>;