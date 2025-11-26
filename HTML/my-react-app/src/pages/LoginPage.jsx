import { useContext, useState } from "react";
import { AuthContext } from "../stores/stores";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const [user, setUser] = useContext(AuthContext);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const resp = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });

        const data = await resp.json();

        if (data.success) {
            setMessage("Вход успешный!");

            // Сохраняем в localStorage
            localStorage.setItem("user", JSON.stringify(data.data));

            // Обновляем контекст → сразу обновится AuthStatus
            setUser(data.data);
        } else {
            setMessage(data.error);
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Вход</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="email" name="email" placeholder="Email" className="border p-2 rounded" onChange={handleChange} />
                <input type="password" name="password" placeholder="Пароль" className="border p-2 rounded" onChange={handleChange} />

                <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
                    Войти
                </button>
            </form>

            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}
