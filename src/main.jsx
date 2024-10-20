import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './index.css';
import Providers from "./Providers.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Providers>
            <Router/>
        </Providers>
    </React.StrictMode>
);
