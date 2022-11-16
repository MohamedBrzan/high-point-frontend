import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from '../pages/About/About';
import NewsRoom from '../pages/NewsRoom/NewsRoom';
import Partner from '../pages/Partner/Partner';
import Interface from '../Interface/Interface';
import HptServicesPage from '../pages/Services/HptServicesPage/HptServicesPage';
import HptSolutionsPage from '../pages/Solutions/HptSolutionsPage/HptSolutionsPage';
import ViewServices from '../pages/Services/ViewServices/ViewServices';
import ViewSolutions from '../pages/Solutions/ViewSolutions/ViewSolutions';
import Product from '../pages/Product/Product';
import RegisterAdmin from '../pages/Authentication/RegisterAdmin';
import PrivacyAndCookies from '../pages/PrivacyAndCookies/PrivacyAndCookies';

const RegisterPage = lazy(() => import('../pages/Authentication/Register'));
const LoginPage = lazy(() => import('../pages/Authentication/Login'));
const ForgotPassword = lazy(() =>
  import('../pages/Authentication/ForgotPassword')
);
const ResetPassword = lazy(() =>
  import('../pages/Authentication/ResetPassword')
);

const ViewNews = lazy(() => import('../pages/NewsRoom/ViewNews'));
const Blog = lazy(() => import('../pages/Blog/Blog'));
const ViewBlog = lazy(() => import('../pages/Blog/ViewBlog'));
const Documentation = lazy(() =>
  import('../pages/Documentation/Documentation')
);
const ApplyJob = lazy(() => import('../pages/ApplyJob/ApplyJob'));
const ContactUs = lazy(() => import('../pages/ContactUs/ContactUs'));
const Career = lazy(() => import('../pages/Career/Career'));
const Quote = lazy(() => import('../pages/Quote/Quote'));

const AppRoutes = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Interface />} />
        <Route path='/hpt-services'>
          <Route index element={<HptServicesPage />} />
          <Route path='view/:index' element={<ViewServices />} />
        </Route>
        <Route path='/hpt-solutions'>
          <Route index element={<HptSolutionsPage />} />
          <Route path='view/:index' element={<ViewSolutions />} />
        </Route>
        {!user.name && (
          <Route path='/authentication/'>
            <Route path='register' element={<RegisterPage />} />

            <Route path='mohamedmahmoudbrzan' element={<RegisterAdmin />} />

            <Route path='login' element={<LoginPage />} />
            <Route path='forgot_password' element={<ForgotPassword />} />
            <Route
              path='reset_password/:id/:token'
              element={<ResetPassword />}
            />
          </Route>
        )}
        <Route path='about' element={<About />} />
        <Route path='/blogs/'>
          <Route index element={<Blog />} />
          <Route path=':index' element={<ViewBlog />} />
        </Route>
        <Route path='/news_room/'>
          <Route index element={<NewsRoom />} />
          <Route path=':index' element={<ViewNews />} />
        </Route>
        <Route path='/partners/'>
          <Route index element={<Partner />} />
        </Route>
        <Route path='/contact_us/'>
          <Route index element={<ContactUs />} />
        </Route>
        <Route path='/product/:index'>
          <Route index element={<Product />} />
        </Route>
        <Route path='/documentation/'>
          <Route index element={<Documentation />} />
        </Route>
        <Route path='/apply_job/'>
          <Route index element={<ApplyJob />} />
        </Route>
        <Route path='/quote/'>
          <Route index element={<Quote />} />
        </Route>
        <Route path='/career/'>
          <Route index element={<Career />} />
        </Route>
        <Route path='/privacy&cookies/'>
          <Route index element={<PrivacyAndCookies />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default AppRoutes;
