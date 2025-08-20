import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-xl font-bold text-gray-800">Phoenix 05</a>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <a className="text-gray-600 hover:text-gray-800">Home</a>
            </Link>
            <Link href="/teams">
              <a className="text-gray-600 hover:text-gray-800">Teams</a>
            </Link>
            <Link href="/matches">
              <a className="text-gray-600 hover:text-gray-800">Matches</a>
            </Link>
            <Link href="/register">
              <a className="text-gray-600 hover:text-gray-800">Register</a>
            </Link>
            <Link href="/login">
              <a className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500">Login</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
