// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isLoggedIn, handleLogout, socialLogin } = useAuth();
  const [showSocialLogin, setShowSocialLogin] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <h1 className="text-2xl font-bold text-blue-600">
            <Link to="/">My Shop</Link>
          </h1>

          {/* 네비게이션 */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/products"
              className={`hover:text-blue-600 ${
                location.pathname === "/products"
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              상품 목록
            </Link>
            <Link
              to="/cart"
              className={`hover:text-blue-600 ${
                location.pathname === "/cart"
                  ? "text-blue-600"
                  : "text-gray-700"
              }`}
            >
              장바구니
            </Link>

            {/* 로그인 / 로그아웃 버튼 */}
            {!isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowSocialLogin(!showSocialLogin)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  <span>로그인</span>
                </button>

                {showSocialLogin && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="py-2">
                      <button
                        onClick={() => socialLogin("google")}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          G
                        </div>
                        <span>Google로 로그인</span>
                      </button>
                      <button
                        onClick={() => socialLogin("facebook")}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          f
                        </div>
                        <span>Facebook으로 로그인</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-gray-700 text-sm">안녕하세요!</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
