import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import PlantsShopPage from "./pages/PlantsShopPage/PlantsShopPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage";
import LogInPage from "./pages/LogInPage/LogInPage";
import Cart from "./pages/Cart/Cart";
import { CountProvider } from "./components/CountContext/CountContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

type CartArray = {
  quantity: number;
  plantId: number;
}[];

function App() {
  const [cartArray, setCartArray] = React.useState<CartArray>([]);
  const [hasCartItems, setHasCartItems] = React.useState(false);
  const [cartArrayFromStorage, setCartArrayFromStorage] =
    React.useState<CartArray>([]);

  const handleAddToCart = (quantity: number, plantId: number) => {
    const isInCart = cartArray.find((item) => item.plantId === plantId);

    if (isInCart) {
      const updatedCart = cartArray.map((cartItem) =>
        cartItem.plantId === plantId
          ? { plantId, quantity: quantity + cartItem.quantity }
          : cartItem
      );
      setCartArray(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      setCartArray([...cartArray, { quantity, plantId }]);
      localStorage.setItem(
        "cartItems",
        JSON.stringify([...cartArray, { quantity, plantId }])
      );
    }
  };

  const handleRemoveToCart = (plantId: number) => {
    const updatedCart = cartArrayFromStorage.filter(
      (cartItem) => cartItem.plantId !== plantId
    );
    console.log(`updatedCart`, updatedCart);
    setCartArray(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
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

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header hasCartItems={hasCartItems} />
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
      </Router>
    </QueryClientProvider>
  );
}

export default App;
