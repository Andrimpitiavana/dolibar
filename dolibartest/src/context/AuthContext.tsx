import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { AxiosInstance } from 'axios'
import { createApiClient, getApiClient, validateApiKey } from '../lib/api'
import type { DolibarrAuthConfig } from '../lib/api'

interface AuthState extends DolibarrAuthConfig {}

interface AuthContextValue {
	client: AxiosInstance | null
	authenticated: boolean
	loading: boolean
	baseUrl: string | null
	apiKey: string | null
	login: (config: DolibarrAuthConfig) => Promise<boolean>
	logout: () => void
}

const STORAGE_KEY = 'dolibarr_auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [client, setClient] = useState<AxiosInstance | null>(null)
	const [authState, setAuthState] = useState<AuthState | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (raw) {
			try {
				const parsed = JSON.parse(raw) as AuthState
				createApiClient(parsed)
				setClient(getApiClient())
				setAuthState(parsed)
			} catch (_e) {
				localStorage.removeItem(STORAGE_KEY)
			}
		}
		setLoading(false)
	}, [])

	const login = useCallback(async (config: DolibarrAuthConfig) => {
		setLoading(true)
		try {
			createApiClient(config)
			const ok = await validateApiKey()
			if (!ok) {
				setLoading(false)
				return false
			}
			localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
			setClient(getApiClient())
			setAuthState(config)
			setLoading(false)
			return true
		} catch (_e) {
			setLoading(false)
			return false
		}
	}, [])

	const logout = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY)
		setClient(null)
		setAuthState(null)
	}, [])

	const value = useMemo<AuthContextValue>(() => ({
		client,
		authenticated: Boolean(authState?.apiKey && authState?.baseUrl),
		loading,
		baseUrl: authState?.baseUrl ?? null,
		apiKey: authState?.apiKey ?? null,
		login,
		logout,
	}), [client, authState, loading, login, logout])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}

