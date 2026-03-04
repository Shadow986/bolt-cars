import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Link } from 'react-router-dom'

export default function OwnerDashboard() {
  const { profile, signOut } = useAuth()
  const [cars, setCars] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    make: '', model: '', year: '', license_plate: '', daily_rate: '',
    id_document: null as File | null, ownership_document: null as File | null
  })

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    const { data } = await supabase.from('cars').select('*').eq('owner_id', profile?.id)
    setCars(data || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data, error } = await supabase.from('cars').insert({
      owner_id: profile?.id,
      make: formData.make,
      model: formData.model,
      year: parseInt(formData.year),
      license_plate: formData.license_plate,
      daily_rate: parseFloat(formData.daily_rate),
      status: 'pending'
    }).select()

    if (!error) {
      setShowForm(false)
      fetchCars()
      setFormData({ make: '', model: '', year: '', license_plate: '', daily_rate: '', id_document: null, ownership_document: null })
    }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Vehicles</h1>
          <button onClick={() => setShowForm(!showForm)} className="px-6 py-2 bg-forest-600 rounded hover:bg-forest-500">
            {showForm ? 'Cancel' : 'Add Vehicle'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-forest-800 p-6 rounded-lg border border-forest-700 mb-8">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Make" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className="px-4 py-2 bg-forest-700 border border-forest-600 rounded" required />
              <input type="text" placeholder="Model" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="px-4 py-2 bg-forest-700 border border-forest-600 rounded" required />
              <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="px-4 py-2 bg-forest-700 border border-forest-600 rounded" required />
              <input type="text" placeholder="License Plate" value={formData.license_plate} onChange={(e) => setFormData({...formData, license_plate: e.target.value})} className="px-4 py-2 bg-forest-700 border border-forest-600 rounded" required />
              <input type="number" placeholder="Daily Rate ($)" value={formData.daily_rate} onChange={(e) => setFormData({...formData, daily_rate: e.target.value})} className="px-4 py-2 bg-forest-700 border border-forest-600 rounded" required />
            </div>
            <button type="submit" className="mt-4 px-6 py-2 bg-forest-600 rounded hover:bg-forest-500">Submit for Approval</button>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => (
            <div key={car.id} className="bg-forest-800 p-6 rounded-lg border border-forest-700">
              <h3 className="text-xl font-bold mb-2">{car.make} {car.model}</h3>
              <p className="text-gray-300">Year: {car.year}</p>
              <p className="text-gray-300">License: {car.license_plate}</p>
              <p className="text-gray-300">Rate: ${car.daily_rate}/day</p>
              <span className={`inline-block mt-3 px-3 py-1 rounded text-sm ${
                car.status === 'approved' ? 'bg-green-600' : 
                car.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
                {car.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
