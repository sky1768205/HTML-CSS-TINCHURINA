<<<<<<< Updated upstream
// Dashboard.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import SalesTable from "./SalesTable";
import SalesChart from "./SalesChart";
import Filters from "./Filters";
=======
// src/components/ui/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import SalesTable from "./SalesTable";
import SalesChart from "./SalesChart";
import Filters from "./Filters";
import styles from "./Dashboard.module.css";
>>>>>>> Stashed changes

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedShop, setSelectedShop] = useState("all");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
<<<<<<< Updated upstream
    axios.get("http://localhost:3000/api/sales")
      .then(res => setSales(res.data.data))
      .catch(err => console.error("Ошибка при получении продаж:", err))
=======
    axios
      .get("http://localhost:3000/api/sales")
      .then((res) => setSales(res.data.data))
      .catch((err) => console.error("Ошибка при получении продаж:", err))
>>>>>>> Stashed changes
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
<<<<<<< Updated upstream
    let result = sales;
    if (selectedShop !== "all") result = result.filter(s => s.shop_address === selectedShop);
    if (dateRange.start && dateRange.end) {
      result = result.filter(s => {
        const saleDate = new Date(s.sale_date);
        return saleDate >= new Date(dateRange.start) && saleDate <= new Date(dateRange.end);
=======
    let result = [...sales];
    if (selectedShop !== "all") {
      result = result.filter((s) => s.shop_address === selectedShop);
    }
    if (dateRange.start && dateRange.end) {
      result = result.filter((s) => {
        const saleDate = new Date(s.sale_date);
        return (
          saleDate >= new Date(dateRange.start) &&
          saleDate <= new Date(dateRange.end)
        );
>>>>>>> Stashed changes
      });
    }
    setFilteredSales(result);
  }, [sales, selectedShop, dateRange]);

<<<<<<< Updated upstream
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
=======
  return (
    <div className={styles.dashboard}>
      {/* Фоновое изображение */}
      <div className={styles.backgroundImage}>
        <img src="/images/registration.jpg" alt="Лес Магии" />
      </div>

      <div className={styles.overlay}></div>

      {/* Декоративные элементы */}
      <div className={styles.particle1}></div>
      <div className={styles.particle2}></div>
      <div className={styles.particle3}></div>
      <div className={styles.runeTopLeft}>ᛋ</div>
      <div className={styles.runeBottomRight}>ᚦ</div>

      {/* Основной контент */}
      <main className={styles.content}>
        <div className={styles.header}>
          <h1>Дашборд Продаж</h1>
          <p className={styles.subtitle}>
            Магические записи о потоках золота и серебра
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Собираем руны продаж...</p>
          </div>
        ) : (
          <div className={styles.sections}>
            <section className={styles.filtersSection}>
              <h2>🧭 Фильтры</h2>
              <Filters
                sales={sales}
                selectedShop={selectedShop}
                setSelectedShop={setSelectedShop}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </section>

            <section className={styles.tableSection}>
              <h2>📜 Сводная таблица</h2>
              <SalesTable sales={filteredSales} />
            </section>

            <section className={styles.chartSection}>
              <h2>📈 График продаж</h2>
              <SalesChart sales={filteredSales} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
>>>>>>> Stashed changes
