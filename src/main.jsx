import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import Context, { FirebaseContext } from './store/Context.jsx';
import { app, auth } from './firebase/config.js'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{ firebase: app, auth }}>
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

