import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginInvalidPage from "./pages/LoginInvalidPage";
import OrderSheetPage from "./pages/OrderSheetPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login/invalid" element={<LoginInvalidPage />} />
        <Route path="/order/sheet" element={<OrderSheetPage />} />
      </Routes>
    </>
  );
}
export default App;