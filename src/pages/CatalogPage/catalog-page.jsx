import { useContext } from "react"
import CardList from "../../components/CardList/card-list"
import Spinner from "../../components/Spinner/spinner"
import { CardContext } from "../../context/cardContext"

export const CatalogPage = ({isLoading}) =>{
    const {cards} = useContext(CardContext)

    return (
        <>
            <div className='content__cards'>
                {isLoading
                    ? <Spinner />
                    : <CardList cards={cards} />
                }
            </div>
        </>
    )
}