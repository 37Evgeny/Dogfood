import CardList from "../../components/CardList/card-list"
import Spinner from "../../components/Spinner/spinner"

export const CatalogPage = ({isLoading}) =>{
    return (
        <>
            <div className='content__cards'>
                {isLoading
                    ? <Spinner />
                    : <CardList />
                }
            </div>
            console.log(CatalogPage)
        </>
    )
}