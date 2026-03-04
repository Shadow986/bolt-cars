import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import HomePage from '@/pages/HomePage'
import AuthPage from '@/pages/AuthPage'
import OwnerDashboard from '@/pages/OwnerDashboard'
import RenterDashboard from '@/pages/RenterDashboard'
import AdminDashboard from '@/pages/AdminDashboard'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user, profile, loading } = useAuth()
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/auth" />
  if (profile && !allowedRoles.includes(profile.role)) return <Navigate to="/" />
  
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/owner" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><OwnerDashboard /></ProtectedRoute>} />
      <Route path="/renter" element={<ProtectedRoute allowedRoles={['renter', 'admin']}><RenterDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
