import { useState } from "react";
import styles from "./RegisterPages.module.css";

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
          <div className="about-page">
      {/* Фоновое изображение с параллаксом */}
      <div
        className="background-image"
        style={{
          
        }}
      >
        <img src="/images/registration.jpg" alt="Лес" />
      </div>

            {/* Основной контейнер формы */}
            <div className={styles.formContainer}>
                <div className={styles.formCard}>
                    <div className={styles.header}>
                        <h2>Войдите в Лес Магии</h2>
                        <div className={styles.divider}></div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.field}>
                            <label>Ваше имя</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ваше имя..."
                                onChange={handleChange}
                                required
                            />
                        </div>

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
                            Зарегистрироваться
                        </button>
                    </form>

                    {message && (
                        <div className={`${styles.message} ${message.includes('успешна') ? styles.success : styles.error}`}>
                            {message}
                        </div>
                    )}

                    <p className={styles.footerText}>
                        Вступая в наш лес, вы соглашаетесь с магическими правилами
                    </p>
                </div>
            </div>

            {/* Декоративные элементы */}
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