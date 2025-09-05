import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface ThirdPartyItem {
	id: number
	name: string
	client?: number
	supplier?: number
	email?: string
}

export default function ThirdPartiesPage() {
	const { client } = useAuth()
	const [items, setItems] = useState<ThirdPartyItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true
		async function load() {
			setLoading(true)
			try {
				const { data } = await client!.get('/thirdparties', { params: { limit: 20, sortfield: 'rowid', sortorder: 'desc' } })
				if (!mounted) return
				setItems(Array.isArray(data) ? data : [])
				setLoading(false)
			} catch (e: any) {
				if (!mounted) return
				setError(e?.message ?? 'Erreur lors du chargement des tiers')
				setLoading(false)
			}
		}
		load()
		return () => {
			mounted = false
		}
	}, [client])

	if (loading) return <div style={{ padding: 24 }}>Chargement des tiers…</div>
	if (error) return <div style={{ padding: 24, color: 'red' }}>{error}</div>

	return (
		<div style={{ padding: 24 }}>
			<h2>Third Parties</h2>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>Name</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>Type</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>Email</th>
					</tr>
				</thead>
				<tbody>
					{items.map((t) => (
						<tr key={t.id}>
							<td style={{ padding: '6px 0' }}>{t.name}</td>
							<td>{renderType(t)}</td>
							<td>{t.email ?? '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function renderType(t: ThirdPartyItem): string {
	const types: string[] = []
	if (t.client) types.push('Client')
	if (t.supplier) types.push('Supplier')
	return types.length ? types.join(' / ') : '-'
}

