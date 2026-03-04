import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ArrowRight, Shield, Clock, DollarSign } from 'lucide-react'

export default function HomePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0a1f1f'}}>
      <Header user={user} profile={profile} signOut={signOut} />

      {/* Hero Section */}
      <section className="flex-grow flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Drive Your </span>
            <span style={{color: '#d4a574'}}>Dreams,</span>
            <br />
            <span className="text-white">Rent Your </span>
            <span style={{color: '#d4a574'}}>Future</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl">
            Bolt Cars provides exceptional car rental services for your journey. 
            List your vehicle and earn passive income or rent the perfect car for your needs.
          </p>
          <div className="flex gap-4">
            <Link to="/auth?role=renter" className="px-8 py-3 rounded font-semibold flex items-center gap-2 hover:opacity-90 transition" style={{backgroundColor: '#d4a574', color: '#0a1f1f'}}>
              Rent a Car <ArrowRight size={20} />
            </Link>
            <Link to="/auth?role=owner" className="px-8 py-3 border-2 rounded font-semibold hover:bg-opacity-10 transition" style={{borderColor: '#d4a574', color: '#d4a574'}}>
              List Your Car
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6" style={{backgroundColor: '#0d2626'}}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Bolt Cars?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full mb-4" style={{backgroundColor: '#134040'}}>
                <Shield size={32} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Verified & Secure</h3>
              <p className="text-gray-400">All users and vehicles are verified for your safety and peace of mind</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full mb-4" style={{backgroundColor: '#134040'}}>
                <Clock size={32} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Instant Booking</h3>
              <p className="text-gray-400">Book your perfect car in minutes with our streamlined process</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full mb-4" style={{backgroundColor: '#134040'}}>
                <DollarSign size={32} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Earn Money</h3>
              <p className="text-gray-400">Turn your idle car into a money-making asset with competitive rates</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
