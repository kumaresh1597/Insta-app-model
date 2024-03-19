import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style.css";
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './Context/UserProvider';

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <UserProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </UserProvider>
    
);


