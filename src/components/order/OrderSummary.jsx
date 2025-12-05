export default function OrderSummary({ cartItems }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">주문 상품</h3>
      <ul className="divide-y">
        {cartItems.map((item) => (
          <li key={item.productVariantId} className="py-2 flex justify-between">
            <span>
              {item.productName} x {item.quantity}
            </span>
            <span>{(item.price * item.quantity).toLocaleString()}원</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
