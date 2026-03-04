import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t py-6 text-sm" style={{backgroundColor: '#0d2626', borderColor: '#134040'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center text-gray-400">
          <p>&copy; 2026 Bolt Cars. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition">Privacy</Link>
            <Link to="#" className="hover:text-white transition">Terms</Link>
            <Link to="#" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
