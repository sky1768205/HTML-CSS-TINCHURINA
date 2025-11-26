import { useState, useEffect } from 'react';

export default function CoffeeShopMap() {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);

    // Тестовые данные по умолчанию
    const testShops = [
        {
            id: 1,
            address: "ул. Кофейная 15",
            phone: "+79998887766",
            latitude: 55.7558,
            longitude: 37.6173,
            created_at: "2025-11-22 11:00:00"
        },
        {
            id: 2,
            address: "пр. Ароматный 42",
            phone: "+79997776655",
            latitude: 55.7602,
            longitude: 37.6175,
            created_at: "2025-11-22 12:00:00"
        },
        {
            id: 3,
            address: "бульвар Зерновой 8",
            phone: "+79996665544",
            latitude: 55.7520,
            longitude: 37.6210,
            created_at: "2025-11-22 13:00:00"
        }
    ];

    useEffect(() => {
        async function getShops() {
            try {
                const resp = await fetch("/api/shops");

                // Если запрос прошел успешно
                if (resp.ok) {
                    const data = await resp.json();

                    // Если есть данные от бэкенда - используем их
                    if (data.data && data.data.length > 0) {
                        setShops(data.data);
                    } else {
                        // Если данных нет - используем тестовые
                        console.log('Нет данных в API, используем тестовые данные');
                        setShops(testShops);
                    }
                } else {
                    // Если ошибка запроса - используем тестовые данные
                    console.log('Ошибка запроса, используем тестовые данные');
                    setShops(testShops);
                }
            } catch (error) {
                // Если исключение - используем тестовые данные
                console.log('Ошибка при запросе, используем тестовые данные:', error);
                setShops(testShops);
            } finally {
                // Всегда снимаем состояние загрузки
                setLoading(false);
            }
        }

        getShops();
    }, []);

    const [selectedShop, setSelectedShop] = useState(null);

    const handleShopClick = (shop) => {
        setSelectedShop(shop);
    };

    const closeAlert = () => {
        setSelectedShop(null);
    };

    if (loading) {
        return (
            <div className="relative w-full h-[48rem] bg-[#2C4B35] rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-[#1E3325] opacity-20 rounded-lg"></div>
                <div className="relative z-10 text-white text-lg">Загружаем карту кофеен...</div>
            </div>
        );
    }

    return (
        <>
            {/* Кастомный алерт в скандинавском стиле */}
            {selectedShop && (
                <div className="fixed inset-0 bg-[#171717]/80 bg-opacity-30 flex items-center justify-center z-50 p-4" >
                    <div className="bg-[#2C4B35] rounded-xl max-w-sm w-full p-8 shadow-2xl border border-white border-opacity-20 relative">
                        {/* Скандинавский декоративный элемент */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full"></div>

                        <div className="text-center mb-6">
                            <div className="text-white text-opacity-80 text-sm mb-2 uppercase tracking-wider">Кофейня</div>
                            <h3 className="text-2xl font-bold text-white">№ {selectedShop.id}</h3>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="text-center">
                                <div className="text-white text-opacity-90 text-sm font-medium mb-1">Адрес</div>
                                <div className="text-white text-lg">{selectedShop.address}</div>
                            </div>

                            <div className="border-t border-white border-opacity-20 pt-4 text-center">
                                <div className="text-white text-opacity-90 text-sm font-medium mb-1">Телефон</div>
                                <div className="text-white text-lg font-mono">{selectedShop.phone}</div>
                            </div>
                        </div>

                        <button
                            onClick={closeAlert}
                            className="w-full bg-white text-[#2C4B35] py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-200 text-base uppercase tracking-wide"
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            )}

            <div className="relative w-[64] h-[48rem] bg-[#171717]/80 rounded-lg overflow-hidden">

                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src="/images/дерево.png"
                        alt="Карта кофеен"
                        className="max-w-full max-h-full object-contain scale-90"
                    />
                </div>

                {/* Точки кофеен на белых пятнах дерева */}
                {shops.map((shop, index) => {
                    // Позиции на белых участках дерева
                    const positions = [
                        { top: '35%', left: '51%' },  // Центральная белая область
                        { top: '70%', left: '53%' },  // Правая нижняя белая область  
                        { top: '85%', left: '45%' },  // Верхняя правая белая область
                    ];

                    // Позиции подсказок рядом с кнопками
                    const tooltipPositions = [
                        { top: '30%', left: '58%' },  // Подсказка для первой точки
                        { top: '65%', left: '60%' },  // Подсказка для второй точки
                        { top: '80%', left: '55%' },  // Подсказка для третьей точки
                    ];

                    const position = positions[index % positions.length];
                    const tooltipPosition = tooltipPositions[index % tooltipPositions.length];

                    return (
                        <div key={shop.id} className="absolute z-20" style={position}>
                            {/* Кнопка точки */}
                            <button
                                onClick={() => handleShopClick(shop)}
                                className="transform -translate-x-1/2 -translate-y-1/2 group"
                            >
                                <div className="w-10 h-10  rounded-full  transform transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl flex items-center justify-center">
                                    {/* Можно добавить иконку или оставить пустой круг */}
                                </div>
                            </button>

                            {/* Постоянная подсказка рядом с кнопкой */}
                            <div
                                className="absolute bg-white text-gray-800 text-sm rounded-lg shadow-xl px-3 py-2 border border-gray-200 whitespace-nowrap"
                                style={tooltipPosition}
                            >
                                Кофейня {shop.id}
                            </div>
                        </div>
                    );
                })}

                {/* Легенда карты */}
                <div className="absolute bottom-6 left-6 bg-white bg-opacity-95 rounded-xl px-4 py-3 shadow-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-white border-2 border-[#2C4B35] rounded-full"></div>
                        <span className="text-base font-medium text-gray-700">Наши кофейни</span>
                    </div>
                </div>

                {/* Заголовок */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white  rounded-xl px-8 py-4 shadow-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-[#2C4B35] text-center">
                        Наши кофейни
                    </h3>
                </div>
            </div>
        </>
    );
} 