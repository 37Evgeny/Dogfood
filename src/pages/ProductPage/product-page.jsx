import Header from "../../components/Header/header"
import Logo from "../../components/Logo/logo"
import SeachInfo from "../../components/SeachInfo"
import Search from "../../components/Search/search"
import Spinner from "../../components/Spinner/spinner"

export const ProductPage = () => {
    return (
        <>
        <Header>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Search onSubmit={handleFormSubmit}/>
            </>
          </Header>
          <main className='content container'>
            <SeachInfo searchCount={cards.length} searchText={searchQuery}/>
            <div className='content__cards'>
              {isLoading
              ?<Spinner/>
              :null
              }
            </div>
          </main>
          <Footer/>
        </>
    )
} 