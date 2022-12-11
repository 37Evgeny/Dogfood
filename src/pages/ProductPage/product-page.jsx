import { useCallback } from "react"
import { useState, useEffect} from 'react';
import Spinner from "../../components/Spinner/spinner"
import api from "../../utils/api"
import { isLiked } from "../../utils/product"
import { Product } from "../../components/Product/poduct"
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound/not-found";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";

// const ID_PRODUCT = '622c77e877d63f6e70967d22';
export const ProductPage = ({isLoading}) => {
  // useParams
  const {productId} = useParams()
  // Обработка ошибки
  const [errorState, setErrorState] = useState(null)
  // Состояние для конкретной карточки
  const [product, setProduct] = useState(null);

  const {handleLike} = useContext(CardContext);
  
  // Фунkция установки лайка 
  const handleProductLike = useCallback(()=>{
    handleLike(product)
    .then((updatePoduct)=>{
      setProduct(updatePoduct);
    })
  },[product, handleLike]) 

  useEffect(()=>{
    //  влючаем спиннер  
    // setIsLoading(true)
      api.getProductById(productId)
      .then((productsData)=>{
        // setCurrentUser(userData)
        setProduct(productsData)
    })
     // Чтобы не было не обработаного промиса
     .catch(err=> setErrorState(err))
     // выключаем спинер
    //  .finally(()=> {
    //   setIsLoading(false)
    //  })
  },[])

    return (
        <>
            <div className='content__cards'>
              {isLoading
              ?<Spinner/>
              : !errorState && <Product {...product} setPoduct={setProduct} onProductLike={handleProductLike}/>
              }
              {!isLoading && errorState && <NotFound/>}
            </div>
        </>
    )
}