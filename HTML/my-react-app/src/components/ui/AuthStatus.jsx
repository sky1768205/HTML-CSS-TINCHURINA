import { useContext } from "react";
import { AuthContext } from "../../stores/stores";

export default function AuthStatus() {
    const [user, setUser] = useContext(AuthContext);

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }

    if (!user) {
        return (
            <span className="text-red-400 font-bold">
                Гость
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-green-400 font-bold">
                {user.name}
            </span>
            <button
                className="text-red-400 hover:text-red-500"
                onClick={logout}
            >
                Выйти
            </button>
        </div>
    );
}
