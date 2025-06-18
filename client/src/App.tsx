import './App.scss';
import './assets/scss/variables.scss';

import { useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from './components/AuthContext';
import { Loader } from './components/Loader';
import { usePageError } from './hooks/usePageError';

import { StateProvider } from './state/provider';
import { Layout } from './utils/Layout/Layout';
import { AppRoutes } from './enums/AppRoutes';
import { Categories } from './enums/Categories';

import { HomePage as HomeStore } from './modules/HomePage/HomePage';
import { CartPage } from './modules/CartPage/CartPage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { ProductDetailPage } from './modules/ProductDetailPage/ProductDetailPage';

// import { HomePage } from './modules/HomePage';
import { RegistrationPage } from './modules/RegistrationPage';
import { LoginPage } from './modules/LoginPage';
import { AccountActivationPage } from './modules/AccountActivationPage';
import { RequireAuth } from './components/RequireAuth';
import { ProfilePage } from './modules/ProfilePage';
import { UsersPage } from './modules/UsersPage';
import { ChangePasswordPage } from './modules/ChangePasswordPage';
import { ResetPage } from './modules/ResetPage';
import { NotFoundPage } from './modules/NotFoundPage';

function InnerApp() {
  const navigate = useNavigate();
  const [error, setError] = usePageError();
  const { isChecked, user, logout, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  return (
    <StateProvider>
      <main className='section'>


        <Routes>
          <Route path={AppRoutes.HOME} element={<Layout />}>
            <Route index element={<HomeStore />} />
            <Route path={AppRoutes.PHONES} element={<ProductPage category={Categories.PHONES} />} />
            <Route path={AppRoutes.TABLETS} element={<ProductPage category={Categories.TABLETS} />} />
            <Route path={AppRoutes.ACCESSORIES} element={<ProductPage category={Categories.ACCESSORIES} />} />
            <Route path={AppRoutes.PRODUCT_DETAILS(':category', ':productId')} element={<ProductDetailPage />} />
            <Route path={AppRoutes.FAVORITES} element={<FavoritesPage />} />
            <Route path={AppRoutes.CART} element={<CartPage />} />
            <Route path='/' element={<RequireAuth children={undefined} />}>
              <Route path='profile' element={<ProfilePage />} />
            </Route>
            <Route path='/sign-up' element={<RegistrationPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/activate/:activationToken' element={<AccountActivationPage />} />
            <Route path='/reset' element={<ResetPage />} />
            <Route path='/reset/:resetToken' element={<ChangePasswordPage />} />

            <Route path='*' element={<NotFoundPage />} />
          </Route>
        </Routes>

        {error && <p className="notification is-danger">{error}</p>}
      </main>
    </StateProvider>
  );
}

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <InnerApp />
      </Router>
    </AuthProvider>
  );
};
