export default function AddressForm({ address, onChange }) {
  return (
    <div className="space-y-2">
      <input
        name="zipCode"
        value={address.zipCode}
        onChange={onChange}
        placeholder="우편번호"
        className="w-full border rounded p-2"
      />
      <input
        name="roadAddress"
        value={address.roadAddress}
        onChange={onChange}
        placeholder="도로명 주소"
        className="w-full border rounded p-2"
      />
      <input
        name="detailAddress"
        value={address.detailAddress}
        onChange={onChange}
        placeholder="상세 주소"
        className="w-full border rounded p-2"
      />
    </div>
  );
}
