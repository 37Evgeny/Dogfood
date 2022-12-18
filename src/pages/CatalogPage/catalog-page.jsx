import { useContext } from "react"
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner/spinner"
import { CardContext } from "../../context/cardContext"


const tabs =[
    {
        id: "cheap",
        title:'Сначала дешевые'
    },
    {
        id: "low",
        title:'Сначала дорогие'
    },
    {
        id: "sale",
        title:'По скидке'
    },
];


export const CatalogPage = ({isLoading}) =>{
    const {cards} = useContext(CardContext)

    return (
        <>
            <Sort tabs={tabs}/>
            <div className='content__cards'>
                {isLoading
                    ? <Spinner />
                    : <CardList cards={cards} />
                }
            </div>
        </>
    )
}