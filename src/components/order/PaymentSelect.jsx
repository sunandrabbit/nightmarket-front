// src/components/order/PaymentSelect.jsx
import React from "react";

export default function PaymentSelect({ value, onChange }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">결제수단 선택</h3>
      <div className="flex flex-col gap-2">
        <label className={`p-3 border rounded cursor-pointer ${value === "CARD" ? "border-blue-500 bg-blue-50" : ""}`}>
          <input type="radio" name="pay" value="CARD" checked={value === "CARD"} onChange={() => onChange("CARD")} className="mr-2" />
          신용/체크카드
        </label>

        <label className={`p-3 border rounded cursor-pointer ${value === "VBANK" ? "border-blue-500 bg-blue-50" : ""}`}>
          <input type="radio" name="pay" value="VBANK" checked={value === "VBANK"} onChange={() => onChange("VBANK")} className="mr-2" />
          무통장입금
        </label>

        <label className={`p-3 border rounded cursor-pointer ${value === "TOSS" ? "border-blue-500 bg-blue-50" : ""}`}>
          <input type="radio" name="pay" value="TOSS" checked={value === "TOSS"} onChange={() => onChange("TOSS")} className="mr-2" />
          간편결제 (Toss, KakaoPay 등)
        </label>
      </div>
    </div>
  );
}
