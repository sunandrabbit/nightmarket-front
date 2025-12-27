import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/admin/ProductForm";

export default function ProductCreatePage() {
  const navigate = useNavigate();

  const handleCreate = (productName) => {
    const productId = Math.random().toString(36).substr(2, 9);
    alert(`상품 "${productName}" 생성됨 (ID: ${productId})`);
    navigate(`/admin/products/${productId}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <button
        onClick={() => navigate("/admin/products")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← 목록으로
      </button>
      <h1 className="text-xl font-bold mb-4">상품 생성</h1>
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
}