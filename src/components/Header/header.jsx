import './index.css';


function Header({children}) {
  return (
    <header className='header'>
      <div className="container">
        <div className="header__wrapper">
          {/*Добавляем все дочерние элементы */}
          {children}
        </div>
      </div>
    </header>
  )
}

export default Header;
