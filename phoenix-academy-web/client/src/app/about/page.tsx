export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Phoenix Academy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a passion for developing young football talent, Phoenix Academy has been 
            a cornerstone of youth football development for over a decade.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            To provide exceptional football training and development opportunities for young athletes, 
            fostering both athletic excellence and personal growth through professional coaching, 
            competitive play, and character building programs.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from training sessions to competitive matches.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Teamwork</h3>
            <p className="text-gray-600">
              We believe in the power of teamwork, both on and off the field, building lasting friendships.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Education</h3>
            <p className="text-gray-600">
              We emphasize learning and growth, ensuring our players develop both as athletes and individuals.
            </p>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Our History</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-4">
              Phoenix Academy was established in 2010 with a simple vision: to create a premier 
              football development program that nurtures young talent in our community.
            </p>
            <p className="text-lg mb-4">
              Over the years, we have grown from a small local club to a recognized academy that 
              has produced numerous players who have gone on to play at collegiate and professional levels.
            </p>
            <p className="text-lg">
              Today, we serve over 200 young athletes across multiple age groups, providing them 
              with top-tier coaching, competitive opportunities, and life lessons that extend far beyond the pitch.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Join Our Family?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Discover what makes Phoenix Academy the premier choice for youth football development.
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Apply Today
            </a>
            <a
              href="/matches"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              View Matches
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}