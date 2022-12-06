import { useCallback } from "react"
import { useState, useEffect} from 'react';
import Header from "../../components/Header/header"
import Logo from "../../components/Logo/logo"
import Search from "../../components/Search/search"
import Spinner from "../../components/Spinner/spinner"
import Footer from "../../components/Footer/footer"

import api from "../../utils/api"
import { isLiked } from "../../utils/product"
import { Product } from "../../components/Product/poduct"

const ID_PRODUCT = '622c77e877d63f6e70967d22';
export const ProductPage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    // Состояние для спинера 
    const [isLoading, setIsLoading] = useState(true);
    // Состояние для конкретной карточки
    const [product, setProduct] = useState(null);

    // Функция фильтрует карточки 
  const handleRequest = useCallback((searchQuery) => {
    //  влючаем спиннер                 
    setIsLoading(true);
    // поиск по товарам с сервера
    api.search(searchQuery)
    .then((searchResult)=>{
    
    })
    // Чтобы не было не обработаного промиса
    .catch(err=> console.log(err))
    // выключаем спинер
    .finally(()=>{
      setIsLoading(false);
    })
  },[])

  // Фунkция установки лайка 
  const handleProductLike = useCallback(()=>{
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked)
    .then((newProducts)=>{
      setProduct(newProducts);
    })
  },[product, currentUser]) 

  useEffect(()=>{
    //  влючаем спиннер  
    setIsLoading(true)
    Promise.all([api.getProductById(ID_PRODUCT), api.getUserInfo()])
      .then(([productsData, userData])=>{
        setCurrentUser(userData)
        setProduct(productsData)
    })
     // Чтобы не было не обработаного промиса
     .catch(err=> console.log(err))
     // выключаем спинер
     .finally(()=> {
      setIsLoading(false)
     })
  },[])

    return (
        <>
        <Header>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Search onSubmit={handleRequest}/>
            </>
          </Header>
          <main className='content container'>
            <div className='content__cards'>
              {isLoading
              ?<Spinner/>
              :<Product {...product} currentUser={currentUser} onProductLike={handleProductLike}/>
              }
            </div>
          </main>
          <Footer/>
        </>
    )
}