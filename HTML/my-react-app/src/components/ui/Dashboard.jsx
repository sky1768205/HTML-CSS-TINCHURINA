// src/components/ui/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import SalesTable from "./SalesTable";
import SalesChart from "./SalesChart";
import Filters from "./Filters";
import styles from "./Dashboard.module.css";
import LoadingPage from "../../pages/loadingPage";

export default function Dashboard() {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedShop, setSelectedShop] = useState("all");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/sales")
      .then((res) => setSales(res.data.data))
      .catch((err) => console.error("Ошибка при получении продаж:", err))
      .finally(() => setLoading(false));
  }, []);



  useEffect(() => {
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
      });
    }
    setFilteredSales(result);
  }, [sales, selectedShop, dateRange]);

   return (
    <>
      {loading ? (
        <div className={styles.fullPageLoading}>
          <LoadingPage />
        </div>
      ) : (
        <div >
          <div
        className="background-image"
        style={{
          
        }}
      >
        <img src="/images/фон4.png" alt="Лес" />
      </div>

          <div className={styles.overlay}></div>
          <div className={styles.particle1}></div>
          <div className={styles.particle2}></div>
          <div className={styles.particle3}></div>
          <div className={styles.runeTopLeft}>ᛋ</div>
          <div className={styles.runeBottomRight}>ᚦ</div>

          <main className={styles.content}>
            <div className={styles.header}>
              <h1 className="font-[Chalkduster] text-amber-50">Дашборд Продаж</h1>
              <p className= "font-[Chalkduster] text-amber-50">
                Магические записи о потоках золота и серебра
              </p>
            </div>

            <div className={styles.sections}>
              <section className= {styles.filtersSection}>
                <h2 className="font-[Chalkduster]">🧭 Фильтры</h2>
                <Filters
                  sales={sales}
                  selectedShop={selectedShop}
                  setSelectedShop={setSelectedShop}
                  dateRange={dateRange}
                  setDateRange={setDateRange}
                />
              </section>

              <section className={styles.tableSection}>
                <h2 className="font-[Chalkduster]">📜 Сводная таблица</h2>
                <SalesTable sales={filteredSales} />
              </section>

              <section className={styles.chartSection}>
                <h2 className="font-[Chalkduster]">📈 График продаж</h2>
                <SalesChart sales={filteredSales} />
              </section>
            </div>
          </main>
        </div>
      )}
    </>
  );
}