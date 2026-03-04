import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Shield, Clock, DollarSign, Users, Star, TrendingUp } from 'lucide-react'

export default function HomePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0a1f1f'}}>
      <Header user={user} profile={profile} signOut={signOut} />

      {/* Hero Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">Driving Your </span>
            <span style={{color: '#d4a574'}}>Vision,</span>
            <br />
            <span className="text-white">Creating Your </span>
            <span style={{color: '#0f4444'}}>Future</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
            Bolt Cars provides exceptional e-hailing services for car owners and renters. 
            Transform your vehicle into income or find the perfect ride for your journey.
          </p>
          <div className="flex gap-6">
            <Link 
              to="/auth?role=owner" 
              className="px-10 py-4 rounded font-semibold text-lg hover:opacity-90 transition" 
              style={{backgroundColor: '#d4a574', color: '#0a1f1f'}}
            >
              List Your Car →
            </Link>
            <Link 
              to="/auth?role=renter" 
              className="px-10 py-4 border-2 rounded font-semibold text-lg hover:bg-opacity-10 transition" 
              style={{borderColor: '#d4a574', color: '#d4a574', backgroundColor: 'transparent'}}
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6" style={{backgroundColor: '#0d2626'}}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Bolt Cars?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-full mb-6" style={{backgroundColor: '#134040'}}>
                <Shield size={40} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Verified & Secure</h3>
              <p className="text-gray-400 leading-relaxed">All users and vehicles are thoroughly verified with proper documentation for your complete safety and peace of mind.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-full mb-6" style={{backgroundColor: '#134040'}}>
                <Clock size={40} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Booking</h3>
              <p className="text-gray-400 leading-relaxed">Book your perfect car in minutes with our streamlined process. No hassle, no waiting - just drive.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex p-4 rounded-full mb-6" style={{backgroundColor: '#134040'}}>
                <DollarSign size={40} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Earn Money</h3>
              <p className="text-gray-400 leading-relaxed">Turn your idle car into a money-making asset with competitive rates and flexible rental periods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="inline-flex p-3 rounded-full mb-4" style={{backgroundColor: '#134040'}}>
                <Users size={32} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-5xl font-bold mb-2" style={{color: '#d4a574'}}>10,000+</h3>
              <p className="text-gray-400 text-lg">Active Users</p>
            </div>
            <div>
              <div className="inline-flex p-3 rounded-full mb-4" style={{backgroundColor: '#134040'}}>
                <Star size={32} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-5xl font-bold mb-2" style={{color: '#d4a574'}}>4.8/5</h3>
              <p className="text-gray-400 text-lg">Average Rating</p>
            </div>
            <div>
              <div className="inline-flex p-3 rounded-full mb-4" style={{backgroundColor: '#134040'}}>
                <TrendingUp size={32} style={{color: '#d4a574'}} />
              </div>
              <h3 className="text-5xl font-bold mb-2" style={{color: '#d4a574'}}>5,000+</h3>
              <p className="text-gray-400 text-lg">Cars Listed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6" style={{backgroundColor: '#0d2626'}}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of car owners and renters on Bolt Cars today</p>
          <div className="flex gap-6 justify-center">
            <Link 
              to="/auth?role=owner" 
              className="px-10 py-4 rounded font-semibold text-lg hover:opacity-90 transition" 
              style={{backgroundColor: '#d4a574', color: '#0a1f1f'}}
            >
              Start Earning
            </Link>
            <Link 
              to="/auth?role=renter" 
              className="px-10 py-4 border-2 rounded font-semibold text-lg hover:bg-opacity-10 transition" 
              style={{borderColor: '#d4a574', color: '#d4a574'}}
            >
              Find a Car
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
