import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface UserInfo {
	id: number
	login: string
	firstname?: string
	lastname?: string
	email?: string
}

export default function DashboardPage() {
	const { client, logout, baseUrl } = useAuth()
	const [user, setUser] = useState<UserInfo | null>(null)
	const [about, setAbout] = useState<any>(null)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true
		async function load() {
			try {
				const [aboutRes, userRes] = await Promise.all([
					client!.get('/about'),
					client!.get('/users/info').catch(() => ({ data: null })),
				])
				if (!mounted) return
				setAbout(aboutRes.data)
				setUser(userRes.data)
			} catch (e: any) {
				if (!mounted) return
				setError(e?.message ?? 'Erreur lors du chargement')
			}
		}
		load()
		return () => {
			mounted = false
		}
	}, [client])

	return (
		<div style={{ padding: 24 }}>
			<header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<h1>Dolibarr Test</h1>
				<button onClick={logout}>Se déconnecter</button>
			</header>
			<p style={{ color: '#666' }}>Base: {baseUrl}</p>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			<section style={{ marginTop: 16 }}>
				<h2>À propos</h2>
				<pre style={{ background: '#f7f7f7', padding: 12, overflow: 'auto' }}>
					{about ? JSON.stringify(about, null, 2) : 'Chargement…'}
				</pre>
			</section>
			<section style={{ marginTop: 16 }}>
				<h2>Utilisateur</h2>
				{user ? (
					<ul>
						<li>ID: {user.id}</li>
						<li>Login: {user.login}</li>
						{user.firstname || user.lastname ? (
							<li>Nom: {[user.firstname, user.lastname].filter(Boolean).join(' ')}</li>
						) : null}
						{user.email ? <li>Email: {user.email}</li> : null}
					</ul>
				) : (
					<div>Aucune info utilisateur (droits insuffisants ou endpoint indisponible).</div>
				)}
			</section>
		</div>
	)
}

