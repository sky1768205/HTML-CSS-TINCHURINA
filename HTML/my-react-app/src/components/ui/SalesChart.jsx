import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesChart({ sales }) {
  // Группируем продажи по дате
  const groupedData = sales.reduce((acc, sale) => {
    const date = new Date(sale.sale_date).toLocaleDateString();
    if (!acc[date]) acc[date] = 0;
    acc[date] += sale.total_price;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([date, total]) => ({ date, total }));

  return (
    <div className="mt-6 w-full h-64">
      <h2 className="text-xl font-semibold mb-2">Продажи по дате</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
