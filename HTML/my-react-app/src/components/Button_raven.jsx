import { useState, useRef } from 'react';

const RavenIndicator = () => {
    const [isRavenActive, setIsRavenActive] = useState(false);
    const audioRef = useRef(null);

    const activateRavenSignal = () => {
        if (isRavenActive) return;

        setIsRavenActive(true);


        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }


        setTimeout(() => {
            setIsRavenActive(false);
        }, 6000);
    };

    return (
        <>

            <audio ref={audioRef} preload="auto">
                <source src="/sounds/157644ef5c2bfe8.mp3" type="audio/mp3" />
            </audio>

            <div className="flex items-center gap-x-6">
                <div className="flex items-center gap-x-3 mr-4 relative">
                    <div className="flex items-center gap-x-2 bg-[#2C4B35]/20 px-3 py-2 rounded-lg border border-[#2C4B35]/30">
                        <div
                            className={`w-3 h-3 rounded-full transition-all duration-500 ${isRavenActive
                                ? 'bg-[#F8F8F9] animate-pulse shadow-lg shadow-[#F8F8F9]/50'
                                : 'bg-[#d4b5d9]'
                                }`}
                        ></div>
                        <span className="text-sm text-[#F8F8F9]">Варится Магия</span>
                    </div>


                    <button
                        onClick={activateRavenSignal}
                        disabled={isRavenActive}
                        className="group relative p-2 rounded-lg bg-[#2C4B35]/30 hover:bg-[#2C4B35]/50 transition-all duration-300 border border-[#2C4B35]/40 hover:border-[#F8F8F9]/30 disabled:opacity-50 disabled:cursor-not-allowed"

                    >
                        <div className="w-4 h-4 transition-all duration-300" >
                            <img src="/public/images/котел.png" />
                        </div>


                        <div className="absolute inset-0 rounded-lg bg-[#2C4B35]/20 group-hover:animate-ping group-hover:opacity-75"></div>


                    </button>
                </div>
            </div>
        </>
    );
};

export default RavenIndicator;