
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">U</span>
              </div>
              <span className="text-xl font-bold">Ukulima Biashara</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Connecting Kenyan farmers directly with wholesalers and retailers. 
              Fresh produce, fair prices, and efficient supply chains.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-200">Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition duration-200">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition duration-200">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📧 info@ukulimabiashara.co.ke</li>
              <li>📞 +254 700 000 000</li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Ukulima Biashara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
