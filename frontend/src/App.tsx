import * as React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PlantsShopPage from './pages/PlantsShopPage/PlantsShopPage';
import ContactUs from './pages/ContactUs/ContactUs';
import PlantDetailPage from './pages/PlantDetailPage/PlantDetailPage';
import LogInPage from './pages/LogInPage/LogInPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import UserProfile from './pages/UserProfile/UserProfile';
import UserProfileUpdate from './pages/UserProfileUpdate/UserProfileUpdate';
import Cart from './pages/Cart/Cart';
import { CountProvider } from './components/CountContext/CountContext';
import parseJwt from './lib/parseJwt';
import { useNavigate } from 'react-router-dom';
import { RegisterData } from './types';
import { useUpdateUserProfile } from './hooks/useUpdateUserProfile';
import AdminPlantListPage from './pages/AdminPlantListPage/AdminPlantListPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import CheckoutShipping from './pages/CheckoutPage/CheckoutShipping';
import CheckoutPlaceOrder from './pages/CheckoutPage/CheckoutPlaceOrder';
import OrderPage from './pages/OrderPage/OrderPage';
import OrderPaymentPage from './pages/OrderPaymentPage/OrderPaymentPage';
import OrderPaymentSuccessPage from './pages/OrderPaymentSuccessPage/OrderPaymentSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage/MyOrdersPage';

type CartArray = {
  quantity: number;
  plantId: number;
  plantUnitPrice: number;
}[];

function App() {
  const [cartArray, setCartArray] = React.useState<CartArray>([]);
  const [hasCartItems, setHasCartItems] = React.useState(false);
  const [cartArrayFromStorage, setCartArrayFromStorage] =
    React.useState<CartArray>([]);
  const [hasTokenInLocalStorage, setHasTokenInLocalStorage] =
    React.useState(false);
  const [updateUserProfileErrorMessage, setUpdateUserProfileErrorMessage] =
    React.useState('');
  const [isUpdateUserProfileSuccess, setIsUpdateUserProfileSuccess] =
    React.useState(false);

  const navigate = useNavigate();

  const handleAddToCart = (
    quantity: number,
    plantId: number,
    plantUnitPrice: number
  ) => {
    const isInCart = cartArray.find((item) => item.plantId === plantId);

    if (isInCart) {
      const updatedCart = cartArray.map((cartItem) =>
        cartItem.plantId === plantId
          ? { plantId, plantUnitPrice, quantity: quantity + cartItem.quantity }
          : cartItem
      );
      setCartArray(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    } else {
      setCartArray([...cartArray, { quantity, plantId, plantUnitPrice }]);
      localStorage.setItem(
        'cartItems',
        JSON.stringify([...cartArray, { quantity, plantId, plantUnitPrice }])
      );
    }
  };

  const handleRemoveToCart = (plantId: number) => {
    const updatedCart = cartArrayFromStorage.filter(
      (cartItem) => cartItem.plantId !== plantId
    );
    setCartArray(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const emptyCart = () => {
    setCartArray([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  const handleLogOut = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setHasTokenInLocalStorage(false);
  };

  const updateUserProfileSuccess = () => {
    setIsUpdateUserProfileSuccess(true);
  };

  const updateUserProfileSuccessMessage = () => {
    setIsUpdateUserProfileSuccess(false);
  };

  const updateUserProfileError = () => {
    setUpdateUserProfileErrorMessage('Something went wrong, please try again.');
  };

  const { userProfileUpdate } = useUpdateUserProfile(
    updateUserProfileSuccess,
    updateUserProfileError
  );

  const handleUserProfileUpdate = (data: RegisterData) => {
    userProfileUpdate(data);
  };

  React.useEffect(() => {
    const localStorageCartItems = localStorage.getItem('cartItems');
    if (localStorageCartItems) {
      setCartArrayFromStorage(JSON.parse(localStorageCartItems));
    }
  }, [cartArray]);

  React.useEffect(() => {
    if (cartArrayFromStorage.length > 0) {
      setHasCartItems(true);
    }
    return () => {
      setHasCartItems(false);
    };
  }, [cartArrayFromStorage.length]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      setHasTokenInLocalStorage(true);
      const parsedJwt = parseJwt(jwt);
      const expDate = new Date(parsedJwt.exp * 1000);
      if (expDate < new Date()) {
        navigate('/login');
        localStorage.removeItem('token');
        setHasTokenInLocalStorage(false);
        return; //stops if this condition is true, it won't execute the line further down
      }
    }
  }, [navigate]);

  return (
    <>
      <Header
        hasCartItems={hasCartItems}
        hasTokenInLocalStorage={hasTokenInLocalStorage}
      />
      <CountProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plants" element={<PlantsShopPage />} />
          <Route
            path="/plants/:id"
            element={<PlantDetailPage handleAddToCart={handleAddToCart} />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/users/profile"
            element={
              <UserProfile
                handleLogOut={handleLogOut}
                isUpdateUserProfileSuccess={isUpdateUserProfileSuccess}
                updateUserProfileSuccessMessage={
                  updateUserProfileSuccessMessage
                }
              />
            }
          />
          <Route
            path="/users/profile/update"
            element={
              <UserProfileUpdate
                handleLogOut={handleLogOut}
                updateUserProfileErrorMessage={updateUserProfileErrorMessage}
                handleUserProfileUpdate={handleUserProfileUpdate}
              />
            }
          />
          <Route path="/admin/plantlist" element={<AdminPlantListPage />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartArrayFromStorage={cartArrayFromStorage}
                handleRemoveToCart={handleRemoveToCart}
              />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />}>
            <Route path="shipping" element={<CheckoutShipping />} />
            <Route
              path="place-order"
              element={<CheckoutPlaceOrder emptyCart={emptyCart} />}
            />
          </Route>
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/order/:id/pay" element={<OrderPaymentPage />} />
          <Route
            path="/order/:id/success"
            element={<OrderPaymentSuccessPage />}
          />
          <Route path="/myorders" element={<MyOrdersPage />} />
        </Routes>
      </CountProvider>
    </>
  );
}

export default App;
