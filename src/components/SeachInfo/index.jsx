import { useContext } from "react";
import { useSelector } from "react-redux";
import { CardContext } from "../../context/cardContext";
import "./index.css";

const SeachInfo = ({searchText}) => {
	// const {cards}=useContext(CardContext)
	const products = useSelector(state=>state.products.data)
	const searchCount = products.length;
	return (
		searchText && <section className="search-title">
			По запросу <span>{searchText}</span> найдено {searchCount} товаров
		</section>
	);
};

export default SeachInfo;
