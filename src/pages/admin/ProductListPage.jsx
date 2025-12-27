import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/admin/ProductCard";

export default function ProductListPage() {
  const navigate = useNavigate();
  
  const products = [
    { id: "1", name: "여름 티셔츠", status: "DRAFT" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">상품 목록</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          상품 추가
        </button>
      </div>
      <ul className="space-y-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </ul>
    </div>
  );
}