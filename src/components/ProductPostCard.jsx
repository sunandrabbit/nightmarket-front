import { Link } from "react-router-dom";

export default function ProductPostCard({ product }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">가격: {product.price}원</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
      <Link
        to={`/products/${product.postId}`}
        className="inline-block mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        상세보기
      </Link>
    </div>
  );
}
