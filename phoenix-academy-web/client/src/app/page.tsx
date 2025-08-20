import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-4">Phoenix 05 Football Academy</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
        Empowering young football talent with professional coaching, state-of-the-art facilities, and a passion for the beautiful game.
      </p>
      <div className="space-x-4">
        <Link href="/register">
          <a className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500">Register Now</a>
        </Link>
        <Link href="/teams">
          <a className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500">View Teams</a>
        </Link>
        <Link href="/matches">
          <a className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-500">Match Center</a>
        </Link>
      </div>
    </div>
  );
}
