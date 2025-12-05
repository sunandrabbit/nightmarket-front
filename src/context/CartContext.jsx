import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const {isLoggedIn } = useAuth();

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://item.syua-test.duckdns.org"
      : "http://localhost:10030";

  // 장바구니 목록 조회
  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/cart`, {
        method: "GET",
        credentials: "include"
      });

      if (res.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/");
        return;
      }

      if (!res.ok) {
        console.error("장바구니 요청 실패:", res.status);
        return;
      }

      const data = await res.json();
      setCartItems(data.shoppingBasket || []);
    } catch (err) {
      console.error("장바구니 불러오기 오류", err);
    }
  };

  // 장바구니 담기
  const addToCart = async (item) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productVariantId: item.productVariantId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }),
        credentials : "include"
      });

      if (res.status === 401) {
        alert("장바구니에 상품을 담으려면, 로그인이 필요합니다!");
        return;
      }
      
      alert("장바구니에 상품이 담겼습니다.")
      if (!res.ok) {
        console.error("장바구니 요청 실패:", res.status);
        return;
      }
      await fetchCart();
    } catch (err) {
      console.error("장바구니 담기 실패", err);
    }
  };

  // 수량 변경
  const updateQuantity = async (shoppingBasketId, newQty) => {
    if (newQty == 0) await removeFromCart(shoppingBasketId);

    if (newQty < 0) return;

    try {
      await fetch(`${API_BASE_URL}/api/v1/cart/${shoppingBasketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: newQty
        }),
        credentials : "include"
      });
      await fetchCart();
    } catch (err) {
      console.error("수량 변경 실패", err);
    }
  };

  // 삭제
  const removeFromCart = async (shoppingBasketId) => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/cart/${shoppingBasketId}`, {
        method: "DELETE",
        credentials : "include"
      });
      await fetchCart();
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
