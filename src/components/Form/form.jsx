import cn from 'classnames';
import s from './index.module.css';
import './style.css';


function Form({ title, handleFormSubmit, children }) {

    return (
        <form className={s.form} onSubmit={handleFormSubmit}>

            <h1 className={s.title}>{title}</h1>

            {children}
{/* 
            <FormInput
                {...emailRegister}
                id="email"
                type="text"
                placeholder={input.email}
            />

            <div>
                {errors?.email && <p className='errorMessage'>{errors?.email?.message}</p>}
            </div>

            {['login', 'registration'].includes(formType) &&
                <>
                    <FormInput
                        {...passwordRegister}
                        id="password"
                        type="password"
                        placeholder={input.password}
                    />
                    
                    <div>
                        {errors?.password && <p className='errorMessage'>{errors?.password?.message}</p>}
                    </div>
                </>
            }

            {formType === 'login' &&
                <p className={cn(s.infoText, s.link)} onClick={() => changeType('reset')}>{infoText}</p>
            }

            {['reset', 'registration'].includes(formType) &&
                <p className={s.infoText}>{infoText}</p>
            }

            <FormButton type="submit" color="yellow">{button.submit}</FormButton>

            {['login', 'registration'].includes(formType) &&
                <FormButton color="white" type="button" onClick={() => changeType(redirect)}>{button.redirect}</FormButton>
            } */}
        </form>
    );
};

export default Form;