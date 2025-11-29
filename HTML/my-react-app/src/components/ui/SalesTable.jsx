// SalesTable.jsx
export default function SalesTable({ sales }) {
<<<<<<< Updated upstream
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
=======
  if (!sales || sales.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-400" 
           style={{ fontFamily: "'Caveat', cursive", textShadow: '0 0 4px rgba(200, 230, 200, 0.3)' }}>
        Нет данных для отображения 🌫️
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto"
         style={{
           background: 'rgba(10, 25, 20, 0.4)',
           backdropFilter: 'blur(8px)',
           border: '1px solid rgba(22, 163, 74, 0.3)',
           borderRadius: '0.75rem',
           padding: '0.5rem',
         }}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th
              className="py-2 px-4 text-left"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#d6e9d1',
                textShadow: '0 0 6px rgba(214, 233, 209, 0.5)',
                borderBottom: '1px solid rgba(22, 163, 74, 0.3)',
                background: 'rgba(22, 163, 74, 0.1)',
              }}
            >
              ID
            </th>
            <th
              className="py-2 px-4 text-left"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#d6e9d1',
                textShadow: '0 0 6px rgba(214, 233, 209, 0.5)',
                borderBottom: '1px solid rgba(22, 163, 74, 0.3)',
                background: 'rgba(22, 163, 74, 0.1)',
              }}
            >
              Продукт
            </th>
            <th
              className="py-2 px-4 text-left"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#d6e9d1',
                textShadow: '0 0 6px rgba(214, 233, 209, 0.5)',
                borderBottom: '1px solid rgba(22, 163, 74, 0.3)',
                background: 'rgba(22, 163, 74, 0.1)',
              }}
            >
              Магазин
            </th>
            <th
              className="py-2 px-4 text-left"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#d6e9d1',
                textShadow: '0 0 6px rgba(214, 233, 209, 0.5)',
                borderBottom: '1px solid rgba(22, 163, 74, 0.3)',
                background: 'rgba(22, 163, 74, 0.1)',
              }}
            >
              Кол-во
            </th>
            <th
              className="py-2 px-4 text-left"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#d6e9d1',
                textShadow: '0 0 6px rgba(214, 233, 209, 0.5)',
                borderBottom: '1px solid rgba(22, 163, 74, 0.3)',
                background: 'rgba(22, 163, 74, 0.1)',
              }}
            >
              Сумма
            </th>
            <th
              className="py-2 px-4 text-left"
              style={{
                fontFamily: "'Caveat', cursive",
                color: '#d6e9d1',
                textShadow: '0 0 6px rgba(214, 233, 209, 0.5)',
                borderBottom: '1px solid rgba(22, 163, 74, 0.3)',
                background: 'rgba(22, 163, 74, 0.1)',
              }}
            >
              Дата
            </th>
>>>>>>> Stashed changes
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
<<<<<<< Updated upstream
            <tr key={sale.id} className="text-center">
              <td className="py-2 px-4 border-b">{sale.id}</td>
              <td className="py-2 px-4 border-b">{sale.product_name}</td>
              <td className="py-2 px-4 border-b">{sale.shop_address || "-"}</td>
              <td className="py-2 px-4 border-b">{sale.quantity}</td>
              <td className="py-2 px-4 border-b">{sale.total_price}</td>
              <td className="py-2 px-4 border-b">{new Date(sale.sale_date).toLocaleDateString()}</td>
=======
            <tr
              key={sale.id}
              style={{
                borderBottom: '1px solid rgba(22, 163, 74, 0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(22, 163, 74, 0.1)';
                e.currentTarget.style.transform = 'scale(1.01)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '';
                e.currentTarget.style.transform = '';
              }}
            >
              <td
                className="py-2 px-4"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#c8e6c9',
                  textShadow: '0 0 2px rgba(200, 230, 201, 0.3)',
                }}
              >
                {sale.id}
              </td>
              <td
                className="py-2 px-4"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#d6e9d1',
                  textShadow: '0 0 2px rgba(214, 233, 209, 0.3)',
                }}
              >
                {sale.product_name}
              </td>
              <td
                className="py-2 px-4"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#a3b18a',
                  textShadow: '0 0 2px rgba(163, 177, 138, 0.3)',
                }}
              >
                {sale.shop_address || "—"}
              </td>
              <td
                className="py-2 px-4 text-center"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#c8e6c9',
                }}
              >
                {sale.quantity}
              </td>
              <td
                className="py-2 px-4 text-right"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#86efac',
                  fontWeight: '600',
                }}
              >
                {sale.total_price} ₽
              </td>
              <td
                className="py-2 px-4"
                style={{
                  fontFamily: "'Caveat', cursive",
                  color: '#9ca3af',
                }}
              >
                {new Date(sale.sale_date).toLocaleDateString()}
              </td>
>>>>>>> Stashed changes
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
