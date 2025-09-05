import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
	const { login, loading } = useAuth()
	const navigate = useNavigate()
	const location = useLocation() as any
	const from = location.state?.from?.pathname || '/'

	const [baseUrl, setBaseUrl] = useState('')
	const [apiKey, setApiKey] = useState('')
	const [error, setError] = useState<string | null>(null)

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		const ok = await login({ baseUrl, apiKey })
		if (!ok) {
			setError("Échec de connexion. Vérifiez l'URL et la clé API.")
			return
		}
		navigate(from, { replace: true })
	}

	return (
		<div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
			<form onSubmit={handleSubmit} style={{ width: 360, display: 'grid', gap: 12 }}>
				<h1>Connexion à Dolibarr</h1>
				<label>
					<span>URL de base Dolibarr</span>
					<input
						required
						type="url"
						placeholder="https://votre-dolibarr.tld"
						value={baseUrl}
						onChange={(e) => setBaseUrl(e.target.value)}
						style={{ width: '100%', padding: 8 }}
					/>
				</label>
				<label>
					<span>Clé API (DOLAPIKEY)</span>
					<input
						required
						type="password"
						placeholder="Votre clé API"
						value={apiKey}
						onChange={(e) => setApiKey(e.target.value)}
						style={{ width: '100%', padding: 8 }}
					/>
				</label>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				<button type="submit" disabled={loading} style={{ padding: 10 }}>
					{loading ? 'Connexion…' : 'Se connecter'}
				</button>
				<p style={{ fontSize: 12, color: '#666' }}>
					Entrez l'URL publique de votre instance. Le chemin /api/index.php sera auto-ajouté.
				</p>
			</form>
		</div>
	)
}

