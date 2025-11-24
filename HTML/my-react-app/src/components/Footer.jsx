export default function Footer() {
    return (
        <footer className="bg-coffee-900  p-8">
            <div className="max-w-6xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">CoffeeStyle.</h2>
                        <p className="text-coffee-200 mb-2">
                            Delivering the best coffee life since 1996.
                        </p>
                        <p className="text-coffee-200">
                            From coffee peaks to the real ones.
                        </p>
                    </div>

                    {/* Menu Section */}
                    <div>
                        <h3 className="font-semibold mb-4">MENU</h3>
                        <ul className="space-y-2 text-coffee-200">
                            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Our Products</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Styleguide</a></li>
                        </ul>
                    </div>

                    {/* Follow Us Section */}
                    <div>
                        <h3 className="font-semibold mb-4">FOLLOW US</h3>
                        <ul className="space-y-2 text-coffee-200">
                            <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pinterest</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                        </ul>
                    </div>

                    {/* Contact Us Section */}
                    <div>
                        <h3 className="font-semibold mb-4">CONTACT US</h3>
                        <p className="text-coffee-200 mb-2">We're Always Happy to Help</p>
                        <a href="mailto:us@coffeestyle.io" className="text-coffee-200 hover:text-white transition-colors">
                            us@coffeestyle.io
                        </a>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-coffee-700 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-coffee-300 text-sm mb-4 md:mb-0">
                            Powered by WebFlow
                        </p>
                        <p className="text-coffee-300 text-sm">
                            Coffeestyle Inc. © 1996
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}