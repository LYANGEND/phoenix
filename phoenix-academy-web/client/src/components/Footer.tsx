import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white font-bold px-3 py-1 rounded">
                  P05
                </div>
                <span className="font-semibold text-lg">Phoenix Academy</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Developing young football talent through professional coaching, 
                competitive play, and character building. Join the Phoenix Academy 
                family and soar to new heights.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.864 3.708 13.713 3.708 12.416s.49-2.448 1.417-3.325c.876-.827 2.027-1.297 3.324-1.297s2.448.49 3.325 1.297c.876.876 1.296 2.027 1.296 3.325s-.42 2.448-1.296 3.325c-.877.827-2.028 1.297-3.325 1.297zm7.424 0c-1.297 0-2.448-.49-3.325-1.297-.876-.876-1.296-2.027-1.296-3.325s.42-2.448 1.296-3.325c.877-.827 2.028-1.297 3.325-1.297 1.296 0 2.447.49 3.324 1.297.876.876 1.297 2.027 1.297 3.325s-.421 2.448-1.297 3.325c-.877.827-2.028 1.297-3.324 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/teams" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Our Teams
                  </Link>
                </li>
                <li>
                  <Link href="/matches" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Fixtures & Results
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-300 hover:text-white transition-colors duration-200">
                    Join Academy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Contact
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-300">
                  <span className="block">Phoenix Sports Complex</span>
                  <span className="block">123 Academy Lane</span>
                  <span className="block">Sports City, SC 12345</span>
                </li>
                <li className="text-gray-300">
                  <span className="block">Phone: (555) 123-4567</span>
                </li>
                <li className="text-gray-300">
                  <span className="block">Email: info@phoenixacademy.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Phoenix 05 Football Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;