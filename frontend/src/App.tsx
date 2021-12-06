import * as React from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header";
import PlantsShopPage from "./pages/PlantsListPage/PlantsShopPage";
import ContactUs from "./pages/ContactUs/ContactUs";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<PlantsShopPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
