import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from './screens/LoginPage'
import DashboardPage from './screens/DashboardPage'
import InvoicesPage from './screens/InvoicesPage'
import ThirdPartiesPage from './screens/ThirdPartiesPage'
import { ProtectedRoute } from './routes/ProtectedRoute'
import AppLayout from './components/AppLayout'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<AppLayout />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <DashboardPage /> },
			{ path: 'invoices', element: <InvoicesPage /> },
			{ path: 'third-parties', element: <ThirdPartiesPage /> },
		],
	},
	{ path: '/login', element: <LoginPage /> },
	{ path: '*', element: <Navigate to="/" replace /> },
])

