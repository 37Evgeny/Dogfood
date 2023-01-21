import { useCallback } from "react"
import { useState, useEffect} from 'react';
import Spinner from "../../components/Spinner/spinner"
import api from "../../utils/api"
import { isLiked } from "../../utils/product"
import { Product } from "../../components/Product/product"
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound/not-found";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { useApi } from "../../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct, setProductState } from "../../storage/singleProduct/singleProductsSlice";
import { fetchChangeLikeProduct } from "../../storage/products/productsSlice";

// const ID_PRODUCT = '622c77e877d63f6e70967d22';
export const ProductPage = () => {
  // useParams
  const {productId} = useParams()
  // Обработка ошибки
  // const [errorState, setErrorState] = useState(null)
  // Состояние для конкретной карточки
  // const [product, setProduct] = useState(null);
// 
  // const {handleLike} = useContext(CardContext);
  
// const handleGetProduct = useCallback (()=> api.getProductById(productId), [productId]);

const dispatch= useDispatch();
const {data: product, loading: isLoading, error: errorState}=useSelector(state=>state.singleProduct)

useEffect(()=>{
  dispatch(fetchSingleProduct(productId))
}, [dispatch, productId])

// const {
//   data: product,
//   setData: setProduct,
//   loading: isLoading,
//   error: errorState
// } =useApi(handleGetProduct)


  // Фунkция установки лайка 
  const handleProductLike = useCallback(()=>{
    // handleLike(product)
    // .then((updateProduct)=>{
    //   setProduct(updateProduct.payload.product);
    // })
    dispatch(fetchChangeLikeProduct(product))
    .then(updateProduct=>{
      dispatch(setProductState(updateProduct.payload.product))
    })

  },[product, dispatch]) 


  // заменили на свой хук useApi
  // useEffect(()=>{
  //   //  влючаем спиннер  
  //   // setIsLoading(true)
  //     api.getProductById(productId)
  //     .then((productsData)=>{
  //       // setCurrentUser(userData)
  //       setProduct(productsData)
  //   })
  //    // Чтобы не было не обработаного промиса
  //    .catch(err=> setErrorState(err))
  //    // выключаем спинер
  //   //  .finally(()=> {
  //   //   setIsLoading(false)
  //   //  })
  // },[])


    return (
        <div className="container container_inner">
            <div className='content__cards'>
              {isLoading
              ?<Spinner/>
              : !errorState && <Product {...product} onProductLike={handleProductLike}/>
              }
              {!isLoading && errorState && <NotFound/>}
            </div>
        </div>
    )
}