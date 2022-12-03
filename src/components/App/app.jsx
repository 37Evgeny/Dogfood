// подключаем наши компоненты
import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { isLiked } from '../../utils/product';

import './index.css';
// import data from '../../assets/data.json'
// подключаем хуки
import { useState } from 'react';
import { useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';



function App() {
//  
  const [cards, setCards] =useState([]);
  //   
  const [searchQuery, setSearchQuery] = useState('');

  const [currentUser, setCurrentUser] = useState(null);
// вызываем функцию useDebounce    
  const debounceSearchQuery= useDebounce(searchQuery, 500);

  // Функция фильтрует карточки 
  const handleRequest= () => {
    // const filterCards =cards.filter(item=>item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    // setCards(filterCards);

    // поиск по товарам с сервера
    api.search(debounceSearchQuery)
    .then((searchResult)=>{
      setCards(searchResult)
    })
    // Чтобы не было не обработаного промиса
    .catch(err=> console.log(err))
  }
  
useEffect(()=>{

  Promise.all([api.getProductList(), api.getUserInfo()])
    .then(([productsData, userData])=>{
      setCurrentUser(userData)
      setCards(productsData.products)
  })
   // Чтобы не было не обработаного промиса
   .catch(err=> console.log(err))
},[])

//Динамическое изменение поиска 
  useEffect(()=>{
    handleRequest()
  },[debounceSearchQuery])

// Функция которая осуществляет поиск по нажатию на кнопку
  function handleFormSubmit(e) {
    e.preventDefault();
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
  function handleProductLike(product){
    const liked = isLiked(product.likes, currentUser._id)
    api.changeLikeProduct(product._id, liked)
    .then((newCard)=>{
      // Перебирает массив 
      const newProducts = cards.map(cardState=>{
          // Возвращает новый массив если был поставлен лайк или удален       
         return cardState._id ===newCard._id ? newCard : cardState;
      })
      setCards(newProducts);
    })
  }


  return (
    <>
    <Header user={currentUser} onUpdateUser={handleUpdateUser} >
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery}/>
        <div className='content__cards'>
         <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;
