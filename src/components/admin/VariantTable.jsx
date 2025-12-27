export default function VariantTable({ variants }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-50">
          <th className="border p-2">SKU</th>
          <th className="border p-2">옵션</th>
          <th className="border p-2">재고</th>
        </tr>
      </thead>
      <tbody>
        {variants.map((v) => (
          <tr key={v.sku} className="hover:bg-gray-50">
            <td className="border p-2">{v.sku}</td>
            <td className="border p-2">{v.options}</td>
            <td className="border p-2">{v.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}