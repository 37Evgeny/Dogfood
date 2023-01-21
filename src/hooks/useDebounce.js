import { useEffect, useState } from "react";

// кастомный хук задержки отправки запроса к серверу при вводе в поисковой строке

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);
    // установка таймера
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        // удаление таймера
        return () => clearTimeout(timeout)
    }, [value, delay])
    // после выполнения useEffect возвращает значение
    return debounceValue;
}

export default useDebounce;
