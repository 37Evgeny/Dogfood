import { useContext } from "react"
import { useSelector } from "react-redux"
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner/spinner"
import { CardContext } from "../../context/cardContext"





export const CatalogPage = ({isLoading}) =>{
    // const {cards} = useContext(CardContext)
    const products = useSelector(state=>state.products.data)

    return (
        <div className="container container_inner">
            <Sort/> 
            <div className='content__cards'>
                {isLoading
                    ? <Spinner />
                    : <CardList cards={products} />
                }
            </div>
        </div>
    )
}