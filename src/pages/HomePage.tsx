import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0a1f1f'}}>
      <Header user={user} profile={profile} signOut={signOut} />

      {/* Hero Section */}
      <section className="flex-grow flex items-center py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl font-bold mb-6">
            <span className="text-white">Drive Your </span>
            <span style={{color: '#d4a574'}}>Dreams,</span>
            <br />
            <span className="text-white">Rent Your </span>
            <span style={{color: '#0f3333'}}>Future</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl">
            Bolt Cars provides exceptional car rental services for your journey. 
            List your vehicle and earn money or rent the perfect car for your needs.
          </p>
          <div className="flex gap-4">
            <Link to="/auth?role=renter" className="px-8 py-3 rounded font-semibold" style={{backgroundColor: '#d4a574', color: '#0a1f1f'}}>
              Rent a Car →
            </Link>
            <Link to="/auth?role=owner" className="px-8 py-3 border-2 rounded font-semibold" style={{borderColor: '#d4a574', color: '#d4a574'}}>
              List Your Car
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
