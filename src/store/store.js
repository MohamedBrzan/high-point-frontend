import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import CreateUserSlice from './reducers/User/UserSlice';
import AboutApi from './apis/About/About';
import HptServicesApi from './apis/HptServices/HptServices';
import ServicesCardApi from './apis/ServicesCard/ServicesCard';
import ServicesSolutionsApi from './apis/ServicesSolutions/ServicesSolutions';
import ServicesTabsApi from './apis/ServicesTabs/ServicesTabs';
import HptSolutionsApi from './apis/HptSolutions/HptSolutions';
import SolutionsCardApi from './apis/SolutionsCard/SolutionsCard';
import SolutionsSolutionsApi from './apis/SolutionsSolutions/SolutionsSolutions';
import SolutionsTabsApi from './apis/SolutionsTabs/SolutionsTabs';
import CreateServiceCardSlice from './reducers/services/Card';
import CreateServiceTabSlice from './reducers/services/Tab';
import CreateBlogSlice from './reducers/Blog/BlogSlice';
import CreateNewsSlice from './reducers/NewsRoom/NewsRoomSlice';
import CreateContactUsSlice from './reducers/ContactUs/ContactUs.js';
import CreatePartnerSlice from './reducers/Partner/PartnerSlice';
import CreateServiceSolutionSlice from './reducers/services/Solution';
import CreateSolutionCardSlice from './reducers/solutions/Card';
import CreateSolutionTabSlice from './reducers/solutions/Tab';
import CreateSolutionSolutionSlice from './reducers/solutions/Solution';
import UserApi from './apis/User/User';
import BlogApi from './apis/Blog/Blog';
import NewsRoomApi from './apis/NewsRoom/NewsRoom';
import PartnerApi from './apis/Partner/Partner';
import ContactUsApi from './apis/ContactUs/ContactUs';
import ClientMessageApi from './apis/ClientMessage/ClientMessage';
import ProductApi from './apis/Product/Product';
import DocumentationApi from './apis/Documentation/Documentation';
import QuoteApi from './apis/Quote/Quote';
import RequestApi from './apis/Request/Request';
import CareerApi from './apis/Career/Career';
import InterfaceApi from './apis/Interface/Interface';
import PrivacyAndCookiesApi from './apis/PrivacyAndCookies/PrivacyAndCookies';

const store = configureStore({
  reducer: {
    user: CreateUserSlice,
    blog: CreateBlogSlice,
    news: CreateNewsSlice,
    contactUs: CreateContactUsSlice,
    partner: CreatePartnerSlice,
    serviceCard: CreateServiceCardSlice,
    serviceTab: CreateServiceTabSlice,
    serviceSolution: CreateServiceSolutionSlice,
    solutionCard: CreateSolutionCardSlice,
    solutionTab: CreateSolutionTabSlice,
    solutionSolution: CreateSolutionSolutionSlice,
    [PrivacyAndCookiesApi.reducerPath]: PrivacyAndCookiesApi.reducer,
    [InterfaceApi.reducerPath]: InterfaceApi.reducer,
    [CareerApi.reducerPath]: CareerApi.reducer,
    [RequestApi.reducerPath]: RequestApi.reducer,
    [QuoteApi.reducerPath]: QuoteApi.reducer,
    [DocumentationApi.reducerPath]: DocumentationApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [ClientMessageApi.reducerPath]: ClientMessageApi.reducer,
    [ContactUsApi.reducerPath]: ContactUsApi.reducer,
    [UserApi.reducerPath]: UserApi.reducer,
    [BlogApi.reducerPath]: BlogApi.reducer,
    [NewsRoomApi.reducerPath]: NewsRoomApi.reducer,
    [PartnerApi.reducerPath]: PartnerApi.reducer,
    [AboutApi.reducerPath]: AboutApi.reducer,
    [HptServicesApi.reducerPath]: HptServicesApi.reducer,
    [ServicesCardApi.reducerPath]: ServicesCardApi.reducer,
    [ServicesTabsApi.reducerPath]: ServicesTabsApi.reducer,
    [ServicesSolutionsApi.reducerPath]: ServicesSolutionsApi.reducer,
    [HptSolutionsApi.reducerPath]: HptSolutionsApi.reducer,
    [SolutionsCardApi.reducerPath]: SolutionsCardApi.reducer,
    [SolutionsTabsApi.reducerPath]: SolutionsTabsApi.reducer,
    [SolutionsSolutionsApi.reducerPath]: SolutionsSolutionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      PrivacyAndCookiesApi.middleware,
      InterfaceApi.middleware,
      CareerApi.middleware,
      RequestApi.middleware,
      QuoteApi.middleware,
      DocumentationApi.middleware,
      ProductApi.middleware,
      ClientMessageApi.middleware,
      ContactUsApi.middleware,
      UserApi.middleware,
      BlogApi.middleware,
      NewsRoomApi.middleware,
      PartnerApi.middleware,
      AboutApi.middleware,
      HptServicesApi.middleware,
      ServicesCardApi.middleware,
      ServicesTabsApi.middleware,
      ServicesSolutionsApi.middleware,
      HptSolutionsApi.middleware,
      SolutionsCardApi.middleware,
      SolutionsTabsApi.middleware,
      SolutionsSolutionsApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
