import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
    const [section, setSection] = useState("shops");
    const [data, setData] = useState({
        shops: [],
        products: [],
        sales: [],
        blog: [],
        users: []
    });
    const [modal, setModal] = useState({ open: false, mode: "new", item: null });
    const [formState, setFormState] = useState({}); // данные формы

    const fields = {
        shops: ["address", "phone"],
        products: ["name", "price", "description", "category", "image_url"],
        sales: ["product_id", "shop_id", "quantity", "total_price"],
        blog: ["title", "excerpt", "image_url"],
        users: ["email", "role", "passwordHash"]
    };

    // Загрузка данных
    useEffect(() => {
        fetchData();
    }, [section]);

    // Инициализация формы при открытии модалки
    useEffect(() => {
        if (modal.open) {
            setFormState(
                modal.item || Object.fromEntries(fields[section].map(f => [f, ""]))
            );
        }
    }, [modal, section]);

    const fetchData = async () => {
        try {
            const urls = {
                shops: "http://localhost:3000/api/shops",
                products: "http://localhost:3000/api/products",
                sales: "http://localhost:3000/api/sales",
                blog: "http://localhost:3000/api/blog",
                users: "http://localhost:3000/api/admin/users"
            };
            const headers = section === "users" ? { "x-role": "admin" } : {};
            const res = await fetch(urls[section], { headers });
            const json = await res.json();
            setData(prev => ({ ...prev, [section]: json.data || [] }));
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Вы точно хотите удалить запись?")) return;
        try {
            const headers = section === "users" ? { "x-role": "admin" } : {};
            await fetch(`http://localhost:3000/api/admin/${section}/${id}`, {
                method: "DELETE",
                headers
            });
            fetchData();
        } catch (err) {
            console.error("Ошибка при удалении:", err);
        }
    };

    const handleSave = async () => {
        try {
            const url = modal.mode === "new"
                ? `http://localhost:3000/api/admin/${section}`
                : `http://localhost:3000/api/admin/${section}/${modal.item.id}`;
            const method = modal.mode === "new" ? "POST" : "PUT";
            const headers = {
                "Content-Type": "application/json",
                ...(section === "users" || section === "sales" && { "x-role": "admin" })
            };
            await fetch(url, { method, headers, body: JSON.stringify(formState) });
            setModal({ open: false, mode: "new", item: null });
            fetchData();
        } catch (err) {
            console.error("Ошибка при сохранении:", err);
        }
    };

    const renderForm = () => {
        if (!modal.open) return null;

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormState(prev => ({ ...prev, [name]: value }));
        };

        return (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                <div className="bg-[#1E1E1E] p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-xl font-bold mb-4">
                        {modal.mode === "new" ? "Добавить" : "Редактировать"} {section.slice(0, -1)}
                    </h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}
                        className="flex flex-col gap-2"
                    >
                        {fields[section].map((f) => {
                            // Поля textarea для длинного текста при редактировании
                            const isTextarea = modal.mode === "edit" && ["description", "excerpt"].includes(f);
                            return isTextarea ? (
                                <textarea
                                    key={f}
                                    name={f}
                                    value={formState[f] || ""}
                                    onChange={handleChange}
                                    placeholder={f}
                                    rows={6}
                                    className="p-2 rounded bg-[#2C2C2C] text-white resize-none"
                                    required
                                />
                            ) : (
                                <input
                                    key={f}
                                    name={f}
                                    value={formState[f] || ""}
                                    onChange={handleChange}
                                    placeholder={f}
                                    className="p-2 rounded bg-[#2C2C2C] text-white"
                                    required={f !== "image_url"}
                                />
                            );
                        })}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-500 rounded"
                                onClick={() => setModal({ open: false, mode: "new", item: null })}
                            >
                                Отмена
                            </button>
                            <button type="submit" className="px-4 py-2 bg-green-600 rounded">
                                Сохранить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const renderTable = () => {
        const items = data[section] || [];
        return (
            <ul className="space-y-3">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="flex justify-between items-center bg-[#2C2C2C] p-2 rounded-lg"
                    >
                        <span>
                            {section === "shops" && `${item.address} — ${item.phone}`}
                            {section === "products" && `${item.name} — $${item.price}`}
                            {section === "sales" &&
                                `${item.product_name} — ${item.quantity} шт — $${item.total_price}`}
                            {section === "blog" && item.title}
                            {section === "users" && `${item.email} — ${item.role}`}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setModal({ open: true, mode: "edit", item })}
                                className="px-2 py-1 bg-[#F8F8F9]/20 rounded hover:bg-[#F8F8F9]/40"
                            >
                                Редактировать
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
                            >
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="font-[Chalkduster] min-h-screen relative bg-[#171717] text-[#F8F8F9] flex">
            <aside className="w-64 bg-[#1E1E1E] p-6 flex-shrink-0">
                <h2 className="text-3xl font-bold mb-6 text-center">Админка</h2>
                <nav className="flex flex-col gap-3">
                    {["shops", "products", "sales", "blog", "users"].map((sec) => (
                        <button
                            key={sec}
                            onClick={() => setSection(sec)}
                            className={`text-left px-4 py-2 rounded-lg w-full ${
                                section === sec ? "bg-[#2C4B35] text-[#F8F8F9]" : "hover:bg-[#2C4B35]/30"
                            }`}
                        >
                            {sec === "shops" && "Магазины"}
                            {sec === "products" && "Товары"}
                            {sec === "sales" && "Продажи"}
                            {sec === "blog" && "Статьи"}
                            {sec === "users" && "Пользователи"}
                        </button>
                    ))}
                </nav>
            </aside>

            <main className="flex-1 p-6 overflow-y-auto">
                <h2 className="text-4xl font-bold mb-6">
                    {section === "shops" && "Магазины"}
                    {section === "products" && "Товары"}
                    {section === "sales" && "Продажи"}
                    {section === "blog" && "Статьи"}
                    {section === "users" && "Пользователи"}
                </h2>

                <button
                    onClick={() => setModal({ open: true, mode: "new", item: null })}
                    className="inline-block mb-4 px-4 py-2 bg-[#2C4B35] rounded-lg hover:scale-105 transition"
                >
                    Добавить {section === "users" ? "пользователя" : section.slice(0, -1)}
                </button>

                {renderTable()}
                {renderForm()}
            </main>
        </div>
    );
}
