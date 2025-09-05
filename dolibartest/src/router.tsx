import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import DashboardPage from './screens/DashboardPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<DashboardPage />
			</ProtectedRoute>
		),
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '*',
		element: <Navigate to="/" replace />,
	},
])

