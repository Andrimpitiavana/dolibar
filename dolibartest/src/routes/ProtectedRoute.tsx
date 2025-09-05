import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }: { children: ReactNode }) {
	const { authenticated, loading } = useAuth()
	const location = useLocation()

	if (loading) {
		return <div style={{ padding: 24 }}>Chargement…</div>
	}

	if (!authenticated) {
		return <Navigate to="/login" replace state={{ from: location }} />
	}

	return <>{children}</>
}

