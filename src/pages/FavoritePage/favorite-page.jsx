import { useContext } from "react"
import { useSelector } from "react-redux"
import CardList from "../../components/CardList/card-list"
import { ContentHeader } from "../../components/ContentHeader/content-header"
import Spinner from "../../components/Spinner/spinner"
import { CardContext } from "../../context/cardContext"

export const FavoritePage = ({isLoading} ) =>{
    // const {favorites} = useContext(CardContext)

    const favorites = useSelector(state=> state.products.favoriteProducts)

    return (
        <div className="container container_inner">
            <ContentHeader title='Избранное'/>
            <div className='content__cards'>
                {isLoading
                    ? <Spinner />
                    : <CardList cards={favorites}/>
                }
            </div>
        </div>
    )
}