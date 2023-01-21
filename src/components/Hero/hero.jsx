import s from './index.module.css';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import banner from './img/banner.png';
import arrow from './img/arrow.svg';


export const Hero= ()=>{
    return(
        <div className={s.banner}>
            <div className={cn('container', s.banner__container)}>
                <div className={s.left}>
                    <h1 className={s.title}>Крафтовые лакомства для собак</h1>
                    <p className={s.subtitle}>Всегда свежие лакомства ручной работы с доставкой по России и Миру</p>
                    <Link to="catalog" className={s.link}>Каталог <img src={arrow} alt="arrow"/></Link>
                </div>
                <div className={s.right}>
                    <img src={banner} alt="Заглавное изображение"/>
                </div>
            </div>
        </div>
    )
}