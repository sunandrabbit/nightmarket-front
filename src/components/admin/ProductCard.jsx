import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <li className="flex justify-between p-4 border rounded">
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-500">{product.status}</p>
      </div>

      <Link
        to={`/admin/products/${product.id}`}
        className="text-blue-600 hover:underline"
      >
        관리
      </Link>
    </li>
  );
}