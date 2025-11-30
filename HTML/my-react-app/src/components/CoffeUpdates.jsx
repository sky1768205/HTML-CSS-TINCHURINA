import { useState, useEffect } from 'react';

export default function CoffeUpdates() {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [ravenFrame, setRavenFrame] = useState(0);

    const ravenFrames = [
        { src: '/images/first_1-removebg-preview.png', x: 0, y: 0 },
        { src: '/images/second-removebg-preview.png', x: 20, y: -10 },
        { src: '/images/third-removebg-preview.png', x: 40, y: -20 },
        { src: '/images/forth-removebg-preview.png', x: 60, y: -30 },
        { src: '/images/fifth-removebg-preview.png', x: 80, y: -40 },
    ];

    useEffect(() => {
        if (showAlert) {
            setRavenFrame(0);
            const interval = setInterval(() => {
                setRavenFrame(prev => {
                    if (prev < ravenFrames.length - 1) {
                        return prev + 1;
                    } else {
                        clearInterval(interval);
                        return prev;
                    }
                });
            }, 800);
            return () => clearInterval(interval);
        }
    }, [showAlert]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setShowAlert(true);
            setEmail('');
            setTimeout(() => {
                setShowAlert(false);
            }, 8000);
        }, 1000);
    };

    const styles = `
        @keyframes fade-in {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
        
        @keyframes progress-bar {
            from { width: 100%; }
            to { width: 0%; }
        }
        
        .animate-fade-in {
            animation: fade-in 0.3s ease-out;
        }
        
        .animate-progress-bar {
            animation: progress-bar 8s linear;
        }
        
        .raven-sprite {
            transition: opacity 0.3s ease-in-out;
        }
    `;

    return (
        <>
            <style>{styles}</style>

            {showAlert && (
                <div className="font-[Chalkduster] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] animate-fade-in">
                    <div className="relative">
                        {/* Анимированный ворон */}
                        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2">
                            <div className="relative w-14 h-14">
                                {ravenFrames.map((frame, index) => (
                                    <img
                                        key={index}
                                        src={frame.src}
                                        alt="Ворон"
                                        className={`absolute top-0 left-0 w-14 h-14 raven-sprite ${index === ravenFrame ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        style={{
                                            transform: `translate(${frame.x}px, ${frame.y}px) scale(${1 - index * 0.1})`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Скандинавский стиль алерт */}
                        <div className=" font-[Chalkduster] bg-[#2C4B35] rounded-lg px-8 py-6 shadow-lg max-w-sm ml-10 border border-[#3A5C40]">
                            <div className="text-center">
                                <div className="text-white">
                                    <div className="text-lg font-medium mb-3 tracking-wide">SKÁL!</div>
                                    <div className="font-[Chalkduster] text-base text-gray-200">
                                        Вы подписались на рассылку
                                    </div>
                                </div>
                            </div>




                            <button
                                onClick={() => setShowAlert(false)}
                                className="font-[Chalkduster] absolute -top-2 -right-2 w-6 h-6 bg-[#3A5C40] text-white rounded-full flex items-center justify-center text-xs hover:bg-[#4A6C50] transition-colors duration-200"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Основная форма в скандинавском стиле */}
            <div className="font-[Chalkduster] py-16 px-4 w-full bg-[#2c4b3543] border border-gray-300 rounded-lg shadow-sm">
                <div className="font-[Chalkduster] max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <div className="font-[Chalkduster] text-sm font-medium text-white mb-3 tracking-wide">
                            KAFE NYHETER
                        </div>
                        <h2 className="font-[Chalkduster] text-3xl md:text-4xl font-light text-white mb-4">
                            Кофейные обновления
                        </h2>
                        <p className="font-[Chalkduster] text-white max-w-md mx-auto">
                            Узнавайте первыми о новых сортах и специальных предложениях
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
                        <div className="font-[Chalkduster] relative w-full md:flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your.email@example.com"
                                className="w-full px-5 py-3 rounded-lg bg-white border border-gray-400 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#2C4B35] focus:ring-1 focus:ring-[#2C4B35] transition-all duration-200 text-base"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || !email}
                            className="font-[Chalkduster] w-full md:w-auto bg-[#2C4B35] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#3A5C40] transition-colors duration-200 border border-[#2C4B35] disabled:opacity-40 disabled:cursor-not-allowed text-base whitespace-nowrap min-w-[160px] relative"
                        >
                            <span className={`${isSubmitting ? 'opacity-0' : 'opacity-100'}`} style={{ fontFamily: "'Chalkduster', cursive" }}>
                                ПОДПИСАТЬСЯ
                            </span>
                            {isSubmitting && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}