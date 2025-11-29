import React, { useState } from 'react';
import { Calendar, Button, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { CalendarOutlined } from '@ant-design/icons';

// Темная тема для Ant Design
const darkTheme = {
  token: {
    colorBgContainer: '#1f2937',
    colorBgElevated: '#1f2937',
    colorBorder: '#374151',
    colorText: '#f9fafb',
    colorTextHeading: '#f9fafb',
    colorPrimary: '#3b82f6',
    colorBgBase: '#1f2937',
  },
  components: {
    Calendar: {
      colorBgContainer: '#1f2937',
      colorText: '#f9fafb',
      colorTextHeading: '#f9fafb',
      colorPrimary: '#3b82f6',
    },
  },
};

export default function Filters({ sales, selectedShop, setSelectedShop, dateRange, setDateRange }) {
  const shops = Array.from(new Set(sales.map(s => s.shop_address))).filter(Boolean);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleStartDateSelect = (date) => {
    setDateRange(prev => ({ 
      ...prev, 
      start: date ? date.toDate() : null 
    }));
    setShowStartCalendar(false);
  };

  const handleEndDateSelect = (date) => {
    setDateRange(prev => ({ 
      ...prev, 
      end: date ? date.toDate() : null 
    }));
    setShowEndCalendar(false);
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format('DD.MM.YYYY') : 'Не выбрана';
  };

  return (
    <ConfigProvider theme={darkTheme}>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium text-white">Магазин</label>
          <select
            className="border border-gray-600 p-2 rounded bg-gray-800 text-white w-48"
            value={selectedShop}
            onChange={e => setSelectedShop(e.target.value)}
          >
            <option value="all">Все</option>
            {shops.map(shop => (
              <option key={shop} value={shop}>{shop}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block mb-1 font-medium text-white">Дата начала</label>
          <Button
            icon={<CalendarOutlined />}
            onClick={() => setShowStartCalendar(!showStartCalendar)}
            className="w-48 h-10 bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
          >
            {formatDate(dateRange.start)}
          </Button>
          {showStartCalendar && (
            <div className="absolute top-full left-0 mt-2 z-50 shadow-2xl">
              <div className="w-80 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <Calendar
                  fullscreen={false}
                  onSelect={handleStartDateSelect}
                  value={dateRange.start ? dayjs(dateRange.start) : null}
                  className="bg-gray-800"
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block mb-1 font-medium text-white">Дата окончания</label>
          <Button
            icon={<CalendarOutlined />}
            onClick={() => setShowEndCalendar(!showEndCalendar)}
            className="w-48 h-10 bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
          >
            {formatDate(dateRange.end)}
          </Button>
          {showEndCalendar && (
            <div className="absolute top-full left-0 mt-2 z-50 shadow-2xl">
              <div className="w-80 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
                <Calendar
                  fullscreen={false}
                  onSelect={handleEndDateSelect}
                  value={dateRange.end ? dayjs(dateRange.end) : null}
                  className="bg-gray-800"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}