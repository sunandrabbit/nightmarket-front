import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import VariantTable from "../../components/admin/VariantTable";

export default function VariantManagePage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [variants, setVariants] = useState([
    { sku: "TS-RED-M", options: "빨강 / M", stock: 10 },
  ]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(`/admin/products/${productId}`)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← 상품 관리로
      </button>
      <h1 className="text-xl font-bold mb-4">Variant / 재고 관리</h1>

      <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
        옵션 조합 생성
      </button>

      <VariantTable variants={variants} />
    </div>
  );
}