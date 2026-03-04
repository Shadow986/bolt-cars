import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function OwnerDashboard() {
  const { user, profile, signOut } = useAuth()
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
    <div className="min-h-screen bg-forest-900 flex flex-col">
      <Header user={user} profile={profile} signOut={signOut} />

      <main className="max-w-7xl mx-auto px-6 py-12 flex-grow">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Vehicles</h1>
            <p className="text-gray-400">Manage your listed vehicles and track approval status</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="px-8 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition font-semibold shadow-lg">
            {showForm ? 'Cancel' : '+ Add Vehicle'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-forest-800 p-8 rounded-xl border-2 border-forest-700 mb-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-white">Add New Vehicle</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Make</label>
                <input type="text" placeholder="e.g., Toyota" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className="w-full px-4 py-3 bg-forest-700 border-2 border-forest-600 rounded-lg text-white focus:border-forest-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Model</label>
                <input type="text" placeholder="e.g., Camry" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full px-4 py-3 bg-forest-700 border-2 border-forest-600 rounded-lg text-white focus:border-forest-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Year</label>
                <input type="number" placeholder="e.g., 2022" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-3 bg-forest-700 border-2 border-forest-600 rounded-lg text-white focus:border-forest-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">License Plate</label>
                <input type="text" placeholder="e.g., ABC-123" value={formData.license_plate} onChange={(e) => setFormData({...formData, license_plate: e.target.value})} className="w-full px-4 py-3 bg-forest-700 border-2 border-forest-600 rounded-lg text-white focus:border-forest-500 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Daily Rate ($)</label>
                <input type="number" placeholder="e.g., 50" value={formData.daily_rate} onChange={(e) => setFormData({...formData, daily_rate: e.target.value})} className="w-full px-4 py-3 bg-forest-700 border-2 border-forest-600 rounded-lg text-white focus:border-forest-500 focus:outline-none" required />
              </div>
            </div>
            <button type="submit" className="mt-6 px-8 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-500 transition font-semibold">Submit for Approval</button>
          </form>
        )}

        {cars.length === 0 ? (
          <div className="text-center py-20 bg-forest-800 rounded-xl border-2 border-forest-700">
            <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
            </svg>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No vehicles listed yet</h3>
            <p className="text-gray-500">Click "Add Vehicle" to list your first car</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <div key={car.id} className="bg-forest-800 p-6 rounded-xl border-2 border-forest-700 hover:border-forest-600 transition shadow-xl">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-white">{car.make} {car.model}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    car.status === 'approved' ? 'bg-green-600 text-white' : 
                    car.status === 'pending' ? 'bg-yellow-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {car.status}
                  </span>
                </div>
                <div className="space-y-2 text-gray-300">
                  <p><span className="font-semibold">Year:</span> {car.year}</p>
                  <p><span className="font-semibold">License:</span> {car.license_plate}</p>
                  <p className="text-2xl font-bold text-forest-400 mt-4">${car.daily_rate}<span className="text-sm text-gray-400">/day</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
