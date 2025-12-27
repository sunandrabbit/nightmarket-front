import { Link } from "react-router-dom";

export default function ProductManageMenu({ productId }) {
  const menuItems = [
    { path: `/admin/products/${productId}`, label: "기본 정보", icon: "📝" },
    { path: `/admin/products/${productId}/options`, label: "옵션 관리", icon: "⚙️" },
    { path: `/admin/products/${productId}/variants`, label: "Variant / 재고", icon: "📦" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="p-6 border rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all text-left block"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <div className="font-medium">{item.label}</div>
        </Link>
      ))}
    </div>
  );
}