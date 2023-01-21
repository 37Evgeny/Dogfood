import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/app';
// import { ProductPage } from './pages/ProductPage/product-page';
import { BrowserRouter } from 'react-router-dom';
import store from './storage/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
        {/* <ProductPage/> */}
    </BrowserRouter>
    </Provider>
);

