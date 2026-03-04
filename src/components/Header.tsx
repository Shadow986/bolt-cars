import { Link } from 'react-router-dom'

interface HeaderProps {
  user?: any
  profile?: any
  signOut?: () => void
}

export default function Header({ user, profile, signOut }: HeaderProps) {
  return (
    <header className="border-b py-4" style={{backgroundColor: '#0a1f1f', borderColor: '#134040'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            <span className="text-blue-500">Bolt</span>
            <span style={{color: '#d4a574'}}>Cars</span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>🏠</span> Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>ℹ️</span> About Us
            </Link>
            <Link to="/renter" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>🚗</span> Browse Cars
            </Link>
            <Link to="/owner" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>📋</span> List Car
            </Link>
            <Link to="/projects" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>📁</span> Projects
            </Link>
            <Link to="/shop" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>🛒</span> Shop
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <span>📞</span> Contact
            </Link>
            {user ? (
              <button onClick={signOut} className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <span>👤</span> Sign Out
              </button>
            ) : (
              <Link to="/auth" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <span>👤</span> Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
