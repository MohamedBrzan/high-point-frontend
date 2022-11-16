import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as Anim from './anim/Anim';
import * as AnimationFile from './anim/SolarSystemAnimation/AnimationFile';
import { Provider } from 'react-redux';
import store from './store/store';
import './I18n/I18n';
import CustomSpinner from './utils/CustomSpinner/CustomSpinner';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<CustomSpinner />}>
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </Suspense>
);

Anim();
AnimationFile();
