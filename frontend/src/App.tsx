import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import PlantsShopPage from "./pages/PlantsShopPage/PlantsShopPage";
import ContactUs from "./pages/ContactUs/ContactUs";
import PlantDetailPage from "./pages/PlantDetailPage/PlantDetailPage";

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
          <Route path="/plants" element={<PlantsShopPage />} />
          <Route path="/plants/:id" element={<PlantDetailPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
