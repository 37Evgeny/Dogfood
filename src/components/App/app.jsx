import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import SeachInfo from '../SeachInfo';
import api from '../../utils/api';
import { isLiked } from '../../utils/product';
import { CatalogPage } from '../../pages/CatalogPage/catalog-page';
import { ProductPage } from '../../pages/ProductPage/product-page';
import { FaqPage } from '../../pages/FAQPage/faq-page';
import { FavoritePage } from '../../pages/FavoritePage/favorite-page';
import Modal from '../Modal/modal';
import { NotFoundPage } from '../../pages/NotFoundPage/not-found-page';
import './index.css';
import { UserContext } from '../../context/userContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react'
import useDebounce from '../../hooks/useDebounce';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CardContext } from '../../context/cardContext';
import { Register } from '../Register/register';
import { Login } from '../Login/login';
import { ResetPassword } from '../ResetPassword/reset-password';

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([])
  const [currentSort, setCurrentSort] = useState("")
  const debounceSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate()
  const [isOpenModalForm, setIsOpenModalForm] = useState(false);
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const initialPath = location.state?.initialPath

  const handleRequest = useCallback(() => {
    setIsLoading(true);
    api.search(searchQuery)
      .then((searchResult) => {
        setCards(searchResult)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }, [searchQuery])

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getProductList(), api.getUserInfo()])
      .then(([productsData, userData]) => {
        setCurrentUser(userData)
        setCards(productsData.products)
        const favoriteProducts = productsData.products.filter(item => isLiked(item.likes, userData._id))
        setFavorites(prevState => favoriteProducts)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    handleRequest()
  }, [debounceSearchQuery])

  const handleFormSubmit = (inputText) => {
    navigate('/');
    setSearchQuery(inputText)
    handleRequest();
  }

  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  }

  function handleUpdateUser(userUpdateData) {
    api.setUserInfo(userUpdateData)
      .then((newUserData) => {
        setCurrentUser(newUserData)
      })
  }

  const handleProductLike = useCallback((product) => {
    const liked = isLiked(product.likes, currentUser._id)
    return api.changeLikeProduct(product._id, liked)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState;
        })

        if (!liked) {
          setFavorites(prevState => [...prevState, updateCard])
        } else {
          setFavorites(prevState => prevState.filter(card => card._id !== updateCard._id))
        }

        setCards(newProducts);
        return updateCard;
      })
  }, [currentUser, cards])

  // const addContact = useCallback((FormData) => {

  // }, [])

const sortedData = (currentSort) => {

    switch (currentSort) {
      case 'low': setCards(cards.sort((a, b) => b.price - a.price)); break;
      case 'cheap': setCards(cards.sort((a, b) => a.price - b.price)); break;
      case 'sale': setCards(cards.sort((a, b) => b.discount - a.discount)); break;
      default: setCards(cards.sort((a, b) => a.price - b.price)); break;
    }
  }

  return (
    <UserContext.Provider value={{ user: currentUser }}>
      <CardContext.Provider value={{ cards, favorites, currentSort, handleLike: handleProductLike, onSortData: sortedData, setCurrentSort }}>
        <Header user={currentUser} onUpdateUser={handleUpdateUser} >
          <>
            <Logo className="logo logo_place_header" href="/" />
            <Routes >
              <Route path='/' element={
                <Search onSubmit={handleFormSubmit}
                  onInput={handleInputChange}
                />
              } />
            </Routes>
          </>
        </Header>
        <main className='content container'>
          <SeachInfo searchText={searchQuery} />
          <Routes location={(backgroundLocation && { ...backgroundLocation, pathname: initialPath }) || location}>
            <Route index element={
              <CatalogPage />
            } />
            <Route path='/product/:productId' element={
              <ProductPage isLoading={isLoading} />
            } />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/favorites' element={<FavoritePage isLoading={isLoading} />} />
            <Route path='/login' element={
              <Login />
            } />

            <Route path='/register' element={
              <Register />
            } />

            <Route path='/reset-password' element={
              <ResetPassword />
            } />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>

          {backgroundLocation && (
            <Routes>
              <Route path='/login' element={
                <Modal>
                  <Login />
                </Modal>
              } />

              <Route path='/register' element={
                <Modal>
                  <Register />
                </Modal>
              } />

              <Route path='/reset-password' element={
                <Modal>
                  <ResetPassword />
                </Modal>
              } />
            </Routes>
          )}
        </main>
        <Footer />
      </CardContext.Provider>
    </UserContext.Provider>
  )
}

export default App;
