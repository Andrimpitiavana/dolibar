import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AppLayout() {
	const { logout } = useAuth()
	return (
		<div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', minHeight: '100vh' }}>
			<header style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 12, borderBottom: '1px solid #eee' }}>
				<strong>Dolibarr Test</strong>
				<nav style={{ display: 'flex', gap: 12 }}>
					<NavLink to="/" end style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Dashboard</NavLink>
					<NavLink to="/invoices" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Invoices</NavLink>
					<NavLink to="/third-parties" style={({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none' })}>Third Parties</NavLink>
				</nav>
				<div style={{ marginLeft: 'auto' }}>
					<button onClick={logout}>Logout</button>
				</div>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	)
}

