import { useParams, useNavigate } from "react-router-dom";
import ProductManageMenu from "../../components/admin/ProductManageMenu";

export default function ProductManagePage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-4 text-blue-600 hover:underline"
      >
        목록으로
      </button>
      <h1 className="text-xl font-bold mb-6">상품 관리 (ID: {productId})</h1>
      <ProductManageMenu productId={productId} />
    </div>
  );
}