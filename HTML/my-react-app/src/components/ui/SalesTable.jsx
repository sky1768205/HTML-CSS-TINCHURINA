// SalesTable.jsx
export default function SalesTable({ sales }) {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Продукт</th>
            <th className="py-2 px-4 border-b">Магазин</th>
            <th className="py-2 px-4 border-b">Кол-во</th>
            <th className="py-2 px-4 border-b">Сумма</th>
            <th className="py-2 px-4 border-b">Дата</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="text-center">
              <td className="py-2 px-4 border-b">{sale.id}</td>
              <td className="py-2 px-4 border-b">{sale.product_name}</td>
              <td className="py-2 px-4 border-b">{sale.shop_address || "-"}</td>
              <td className="py-2 px-4 border-b">{sale.quantity}</td>
              <td className="py-2 px-4 border-b">{sale.total_price}</td>
              <td className="py-2 px-4 border-b">{new Date(sale.sale_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
