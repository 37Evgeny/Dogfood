import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/not-found';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './index.css';
import { useSelector } from 'react-redux';


const CardList = ({cards}) => {
	
	const navigate = useNavigate();
	// const {isLoading} = useContext(UserContext)
	const loading = useSelector(state=>state.products.loading)
	return (
		<>
			{!cards.length && !loading && <NotFound buttonText='Назад' title="Простите по вашему запросу ничего не найдено" buttonAction={()=>navigate(-1)}/>}
				<div className='cards'>
			{
				cards.map((item, index)=> <Card key={item._id} {...item}/>)
			}
			
		</div>
		</>
	);
};

export default CardList;
