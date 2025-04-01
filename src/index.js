import React from 'react';
import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';
import App from './App';
import './utils/fixLeafletIcons';


const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


