import s from './index.module.css'
import cn from 'classnames'

export const Banner =({title, subtitle, bg, price, extraClass, colorBg})=>{
    return (
        <div className={cn(s.banner,{ [s[extraClass]]: !!extraClass})} style={{backgroundImage: `url(${bg})`, backgroundColor:colorBg}}>
            <h2 className={s.title}>{title}</h2>
            <h2 className={s.subtitle}>{subtitle}</h2>
            <span className={price}>{price}</span>
        </div>
        )
}