import { useCallback } from "react"
import Spinner from "../../components/Spinner/spinner"
import api from "../../utils/api"
import { Product } from "../../components/Product/product"
import { useParams } from "react-router-dom";
import { NotFound } from "../../components/NotFound/not-found";
import { useContext } from "react";
import { CardContext } from "../../context/cardContext";
import { useApi } from "../../hooks/useApi";

export const ProductPage = () => {
  const { productId } = useParams()
  const { handleLike } = useContext(CardContext);

  const handleGetProduct = useCallback(() => api.getProductById(productId), [productId]);

  const {
    data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState
  } = useApi(handleGetProduct)

  // Фунkция установки лайка 
  const handleProductLike = useCallback(() => {
    handleLike(product)
      .then((updateProduct) => {
        setProduct(updateProduct);
      })
  }, [product, handleLike, setProduct])

  return (
    <>
      <div className='content__cards'>
        {isLoading
          ? <Spinner />
          : !errorState && <Product {...product} setProduct={setProduct} onProductLike={handleProductLike} />
        }
        {!isLoading && errorState && <NotFound />}
      </div>
    </>
  )
}