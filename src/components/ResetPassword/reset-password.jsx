import { useForm } from "react-hook-form"
import { EMAIL_REGEXP, PASSWORD_REGEXP, VALIDATE_CONFIG } from "../../utils/constants"
import Form from "../Form/form"
import { FormButton } from "../FormButton/form-button"
import { FormInput } from "../FormInput/form-input"

export const ResetPassword=()=>{
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" })

const sendRegisterApi=(data)=>{
    console.log(data);
}


    const emailRegister = register('email', {
        required: {
            value: true,
            message: VALIDATE_CONFIG.requiredMessage
        },
        pattern: {
            value: EMAIL_REGEXP,
            message: VALIDATE_CONFIG.emailMessage
        }
    })


    return (
        <Form title='Востановление пароля' handleFormSubmit={handleSubmit(sendRegisterApi)}>
            <p className='infoText'>Для получения временного пароля необходимо ввести email, указанный при регистрации.</p>
            <FormInput
                {...emailRegister}
                id="email"
                type="text"
                placeholder='email'
            />
         
                {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}
 
                    <p className='infoText'>Срок действия временного пароля 24 ч.</p>

                    <FormButton type="submit" color="yellow">Отправить</FormButton>
     </Form>
    )
}