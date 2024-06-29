import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseContext } from './store/FirebaseContext.jsx';
import { app, auth } from './firebase/config.js';  // Use modular imports

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{ firebase: app, auth }}>
        <App />
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

