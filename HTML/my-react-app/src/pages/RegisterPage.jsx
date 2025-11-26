import { useState } from "react";

export default function RegisterPages() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const resp = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await resp.json();

        if (data.success) {
            setMessage("Регистрация успешна!");
        } else {
            setMessage(data.error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Регистрация</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    className="border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border p-2 rounded"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="border p-2 rounded"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Зарегистрироваться
                </button>
            </form>

            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}
