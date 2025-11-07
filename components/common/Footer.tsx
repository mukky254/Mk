import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Ukulima Biashara</h3>
                <p className="text-green-200 text-sm">Connect Farmers to Markets</p>
              </div>
            </div>
            <p className="text-gray-300 max-w-md text-lg">
              Connecting Kenyan farmers directly with wholesalers and retailers. 
              Fresh produce, fair prices, and efficient supply chains for a better agricultural ecosystem.
            </p>
            <div className="flex space-x-4 mt-6">
              <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200 touch-target">
                <span className="text-lg">📘</span>
              </button>
              <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200 touch-target">
                <span className="text-lg">📷</span>
              </button>
              <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-200 touch-target">
                <span className="text-lg">🐦</span>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-gray-300 hover:text-white transition duration-200 text-lg">📦 Products</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition duration-200 text-lg">ℹ️ About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition duration-200 text-lg">📞 Contact</Link></li>
              <li><Link href="/help" className="text-gray-300 hover:text-white transition duration-200 text-lg">❓ Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center space-x-3">
                <span className="text-xl">📧</span>
                <span>info@ukulimabiashara.co.ke</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-xl">📞</span>
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-xl">📍</span>
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="text-xl">🕒</span>
                <span>24/7 Support</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-lg">
            &copy; 2024 Ukulima Biashara. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-300 hover:text-white text-lg transition duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-white text-lg transition duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
