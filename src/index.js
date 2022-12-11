import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/app';
// import { ProductPage } from './pages/ProductPage/product-page';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
        {/* <ProductPage/> */}
    </BrowserRouter>
);

