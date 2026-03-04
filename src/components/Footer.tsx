import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-forest-800 border-t-2 border-forest-600 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Bolt Cars</h3>
            <p className="text-gray-400">Your trusted e-hailing service for renting and listing vehicles.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">For Renters</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/renter" className="hover:text-white transition">Browse Cars</Link></li>
              <li><Link to="/auth?role=renter" className="hover:text-white transition">Sign Up</Link></li>
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">For Owners</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/owner" className="hover:text-white transition">List Your Car</Link></li>
              <li><Link to="/auth?role=owner" className="hover:text-white transition">Sign Up</Link></li>
              <li><a href="#" className="hover:text-white transition">Earnings</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-forest-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 Bolt Cars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
