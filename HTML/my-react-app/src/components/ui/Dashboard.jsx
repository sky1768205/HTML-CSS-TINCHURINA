// Dashboard.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import SalesTable from "./SalesTable";
import SalesChart from "./SalesChart";
import Filters from "./Filters";

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedShop, setSelectedShop] = useState("all");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/api/sales")
      .then(res => setSales(res.data.data))
      .catch(err => console.error("Ошибка при получении продаж:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = sales;
    if (selectedShop !== "all") result = result.filter(s => s.shop_address === selectedShop);
    if (dateRange.start && dateRange.end) {
      result = result.filter(s => {
        const saleDate = new Date(s.sale_date);
        return saleDate >= new Date(dateRange.start) && saleDate <= new Date(dateRange.end);
      });
    }
    setFilteredSales(result);
  }, [sales, selectedShop, dateRange]);

  if (loading) return <p>Загрузка данных...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <Filters
        sales={sales}
        selectedShop={selectedShop}
        setSelectedShop={setSelectedShop}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <SalesTable sales={filteredSales} />
      <SalesChart sales={filteredSales} />
    </div>
  );
}
