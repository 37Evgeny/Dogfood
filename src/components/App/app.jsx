import CardList from '../CardList/card-list';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Logo from '../Logo/logo';
import Search from '../Search/search';
import './index.css';
import data from '../../assets/data.json'
import { useState } from 'react';
import { useEffect } from 'react';
import SeachInfo from '../SeachInfo';


function App() {
//  
  const [cards, setCards] =useState(data)
  //   
  const [searchQuery, setSearchQuery] = useState('');

  // Функция фильтрует карточки 
  const handleRequest= () => {
    const filterCards =data.filter(item=>item.name.toUpperCase().includes(searchQuery.toUpperCase()));
    setCards(filterCards);
  }
  
//Динамическое изменение поиска 
  useEffect(()=>{
    handleRequest()
  },[searchQuery])

// Функция которая осуществляет поиск по нажатию на кнопку
  const handleFormSubmit =(e) =>{
    e.preventDefault();
    //  Вызываем функцию 
    handleRequest();
  } 
// 
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue)
  } 

  return (
    <>
    <Header>
        <>
          <Logo className="logo logo_place_header" href="/" />
          <Search onSubmit={handleFormSubmit} onInput={handleInputChange}/>
        </>
      </Header>
      <main className='content container'>
        <SeachInfo searchCount={cards.length} searchText={searchQuery}/>
        <div className='content__cards'>
         <CardList goods={cards}/>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;
