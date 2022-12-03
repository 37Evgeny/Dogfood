import s from './index.module.css';
import cn from 'classnames';


function Header({children, user, onUpdateUser}) {
// функция изменения  
const handleClickButtonEdit=(e)=>{
  e.preventDefault();
  onUpdateUser({name: 'Maxim', about:'Mentor'})
}

  return (
     <header className={cn(s.header,'cover')}>
      <div className="container">
        {user?.email && <span>{user?.email}</span>}
        {user?.name && <span>{user?.name}</span>}
{/* Кнопка  */}
        <button className='btn' onClick={handleClickButtonEdit}>Изменить</button>

        <div className={s.wrapper}>
          {/*Добавляем все дочерние элементы */}
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
