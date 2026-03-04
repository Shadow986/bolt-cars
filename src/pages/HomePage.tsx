import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function HomePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-forest-900">
      <nav className="bg-forest-800 border-b border-forest-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-forest-100">Bolt Cars</h1>
          <div className="flex gap-4">
            {user ? (
              <>
                {profile?.role === 'owner' && <Link to="/owner" className="px-4 py-2 bg-forest-600 rounded hover:bg-forest-500">Dashboard</Link>}
                {profile?.role === 'renter' && <Link to="/renter" className="px-4 py-2 bg-forest-600 rounded hover:bg-forest-500">Browse Cars</Link>}
                {profile?.role === 'admin' && <Link to="/admin" className="px-4 py-2 bg-forest-600 rounded hover:bg-forest-500">Admin</Link>}
                <button onClick={signOut} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Sign Out</button>
              </>
            ) : (
              <Link to="/auth" className="px-4 py-2 bg-forest-600 rounded hover:bg-forest-500">Sign In</Link>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">E-Hailing Made Simple</h2>
          <p className="text-xl text-gray-300">Rent cars or list your vehicle for others to rent</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-forest-800 p-8 rounded-lg border border-forest-700">
            <h3 className="text-2xl font-bold mb-4">Car Owners</h3>
            <p className="text-gray-300 mb-6">List your vehicle and earn money by renting it out to verified renters</p>
            <Link to="/auth?role=owner" className="inline-block px-6 py-3 bg-forest-600 rounded hover:bg-forest-500">Get Started as Owner</Link>
          </div>

          <div className="bg-forest-800 p-8 rounded-lg border border-forest-700">
            <h3 className="text-2xl font-bold mb-4">Looking to Rent?</h3>
            <p className="text-gray-300 mb-6">Browse available vehicles and rent the perfect car for your needs</p>
            <Link to="/auth?role=renter" className="inline-block px-6 py-3 bg-forest-600 rounded hover:bg-forest-500">Browse Cars</Link>
          </div>
        </div>
      </main>
    </div>
  )
}
