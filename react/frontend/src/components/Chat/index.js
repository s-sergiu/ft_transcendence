import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <NotificationProvider> 
    <App />
    {/* <Playnchat /> */}
  </NotificationProvider>    
  </React.StrictMode>
);

reportWebVitals();
