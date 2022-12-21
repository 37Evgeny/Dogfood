import './index.css'
import cn from 'classnames'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Modal({children}){

const [active, setActive]=useState();

const navigate= useNavigate()
useEffect(()=>{
    setActive(true);
},[])

function onClose(){
    setActive(false)
    navigate(-1)
}

    return(
        <div className={cn(`modal`, {[`active`]: active})} onClick={onClose}>
            <div className={cn(`modal_content`, {[`active`]: active})} onClick={e=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;