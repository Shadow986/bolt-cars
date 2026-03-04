import { Link } from 'react-router-dom'
import { Home, Info, Briefcase, Building, Hammer, FolderOpen, ShoppingCart, Phone, User } from 'lucide-react'

interface HeaderProps {
  user?: any
  profile?: any
  signOut?: () => void
}

export default function Header({ user, profile, signOut }: HeaderProps) {
  return (
    <header className="py-5" style={{backgroundColor: '#0a1f1f', borderBottom: '1px solid #134040'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-blue-500">Bolt</span>
              <span style={{color: '#d4a574'}}>Cars</span>
            </span>
          </Link>
          
          {/* Navigation Menu */}
          <nav className="flex items-center gap-8 text-sm">
            <Link to="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Home size={16} /> Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Info size={16} /> About Us
            </Link>
            <Link to="/services" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Briefcase size={16} /> Services
            </Link>
            <Link to="/owner" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Building size={16} /> List Car
            </Link>
            <Link to="/renter" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Hammer size={16} /> Browse Cars
            </Link>
            <Link to="/projects" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <FolderOpen size={16} /> Projects
            </Link>
            <Link to="/shop" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <ShoppingCart size={16} /> Shop
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Phone size={16} /> Contact
            </Link>
            {user ? (
              <button onClick={signOut} className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <User size={16} /> Logout
              </button>
            ) : (
              <Link to="/auth" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <User size={16} /> Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
