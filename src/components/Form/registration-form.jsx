import { useForm } from 'react-hook-form';
import { FormInput } from '../FormInput/form-input';


function RegistrationForm() {
    const { register, handleSubmit, formState } = useForm({ mode: "onBlur" });
    const cbSubmit = (data) => {
    }
    return (
        <form onSubmit={handleSubmit(cbSubmit)}>
            <h3>Регистрация</h3>
            <FormInput
                {...register('name', {
                    required: {
                        value: true,
                        message: "Имя пользователяе обязательно"
                    },
                    minLength: {
                        value: 2,
                        message: "Имя пользователяе не менее 3 символов"
                    }
                })}
                type="text"
                placeholder="Имя"
            />
            <div>
                {formState.errors?.name && <p className='errorMessage'>{formState.errors?.name?.message}</p>}
            </div>
            <input
                {...register('email')}
                type="text"
                placeholder="Email"
            />
            <input
                {...register('password', {
                    required: {
                        value: true,
                        message: "Поле пароля обязательно для заполнения"
                    },
                    pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: "Пароль должен содержать минимум восемь символов, одну букву латинского алфавита и одну цифру."
                    }
                })}
                type="password"
                placeholder="Password"
            />
            <div>
                {formState.errors?.password && <p className='errorMessage'>{formState.errors?.password?.message}</p>}
            </div>
            <button>Зарегистрироваться</button>
        </form>
    );
};

export default RegistrationForm;