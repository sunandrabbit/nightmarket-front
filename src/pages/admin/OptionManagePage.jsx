import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { OptionGroupForm } from "../../components/admin/OptionGroupForm";
import { OptionGroupList } from "../../components/admin/OptionGroupList";

export default function OptionManagePage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);

  const addGroup = (groupName) => {
    setGroups([...groups, { name: groupName, values: [] }]);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <button
        onClick={() => navigate(`/admin/products/${productId}`)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← 상품 관리로
      </button>
      <h1 className="text-xl font-bold mb-4">옵션 관리</h1>
      
      <OptionGroupForm onAdd={addGroup} />
      <OptionGroupList groups={groups} />
    </div>
  );
}