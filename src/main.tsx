import './i18n';
import React from 'react';
import ReactDOM from 'react-dom/client';
// Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// Get the base path from Vite's env variables
const baseName = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Pass basename prop */}
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);