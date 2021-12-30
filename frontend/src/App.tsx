import * as React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import PlantsShopPage from "./pages/PlantsShopPage/PlantsShopPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import Cart from "./pages/Cart/Cart";
import { CountProvider } from "./components/CountContext/CountContext";
import parseJwt from "./lib/parseJwt";
import { useNavigate } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      setCartArray([...cartArray, { quantity, plantId, plantUnitPrice }]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartArray, { quantity, plantId, plantUnitPrice }])
      );
    }
  };

  const handleRemoveToCart = (plantId: number) => {
    const updatedCart = cartArrayFromStorage.filter(
      (cartItem) => cartItem.plantId !== plantId
    );
    setCartArray(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleLogOut = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setHasTokenInLocalStorage(false);
  };

  React.useEffect(() => {
    const localStorageCartItems = localStorage.getItem("cartItems");
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
    const jwt = localStorage.getItem("token");

    if (jwt) {
      setHasTokenInLocalStorage(true);
      const parsedJwt = parseJwt(jwt);
      const expDate = new Date(parsedJwt.exp * 1000);
      if (expDate < new Date()) {
        navigate("/login");
        localStorage.removeItem("token");
        setHasTokenInLocalStorage(false);
        return; //stops if this condition is true, it won't execute the line further down
      }
    }
  }, [navigate]);

  return (
    <QueryClientProvider client={queryClient}>
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
            element={<UserProfile handleLogOut={handleLogOut} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartArrayFromStorage={cartArrayFromStorage}
                handleRemoveToCart={handleRemoveToCart}
              />
            }
          />
        </Routes>
      </CountProvider>
    </QueryClientProvider>
  );
}

export default App;
