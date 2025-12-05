import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginInvalidPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>❌ 로그인에 실패했습니다.</h2>
      <p>다시 로그인 페이지로 이동합니다...</p>
    </div>
  );
}