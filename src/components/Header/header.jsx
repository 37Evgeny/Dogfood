import s from './index.module.css';
import cn from 'classnames';
import {ReactComponent as FavoriteIcon} from './img/favorites.svg';
import {ReactComponent as LogoutIcon} from './img/logout.svg';
import {ReactComponent as CartIcon} from './img/cart.svg';
import {ReactComponent as ProfileIcon} from './img/profile.svg';
import {ReactComponent as UserIcon} from './img/user.svg';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../storage/user/userSlice';


function Header({children, user, onUpdateUser}) {
// // функция изменения  
// const handleClickButtonEdit=(e)=>{
//   e.preventDefault();
//   onUpdateUser({name: 'Maxim', about:'Mentor'})
// }
// const { favorites} = useContext(CardContext);
const favorites= useSelector(state=>state.products.favoriteProducts)
const user = useSelector(state=>state.user.data)
const location =useLocation();
const dispatch= useDispatch();

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

            <Link className={s.favoritesLink} to={{pathname:"/cart"}}>
              <CartIcon/>
              {favorites.length !== 0 && <span className={s.iconBubble}>{favorites.length}</span>}
            </Link>

               {!user && <Link to='/login' state={{backgroundLocation: location, initialPath: location.pathname}} className={s.iconsMenuItem} >
              <UserIcon/>
              Войти
            </Link>
              }
            {user && <>
              <Link to='/profile' className={s.iconsMenuItem}>
              <ProfileIcon/>
              {user.name}
            </Link>

            <Link to='/' className={s.iconsMenuItem} onClick={()=>dispatch(logout())}>
              <LogoutIcon/>
              Выйти
            </Link>
            </>
            
} 
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
