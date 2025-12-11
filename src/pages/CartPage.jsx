import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function CartPage() {
  const { cartItems } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) {
      alert("로그인이 필요합니다.")
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://item.syua.co.kr"
      : "http://localhost:10030";


  // 총 금액 계산
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      const body = {
        checkProduct: cartItems.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/api/v1/cart/check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials : "include"
      });

      console.log("응답 status:", response.status);

      if (response.ok) {
        console.log("재고 확인 성공 — 주문 진행 가능");
        navigate("/order/sheet")
      }

      else if (response.status=== 400) {
        const text = await response.text();
        const shortageList = text
          .trim()
          .split("\n")
          .filter((uuid) => uuid.length > 0);

        // CartItem에서 이름/이미지 가져오기
        const shortageItems = shortageList.map((id) =>
          cartItems.find((item) => item.productVariantId === id)
        );

        const message = shortageItems
          .map((item) => `• ${item?.name || item?.productVariantId}`)
          .join("\n");

        alert(`다음 상품의 재고가 부족합니다:\n\n${message}`);
        return;
      }
    } catch (err) {
      console.error("장바구니 검증 중 오류 발생", err);
      alert("서버와의 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };



  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">장바구니</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.cartId || item.productVariantId} item={item} />
            ))}
          </div>

          {/* 총 금액 & 주문 버튼 */}
          <div className="mt-6 border-t pt-4 flex items-center justify-between">
            <p className="text-lg font-semibold">
              총 금액:{" "}
              <span className="text-red-500">
                {totalPrice.toLocaleString()}원
              </span>
            </p>
            <button
              onClick={handleOrder}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
            >
              주문하기
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">장바구니가 비었습니다.</p>
      )}
    </div>
  );
}
