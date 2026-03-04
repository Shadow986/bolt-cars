import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [searchParams] = useSearchParams()
  const role = searchParams.get('role') as 'owner' | 'renter' || 'renter'
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = isSignUp 
      ? await signUp(email, password, role)
      : await signIn(email, password)

    if (error) {
      setError(error.message)
    } else {
      navigate(role === 'owner' ? '/owner' : '/renter')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-900 px-4">
      <div className="bg-forest-800 p-8 rounded-lg border border-forest-700 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        
        {error && <div className="bg-red-600 text-white p-3 rounded mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-forest-700 border border-forest-600 rounded focus:outline-none focus:border-forest-500"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-forest-700 border border-forest-600 rounded focus:outline-none focus:border-forest-500"
              required
            />
          </div>

          {isSignUp && (
            <div className="bg-forest-700 p-3 rounded">
              <p className="text-sm">Signing up as: <span className="font-bold">{role === 'owner' ? 'Car Owner' : 'Renter'}</span></p>
            </div>
          )}

          <button type="submit" className="w-full py-3 bg-forest-600 rounded hover:bg-forest-500 font-semibold">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-4">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-forest-400 hover:underline">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  )
}
