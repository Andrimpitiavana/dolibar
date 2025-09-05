import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface InvoiceItem {
	id: number
	ref: string
	total_ttc?: number
	date?: string
	status?: number
}

export default function InvoicesPage() {
	const { client } = useAuth()
	const [invoices, setInvoices] = useState<InvoiceItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true
		async function load() {
			setLoading(true)
			try {
				// Limit to recent invoices
				const { data } = await client!.get('/invoices', { params: { limit: 20, sortfield: 'date', sortorder: 'desc' } })
				if (!mounted) return
				setInvoices(Array.isArray(data) ? data : [])
				setLoading(false)
			} catch (e: any) {
				if (!mounted) return
				setError(e?.message ?? 'Erreur lors du chargement des factures')
				setLoading(false)
			}
		}
		load()
		return () => {
			mounted = false
		}
	}, [client])

	if (loading) return <div style={{ padding: 24 }}>Chargement des factures…</div>
	if (error) return <div style={{ padding: 24, color: 'red' }}>{error}</div>

	return (
		<div style={{ padding: 24 }}>
			<h2>Invoices</h2>
			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>Ref</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>Date</th>
						<th style={{ textAlign: 'right', borderBottom: '1px solid #eee' }}>Total TTC</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #eee' }}>Status</th>
					</tr>
				</thead>
				<tbody>
					{invoices.map((inv) => (
						<tr key={inv.id}>
							<td style={{ padding: '6px 0' }}>{inv.ref}</td>
							<td>{inv.date ? new Date(inv.date).toLocaleDateString() : '-'}</td>
							<td style={{ textAlign: 'right' }}>{inv.total_ttc?.toFixed ? inv.total_ttc.toFixed(2) : inv.total_ttc ?? '-'}</td>
							<td>{inv.status ?? '-'}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

