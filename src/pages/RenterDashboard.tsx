import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'

export default function RenterDashboard() {
  const { signOut } = useAuth()
  const [cars, setCars] = useState<any[]>([])

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    const { data } = await supabase.from('cars').select('*').eq('status', 'approved')
    setCars(data || [])
  }

  return (
    <div className="min-h-screen bg-forest-900">
      <nav className="bg-forest-800 border-b border-forest-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Bolt Cars</Link>
          <button onClick={signOut} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Sign Out</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Cars</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car.id} className="bg-forest-800 p-6 rounded-lg border border-forest-700">
              <h3 className="text-xl font-bold mb-2">{car.make} {car.model}</h3>
              <p className="text-gray-300">Year: {car.year}</p>
              <p className="text-gray-300">License: {car.license_plate}</p>
              <p className="text-2xl font-bold text-forest-400 mt-3">${car.daily_rate}/day</p>
              <button className="mt-4 w-full py-2 bg-forest-600 rounded hover:bg-forest-500">Book Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
