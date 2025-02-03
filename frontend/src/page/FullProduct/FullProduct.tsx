import React from "react";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { ProductProps } from "../../propstype";


const FullProduct = () => {
    const [data, setData] = React.useState<ProductProps | null>();
    const {id} = useParams();
    const navigate = useNavigate();
    // const favorites = useSelector((state: RootState) => state.favorites.data);
    // const basket = useSelector((state: RootState) => state.basket.data);
    // const status = useSelector((state: RootState) => state.favorites.status);
    // const isLoading = status === 'loadingg';

    React.useEffect(() => {
        axios.get(`./products/${id}`).then(res => {
          setData(res.data);
        //   setIsLoading(false)
        // if (res.data?._id && id === res.data._id) {
        //     if (res.data.slug) {
        //       navigate(`/products/${res.data.slug}`, { replace: true });
        //     } else {
        //       console.log("Slug отсутствует");
        //     }
        //   }


        }).catch(err => {
          console.warn(err);
        })
      }, [id, navigate])


console.log(data);
  
    return (
     <>
     
     </>
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