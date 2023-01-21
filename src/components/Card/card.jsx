import cn from 'classnames';
import './index.css';
import {ReactComponent as Save} from "./save.svg";
import { isLiked } from '../../utils/product';
import { calcDiscountPrice } from '../../utils/product';
import { Link } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { CardContext } from '../../context/cardContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeLikeProduct } from '../../storage/products/productsSlice';

const Card = ({name, _id, likes, price, discount, wight, description, pictures}) => { 
	// const {user: currentUser} = useContext(UserContext);
	const dispatch= useDispatch();
	const currentUser= useSelector(state=>state.user.data);
	const isLoading =useSelector(state=>state.user.getUserRequest)
	// const {handleLike: onProductLike} = useContext(CardContext);
	const discount_price = calcDiscountPrice(price, discount);
	const liked = isLiked(likes, currentUser?._id);

	  // Фунция установки лайка 
	  const handleLikeClick = useCallback(() => {
		return dispatch(fetchChangeLikeProduct({_id,likes}))
	  }, [dispatch, _id, likes])

// 	function handleLikeClick(){
// 	onProductLike({_id, likes})
// }

	return (
		<div className="card">
			<div className="card__sticky card__sticky_type_top-left">
				{discount !==0 && <span className="card__discount">{`-${discount}%`}</span>}
			</div>
			<div className="card__sticky card__sticky_type_top-right">
				<button className={cn("card__favorite", {'card__favorite_is-active': liked} )} onClick={handleLikeClick}>
					<Save className='card__favorite-icon'/>
				</button>
			</div>

			<Link to={`/product/${_id}`} className="card__link">
				<img src={pictures} alt={description} className="card__image" />
				<div className="card__desc">
					<span className={discount !==0 ? "card__old-price" : "card__price"}>{price}&nbsp;₽</span>
						{discount !==0 &&<span className="card__price card__price_type_discount">{discount_price}&nbsp;₽</span>}
					<span className="card__wight">{wight}</span>
						<p className="card__name">{name}</p>
				</div>
			</Link>

			<a href="" className="card__cart btn btn_type_primary">В корзину</a>
		</div>
	);
};

export default Card;
