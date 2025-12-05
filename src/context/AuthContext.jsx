// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://user.syua-test.duckdns.org"
      : "http://localhost:8080";
  
  useEffect(() => {
    check();
  }, []);

  // 로그인 상태 확인
  const check = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/oauth/session`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setIsLoggedIn(false);
      } else if (res.ok) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error("세션 확인 실패:", e);
    }
  };

  // 로그인 성공 처리(보던 페이지로 리다이렉션)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "success") {
      const redirectPath = sessionStorage.getItem("redirectPath") || "/";
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true }); 
    }
  }, [navigate]);

  // 로그아웃
  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    window.location.href = "/"; // 프론트 리디렉션
  };

  const socialLogin = (provider) => {
    // 현재 경로 저장
    const currentPath = window.location.pathname + window.location.search;
    sessionStorage.setItem("redirectPath", currentPath);

    // 백엔드 로그인 요청
    window.location.href = `${API_BASE_URL}/api/v1/oauth/authorization/${provider}`;
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, handleLogout, socialLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
