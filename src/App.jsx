import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPostsPage from "./pages/ProductPostsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginInvalidPage from "./pages/LoginInvalidPage";
import OrderSheetPage from "./pages/OrderSheetPage";

import ProductListPage from "./pages/admin/ProductListPage";
import ProductCreatePage from "./pages/admin/ProductCreatePage";
import ProductManagePage from "./pages/admin/ProductManagePage";
import OptionManagePage from "./pages/admin/OptionManagePage";
import VariantManagePage from "./pages/admin/VariantManagePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPostsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login/invalid" element={<LoginInvalidPage />} />
        <Route path="/order/sheet" element={<OrderSheetPage />} />

        <Route path="/admin/products" element={<ProductListPage />} />
        <Route path="/admin/products/new" element={<ProductCreatePage />} />
        <Route path="/admin/products/:productId" element={<ProductManagePage />} />
        <Route path="/admin/products/:productId/options" element={<OptionManagePage />} />
        <Route path="/admin/products/:productId/variant" element={<VariantManagePage />} />
      </Routes>
    </>
  );
}
export default App;