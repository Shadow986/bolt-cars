import { Link } from 'react-router-dom'

interface HeaderProps {
  user?: any
  profile?: any
  signOut?: () => void
}

export default function Header({ user, profile, signOut }: HeaderProps) {
  return (
    <header className="border-b py-3" style={{backgroundColor: '#0a1f1f', borderColor: '#134040'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Bolt<span style={{color: '#d4a574'}}>Cars</span></span>
          </Link>
          
          <nav className="flex items-center gap-8 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/renter" className="text-gray-300 hover:text-white transition">Browse Cars</Link>
            <Link to="/owner" className="text-gray-300 hover:text-white transition">List Car</Link>
            <Link to="/auth" className="text-gray-300 hover:text-white transition">Contact</Link>
            {user ? (
              <button onClick={signOut} className="px-4 py-2 rounded text-sm font-semibold" style={{backgroundColor: '#d4a574', color: '#0a1f1f'}}>
                Sign Out
              </button>
            ) : (
              <Link to="/auth" className="px-4 py-2 rounded text-sm font-semibold" style={{backgroundColor: '#d4a574', color: '#0a1f1f'}}>
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
