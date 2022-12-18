import { useState } from 'react';
import './index.css';

function Form({serializeCb}){
    // состояние хранит заполненые данные с формы
    const [formData, setFormData]= useState({
        name:"",
        lastName:"",
        phoneNumber:""
    });


    const handleChange = (event)=>{
        // Дестректурирует то что было в formData и заменяем на то что вводим
        // [event.target.name] переменная обращаемся через []
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        serializeCb(formData)
        setFormData({
            name:"",
            lastName:"",
            phoneNumber:""
        })
    }

    return(
        <form>
            <h3>Введите данные</h3>

            <input
                type='text'
                name="name"
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                />

                <input
                type='text'
                name="lastName"
                placeholder="Фамилия"
                value={formData.lastName}
                onChange={handleChange}
                />

                <input
                type='text'
                name="phoneNumber"
                placeholder="Номер телефона"
                value={formData.phoneNumber}
                onChange={handleChange}
                />

                <button>Отправить</button>
        </form>
    )
}

export default Form;