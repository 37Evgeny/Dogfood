import { useContext } from 'react';
import { CardContext } from '../../context/cardContext';
import Card from '../Card/card';
import './index.css';


const CardList = () => {
	const {cards} = useContext(CardContext)
	console.log(cards);
	return (
		<div className='cards'>
			{
				cards.map((item)=> <Card key={item._id} {...item}/>)
			}
			
		</div>
	);
};

export default CardList;
