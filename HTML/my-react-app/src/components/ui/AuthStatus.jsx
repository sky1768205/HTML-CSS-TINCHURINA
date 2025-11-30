import { useContext } from "react";
import { AuthContext } from "../../stores/stores";
import { useNavigate } from "react-router";

export default function AuthStatus() {
    const [user, setUser] = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/"); 
    }

    if (!user) return null; 

    return (
        <div className="flex items-center gap-3 px-4 py-2
                        bg-[#2C4B35]/20 border border-[#2C4B35]/40 rounded-lg
                        text-[#F8F8F9] backdrop-blur-sm shadow-md">
            
            {/* Имя пользователя */}
            <span className="font-medium tracking-wide text-[#F8F8F9]/90">
                {user.name}
            </span>

            {/* Вертикальная линия */}
            <span className="h-5 w-px bg-[#2C4B35]/60"></span>

            {/* Кнопка выхода */}
            <button
                onClick={logout}
                className="px-3 py-1 bg-[#2C4B35]/40 hover:bg-[#2C4B35]/60
                           rounded-md text-sm transition-all border border-[#2C4B35]/40
                           hover:border-[#F8F8F9]/40 shadow-inner"
            >
                Выйти
            </button>
        </div>
    );
}
