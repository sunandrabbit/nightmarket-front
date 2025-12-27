import { useState } from "react";

export default function ProductForm({ onSubmit }) {
  const [productName, setProductName] = useState("");

  const handleSubmit = () => {
    if (productName.trim()) {
      onSubmit(productName);
      setProductName("");
    } else {
      alert("상품명을 입력해주세요");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">상품명</label>
        <input
          className="w-full border p-2 rounded"
          placeholder="상품명을 입력하세요"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        저장
      </button>
    </div>
  );
}