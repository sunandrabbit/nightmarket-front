import { useState} from "react";
import { useCart } from "../context/CartContext"; 
import { useAuth } from "../context/AuthContext"; 

export default function OrderSheetPage() {
  const { cartItems } = useCart();
  const { isLoggedIn } = useAuth();
  const [address, setAddress] = useState({
    zipCode: "",
    roadAddress: "",
    detailAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://order.syua-test.duckdns.org"
      : "http://localhost:10050";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const orderRequest = {
        addressDto: {
          zipCode: address.zipCode,
          roadAddress: address.roadAddress,
          detailAddress: address.detailAddress,
        },
        detailOrderDtoList: cartItems.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/order`,{
        method: "POST",
        credentials : "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequest),
      });

      if (response.status === 200) {
        setMessage("주문이 성공적으로 접수되었습니다!");
      }
    } catch (error) {
      console.error(error);

      //재고 부족 등 서버에서 400 에러 응답 시
      if (error.response?.status === 400) {
        const body = error.response?.data; // ex) "uuid1\nuuid2\nuuid3"
        const insufficientItems = body.split("\n").filter(Boolean);

        const missingNames = cartItems
          .filter((item) => insufficientItems.includes(item.productVariantId))
          .map((item) => item.productName);

        alert(`재고 부족: ${missingNames.join(", ")}`);
      } else {
        alert("주문 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">주문서 작성</h2>

      {/* 주소 입력 */}
      <div className="space-y-2">
        <input
          name="zipCode"
          value={address.zipCode}
          onChange={handleChange}
          placeholder="우편번호"
          className="w-full border rounded p-2"
        />
        <input
          name="roadAddress"
          value={address.roadAddress}
          onChange={handleChange}
          placeholder="도로명 주소"
          className="w-full border rounded p-2"
        />
        <input
          name="detailAddress"
          value={address.detailAddress}
          onChange={handleChange}
          placeholder="상세 주소"
          className="w-full border rounded p-2"
        />
      </div>

      {/* 장바구니 요약 */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">주문 상품</h3>
        <ul className="divide-y">
          {cartItems.map((item) => (
            <li key={item.productVariantId} className="py-2 flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toLocaleString()}원</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 주문 버튼 */}
      <button
        onClick={handleOrder}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "주문 처리중..." : "주문하기"}
      </button>

      {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
    </div>
  );
}
