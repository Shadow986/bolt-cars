import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-forest-900 flex flex-col">
      <Header user={user} profile={profile} signOut={signOut} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest-800 to-forest-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 text-white">Drive Your Dreams with Bolt Cars</h1>
          <p className="text-2xl text-gray-300 mb-10">The easiest way to rent a car or earn money from your vehicle</p>
          <div className="flex gap-4 justify-center">
            <Link to="/auth?role=renter" className="px-8 py-4 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition text-lg font-semibold shadow-lg">
              Rent a Car
            </Link>
            <Link to="/auth?role=owner" className="px-8 py-4 bg-white text-forest-900 rounded-lg hover:bg-gray-100 transition text-lg font-semibold shadow-lg">
              List Your Car
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-forest-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Bolt Cars?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-forest-800 p-8 rounded-xl border-2 border-forest-700 hover:border-forest-600 transition shadow-xl">
              <div className="bg-forest-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Verified Users</h3>
              <p className="text-gray-300">All car owners and renters are verified with proper documentation for your safety</p>
            </div>

            <div className="bg-forest-800 p-8 rounded-xl border-2 border-forest-700 hover:border-forest-600 transition shadow-xl">
              <div className="bg-forest-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Booking</h3>
              <p className="text-gray-300">Book your perfect car in minutes with our streamlined process</p>
            </div>

            <div className="bg-forest-800 p-8 rounded-xl border-2 border-forest-700 hover:border-forest-600 transition shadow-xl">
              <div className="bg-forest-600 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Earn Money</h3>
              <p className="text-gray-300">Turn your idle car into a money-making asset with competitive rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-forest-700 to-forest-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-forest-900 p-10 rounded-2xl border-2 border-forest-600 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-white">For Car Owners</h3>
              <p className="text-gray-300 mb-6 text-lg">List your vehicle, submit verification documents, and start earning passive income today</p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Set your own rates
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Insurance coverage included
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  24/7 support
                </li>
              </ul>
              <Link to="/auth?role=owner" className="block text-center px-8 py-4 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition text-lg font-semibold">
                Start Earning Today
              </Link>
            </div>

            <div className="bg-forest-900 p-10 rounded-2xl border-2 border-forest-600 shadow-2xl">
              <h3 className="text-3xl font-bold mb-4 text-white">For Renters</h3>
              <p className="text-gray-300 mb-6 text-lg">Browse hundreds of verified vehicles and find the perfect car for your needs</p>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Wide selection of vehicles
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Competitive pricing
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  Flexible rental periods
                </li>
              </ul>
              <Link to="/auth?role=renter" className="block text-center px-8 py-4 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition text-lg font-semibold">
                Browse Available Cars
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
