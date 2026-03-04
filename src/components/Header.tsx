import { Link } from 'react-router-dom'

interface HeaderProps {
  user?: any
  profile?: any
  signOut?: () => void
}

export default function Header({ user, profile, signOut }: HeaderProps) {
  return (
    <header className="bg-forest-800 border-b-2 border-forest-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-forest-600 p-1.5 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Bolt Cars</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            {user ? (
              <>
                {profile?.role === 'owner' && (
                  <Link to="/owner" className="px-5 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition font-semibold">
                    My Vehicles
                  </Link>
                )}
                {profile?.role === 'renter' && (
                  <Link to="/renter" className="px-5 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition font-semibold">
                    Browse Cars
                  </Link>
                )}
                {profile?.role === 'admin' && (
                  <Link to="/admin" className="px-5 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition font-semibold">
                    Admin Panel
                  </Link>
                )}
                <button onClick={signOut} className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-500 transition font-semibold">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" className="text-gray-300 hover:text-white transition">Sign In</Link>
                <Link to="/auth?role=owner" className="px-5 py-2.5 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition font-semibold">
                  List Your Car
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
