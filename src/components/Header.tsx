import { Link } from 'react-router-dom'
import { Home, Info, Car, FileText, FolderOpen, ShoppingCart, Phone, User } from 'lucide-react'

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
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Home size={18} /> Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Info size={18} /> About Us
            </Link>
            <Link to="/renter" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Car size={18} /> Browse Cars
            </Link>
            <Link to="/owner" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <FileText size={18} /> List Car
            </Link>
            <Link to="/projects" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <FolderOpen size={18} /> Projects
            </Link>
            <Link to="/shop" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <ShoppingCart size={18} /> Shop
            </Link>
            <Link to="/contact" className="text-gray-300 hover:text-white transition flex items-center gap-2">
              <Phone size={18} /> Contact
            </Link>
            {user ? (
              <button onClick={signOut} className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <User size={18} /> Sign Out
              </button>
            ) : (
              <Link to="/auth" className="text-gray-300 hover:text-white transition flex items-center gap-2">
                <User size={18} /> Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
