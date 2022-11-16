import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import { googleLogout } from '@react-oauth/google';
window.onscroll = () => {
  if (window.scrollY >= 100) {
    if (document.getElementById('header')) {
      document.getElementById('header').classList.add('sticky_nav');
    }
  } else {
    if (document.getElementById('header')) {
      document.getElementById('header').classList.remove('sticky_nav');
    }
  }
};

function App() {
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId:
          '314628851838-i3too5br9jj9mnpa0kpin211g2uij8pn.apps.googleusercontent.com',
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);

    document
      .querySelectorAll('a')
      .forEach(
        (link) =>
          (link.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }))
      );
  });
  return (
    <>
      <ToastContainer />
      {!path.includes('authentication') && <Header />}

      <main>
        <AppRoutes />
      </main>
      {!path.includes('authentication') && <Footer />}
    </>
  );
}

export default App;
