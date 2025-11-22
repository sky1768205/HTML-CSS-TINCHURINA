export default function CoffeUpdates() {
    return (
        <div className="py-16 px-4 w-full bg-blue-950 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">SIGN UP AND GET FREE COFFEE BAGS</h2>
                    <p className="text-coffee-200 text-xl md:text-2xl">Coffee Updates</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
                    <input
                        type="email"
                        placeholder="CUSTOMER@COFFEESTYLE.IO"
                        className="w-full md:flex-1 px-6 py-4 rounded-lg text-coffee-900 border-none focus:outline-none focus:ring-2 focus:ring-coffee-500 text-lg"
                    />
                    <button className="w-full md:w-auto bg-coffee-600 text-white px-12 py-4 rounded-lg font-semibold hover:bg-coffee-700 transition-colors text-lg whitespace-nowrap min-w-[200px]">
                        SUBSCRIBE
                    </button>
                </div>
            </div>
        </div>
    );
}