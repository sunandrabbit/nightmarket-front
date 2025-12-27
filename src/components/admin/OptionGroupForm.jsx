import { useState } from "react";

export function OptionGroupForm({ onAdd }) {
  const [groupName, setGroupName] = useState("");

  const handleAdd = () => {
    if (groupName.trim()) {
      onAdd(groupName);
      setGroupName("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 flex-1 rounded"
        placeholder="옵션 그룹명 (예: 색상, 사이즈)"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAdd()}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
      >
        추가
      </button>
    </div>
  );
}
