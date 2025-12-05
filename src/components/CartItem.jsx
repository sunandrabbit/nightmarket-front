import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex items-center space-x-4">
        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
        )}
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-600 mt-1">{Number(item.price).toLocaleString()}원</p>
        </div>
      </div>

      <div className="flex items-center border rounded-lg overflow-hidden">
        <button
          onClick={() => updateQuantity(item.shoppingBasketId, item.quantity - 1)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
        >
          -
        </button>
        <span className="px-4">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.shoppingBasketId, item.quantity + 1)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
        >
          +
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.shoppingBasketId)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        삭제
      </button>
    </div>
  );  
}
