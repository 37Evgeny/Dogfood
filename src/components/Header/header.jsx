import s from './index.module.css';
import cn from 'classnames';
import {ReactComponent as FavoriteIcon } from './img/favorites.svg';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';


function Header({children, user, onUpdateUser}) {
// // функция изменения  
// const handleClickButtonEdit=(e)=>{
//   e.preventDefault();
//   onUpdateUser({name: 'Maxim', about:'Mentor'})
// }
const { favorites} = useContext(CardContext);

const location =useLocation();

  return (
     <header className={cn(s.header,'cover')}>
      <div className="container">
        {/* {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}
         Кнопка
        <button className='btn' onClick={handleClickButtonEdit}>Изменить</button> */}

        <div className={s.header__wrapper}>
          {/*Добавляем все дочерние элементы */}
          {children}
          <div className={s.iconsMenu}>
          <Link className={s.favoritesLink} to={{pathname:"/favorites"}}>
            <FavoriteIcon/>
            {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
          </Link>

          <Link to='/login' state={{backgroundLocation: location, initialPath:location.pathname}}>Войти</Link>

          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
