import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Filters({ sales, selectedShop, setSelectedShop, dateRange, setDateRange }) {
  const shops = Array.from(new Set(sales.map(s => s.shop_address))).filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div>
        <label className="block mb-1 font-medium">Магазин</label>
        <select
          className="border p-2 rounded"
          value={selectedShop}
          onChange={e => setSelectedShop(e.target.value)}
        >
          <option value="all">Все</option>
          {shops.map(shop => (
            <option key={shop} value={shop}>{shop}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Дата начала</label>
        <DatePicker
          selected={dateRange.start ? new Date(dateRange.start) : null}
          onChange={(date) => setDateRange(prev => ({ ...prev, start: date }))}
          dateFormat="yyyy-MM-dd"
          placeholderText="Выберите дату"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Дата окончания</label>
        <DatePicker
          selected={dateRange.end ? new Date(dateRange.end) : null}
          onChange={(date) => setDateRange(prev => ({ ...prev, end: date }))}
          dateFormat="yyyy-MM-dd"
          placeholderText="Выберите дату"
        />
      </div>
    </div>
  );
}
