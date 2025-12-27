import { useState } from "react";

export function OptionValueList({ values }) {
  const [newValue, setNewValue] = useState("");
  const [valueList, setValueList] = useState(values || []);

  const addValue = () => {
    if (newValue.trim()) {
      setValueList([...valueList, newValue]);
      setNewValue("");
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="border p-1 text-sm flex-1 rounded"
          placeholder="옵션 값 (예: 빨강, M, 100ml)"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addValue()}
        />
        <button
          onClick={addValue}
          className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
        >
          값 추가
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {valueList.map((value, idx) => (
          <span key={idx} className="bg-gray-100 px-3 py-1 rounded text-sm">
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}