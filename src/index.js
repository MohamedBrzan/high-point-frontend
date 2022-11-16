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
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<CustomSpinner />}>
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Provider store={store}>
            {/* <GoogleOAuthProvider clientId='314628851838-i3too5br9jj9mnpa0kpin211g2uij8pn.apps.googleusercontent.com'> */}
            <App />
            {/* </GoogleOAuthProvider> */}
          </Provider>
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  </Suspense>
);

Anim();
AnimationFile();
