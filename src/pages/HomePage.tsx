import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function HomePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0a1f1f'}}>
      <Header user={user} profile={profile} signOut={signOut} />

      {/* Hero Section - Exact match to screenshot */}
      <section className="flex-grow flex items-center py-32 px-6">
        <div className="max-w-6xl">
          <h1 className="text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">Driving Your </span>
            <span style={{color: '#d4a574'}}>Vision,</span>
            <br />
            <span className="text-white">Creating Your </span>
            <span className="text-teal-700">Future</span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl leading-relaxed">
            Bolt Cars provides exceptional e-hailing services for car owners and renters. 
            Transform your vehicle into income or find the perfect ride for your journey.
          </p>
          <div className="flex gap-6">
            <Link 
              to="/auth?role=owner" 
              className="px-10 py-4 rounded font-semibold text-lg flex items-center gap-3 hover:opacity-90 transition" 
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

      <Footer />
    </div>
  )
}
