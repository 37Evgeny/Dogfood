// подключаем наши компоненты
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { isLiked } from '../../utils/product';
import {CatalogPage} from '../../pages/CatalogPage/catalog-page';
import {ProductPage} from '../../pages/ProductPage/product-page';
import { UserContext } from '../../context/userContext';

import './index.css';
// import data from '../../assets/data.json'
// подключаем хуки
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback} from 'react'
import useDebounce from '../../hooks/useDebounce';
import {  Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import { NotFound, NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import { CardContext } from '../../context/cardContext';
import { ThemeContext } from 'styled-components';
import { themes } from '../../context/themeContext';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePAge/favorite-page';
import Form from '../Form/form';
import RegitrationForm from '../Form/registration-form';
import Modal from '../Modal/modal';



function App() {
//  поиск
  const [cards, setCards] =useState([]);
  //   
  const [searchQuery, setSearchQuery] = useState('');

  const [currentUser, setCurrentUser] = useState(null);
  // Состояние для спинера 
  const [isLoading, setIsLoading] = useState(true);

  const [theme, setTheme] = useState(themes.light);
  const [favorites,setFavorites]=useState([])
// вызываем функцию useDebounce    
  const debounceSearchQuery= useDebounce(searchQuery, 500);
const navigate = useNavigate()

  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath= location.state?.initialPath



  // // Функция фильтрует карточки 
  // const handleRequest= () => {
  //   // const filterCards =cards.filter(item=>item.name.toUpperCase().includes(searchQuery.toUpperCase()));
  //   // setCards(filterCards);
  //   //  влючаем спиннер                 
  //   setIsLoading(true);
  //   // поиск по товарам с сервера
  //   api.search(debounceSearchQuery)
  //   .then((searchResult)=>{
  //     setCards(searchResult)
  //   })
  //   // Чтобы не было не обработаного промиса
  //   .catch(err=> console.log(err))
  //   // выключаем спинер
  //   .finally(()=>{
  //     setIsLoading(false);
  //   })
  // }
    // Функция фильтрует карточки 
    const handleRequest = useCallback(() => {
      //  влючаем спиннер                 
      setIsLoading(true);
      // поиск по товарам с сервера
      api.search(searchQuery)
      .then((searchResult)=>{
        setCards(searchResult)
      })
      // Чтобы не было не обработаного промиса
      .catch(err=> console.log(err))
      // выключаем спинер
      .finally(()=>{
        setIsLoading(false);
      })
    },[searchQuery])
  
useEffect(()=>{
  //  влючаем спиннер  
  setIsLoading(true)
  Promise.all([api.getProductList(), api.getUserInfo()])
    .then(([productsData, userData])=>{
      setCurrentUser(userData)
      setCards(productsData.products)
      const favoriteProducts = productsData.products.filter(item=> isLiked(item.likes, userData._id))
      setFavorites(prevState =>favoriteProducts)
  })
   // Чтобы не было не обработаного промиса
   .catch(err=> console.log(err))
   // выключаем спинер
   .finally(()=> {
    setIsLoading(false)
   })
},[])

//Динамическое изменение поиска 
  useEffect(()=>{
    handleRequest()
  },[debounceSearchQuery])

// Функция которая осуществляет поиск по нажатию на кнопку
   const handleFormSubmit =(inputText)=> {
    navigate('/');
    setSearchQuery(inputText)
    //  Вызываем функцию 
    handleRequest();
  } 
// 
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  } 
// Функция изменения пользовательских данных
  function handleUpdateUser(userUpdateData){
    // обновленый объект отправляется на сервер
    api.setUserInfo(userUpdateData)
    // сервер отвечает обновленым объектом
    .then((newUserData)=> {
      setCurrentUser(newUserData)
    })
  }
// Фунция установки лайка 
  const handleProductLike = useCallback((product)=>{
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
    .then((updateCard)=>{
      // Перебирает массив 
      const newProducts = cards.map(cardState=>{
          // Возвращает новый массив если был поставлен лайк или удален       
         return cardState._id ===updateCard._id ? updateCard : cardState;
      })

      if(!liked){
        setFavorites(prevState => [...prevState, updateCard])
      }else{
        setFavorites(prevState=> prevState.filter(card => card._id !== updateCard._id))
      }

      setCards(newProducts);
      return updateCard;
    })
  },[currentUser, cards])
// переключение темы
  const toggleTheme= ()=>{
    theme === themes.dark? setTheme(themes.light) : setTheme(themes.dark);
  }

  const addContact= useCallback((FormData)=>{

  },[])

  return (
    <ThemeContext.Provider value={{theme: themes.light, toggleTheme}}>
    <UserContext.Provider value={{user: currentUser}}>
      <CardContext.Provider value={{cards, favorites, handleLike: handleProductLike}}>
     
      {/* <Modal active={isOpenModalForm} setActive={setIsOpenModalForm}>
          <RegitrationForm/>
      </Modal> */}
      <button onClick={()=>setIsOpenModalForm(true)}>Войти</button>
    <Header user={currentUser} onUpdateUser={handleUpdateUser} >
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Routes >
            <Route path = '/' element = {
                   <Search onSubmit={handleFormSubmit}
                   onInput={handleInputChange}
                  />
            }/>
          </Routes>
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchText={searchQuery}/>
        <Routes location={(backgroundLocation && {...backgroundLocation, pathname: initialPath}) || location}>
          <Route index element={
            <CatalogPage isLoading={isLoading}/>
          } />
          <Route path='/product/:productId' element={
            <ProductPage isLoading={isLoading} />
          } />
          <Route path='/faq' element={<FaqPage/>}/>
          <Route path='/favorites' element={<FavoritePage isLoading={isLoading}/>}/>
{/* отвечает за фоновое отображение */}
          <Route path='/login' element={
            <>
              Авторизация
              <Link to='/register'>Зарегистрироваться</Link>
            </>
          }/>

          <Route path='/register' element={
            <Modal>
              Регистрация
              <Link to='/login'>Войти</Link>
            </Modal>
          }/>

          <Route path='*' element={<NotFoundPage/>}/>

        </Routes>
          {/* отвечает за обычное отображение */}
          {backgroundLocation && (
            <Routes>
                 <Route path='/login' element={
            <Modal>
              Авторизация
              <Link to='/register' replace={true} state={{backgroundLocation: location, initialPath}}>Зарегистрироваться</Link>
            </Modal>
          }/>

          <Route path='/register' element={
            <Modal>
              Регистрация
              <Link to='/login' replace={true} state={{backgroundLocation: location, initialPath}}>Войти</Link>
            </Modal>
          }/>
            </Routes>

          )}

      </main>
      <Footer/>
      </CardContext.Provider>
    </UserContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App;
