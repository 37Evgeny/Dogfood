import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { fetchCreateReview } from "../../storage/singleProduct/singleProductsSlice"
import api from "../../utils/api"
import { EMAIL_REGEXP, INITIAL_VALUE_RATING, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"
import { Rating } from "../Rating/rating"
import { ResetPassword } from "../ResetPassword/reset-password"

export const FormReview=({title = "Отзыв о товаре", productId, setProduct})=>{
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onBlur" })
    const [rating, setRating]= useState(INITIAL_VALUE_RATING)

    const sendReviewProduct = (data) => {
        // api.createReviewProduct(productId, {...data, rating})
        //     .then(newProduct => {
        //         setProduct && setProduct(newProduct)
        //         console.log(newProduct)
        //     })
        dispatch(fetchCreateReview({productId,data}))
        .then(()=>{
            reset();
            setRating(INITIAL_VALUE_RATING)
        })
    }


    const textReview = register('text', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        },
    })

    return (
        <Form title={title} handleFormSubmit={handleSubmit(sendReviewProduct)}>

            <Rating rating={rating} isEditable setRating={setRating}/>

            <FormInput
                {...textReview}
                id="text"
                typeinput="textarea"
                placeholder='Напишите текст отзыва'
            />
         
                {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}
 

                    <FormButton type="submit" color="yellow">Отправить отзыв</FormButton>


        </Form>



    )
}