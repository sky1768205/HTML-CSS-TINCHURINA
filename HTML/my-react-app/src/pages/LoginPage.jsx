import { useContext, useState } from "react";
import { AuthContext } from "../stores/stores";
import { useNavigate } from "react-router";  // ← добавили
import styles from "./RegisterPages.module.css";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");

    const [user, setUser] = useContext(AuthContext);

    const navigate = useNavigate(); // ← инициализируем

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

            // Сохраняем пользователя
            localStorage.setItem("user", JSON.stringify(data.data));

            // Обновляем контекст
            setUser(data.data);

            // 🔥 Возвращаем на главную
            setTimeout(() => {
                navigate("/");
            }, 300); // небольшая задержка чтобы показать сообщение
        } else {
            setMessage(data.error);
        }
    }

    return (
        <div className="about-page">
            <div className="background-image">
                <img src="/images/registration.jpg" alt="Лес" />
            </div>

            <div className={styles.formContainer}>
                <div className={styles.formCard}>
                    <div className={styles.header}>
                        <h2>Добро пожаловать</h2>
                        <h2>в Лес Магии</h2>
                        <div className={styles.divider}></div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Пароль</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Войти
                        </button>
                    </form>

                    {message && (
                        <div
                            className={`${styles.message} ${
                                message.includes("успешный") ? styles.success : styles.error
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <p className={styles.footerText}>
                        Вступая в наш лес, вы соглашаетесь с магическими правилами
                    </p>
                </div>
            </div>

            <div className={styles.particle1}></div>
            <div className={styles.particle2}></div>
            <div className={styles.particle3}></div>
            <div className={styles.particle4}></div>
            <div className={styles.particle5}></div>

            <div className={styles.runeTopLeft}>ᛋ</div>
            <div className={styles.runeBottomRight}>ᚦ</div>
        </div>
    );
}
