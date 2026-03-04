import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [cars, setCars] = useState<any[]>([])

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    const { data } = await supabase.from('cars').select('*')
    setCars(data || [])
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('cars').update({ status }).eq('id', id)
    fetchCars()
  }

  return (
    <div className="min-h-screen bg-forest-900">
      <nav className="bg-forest-800 border-b border-forest-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Bolt Cars Admin</Link>
          <button onClick={signOut} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Sign Out</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Vehicle Approvals</h1>

        <div className="space-y-4">
          {cars.map(car => (
            <div key={car.id} className="bg-forest-800 p-6 rounded-lg border border-forest-700 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{car.make} {car.model} ({car.year})</h3>
                <p className="text-gray-300">License: {car.license_plate} | Rate: ${car.daily_rate}/day</p>
                <span className={`inline-block mt-2 px-3 py-1 rounded text-sm ${
                  car.status === 'approved' ? 'bg-green-600' : 
                  car.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {car.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(car.id, 'approved')} className="px-4 py-2 bg-green-600 rounded hover:bg-green-500">Approve</button>
                <button onClick={() => updateStatus(car.id, 'rejected')} className="px-4 py-2 bg-red-600 rounded hover:bg-red-500">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
