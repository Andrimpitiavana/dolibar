import axios from 'axios'
import type { AxiosInstance } from 'axios'

export interface DolibarrAuthConfig {
	baseUrl: string
	apiKey: string
}

let apiClient: AxiosInstance | null = null

export function createApiClient(config: DolibarrAuthConfig): AxiosInstance {
	apiClient = axios.create({
		baseURL: normalizeBaseUrl(config.baseUrl),
		headers: {
			DOLAPIKEY: config.apiKey,
			'Content-Type': 'application/json',
		},
		// Avoid CORS preflight surprises; credentials are not used with API key
		withCredentials: false,
	})

	return apiClient
}

export function getApiClient(): AxiosInstance {
	if (!apiClient) {
		throw new Error('API client not initialized. Call createApiClient first.')
	}
	return apiClient
}

export async function validateApiKey(): Promise<boolean> {
	const client = getApiClient()
	try {
		// Lightweight endpoints: /about or /users/info depending on perms
		// Try /about first which is generally accessible when API is enabled
		await client.get('/about')
		return true
	} catch (firstError) {
		try {
			await client.get('/users/info')
			return true
		} catch (error) {
			return false
		}
	}
}

function normalizeBaseUrl(input: string): string {
	// Accepts values like https://host.tld, https://host.tld/api, or https://host.tld/api/index.php
	let url = input.trim()
	if (url.endsWith('/')) url = url.slice(0, -1)
	// Ensure we end at /api/index.php
	if (url.endsWith('/api')) {
		return url + '/index.php'
	}
	if (!url.endsWith('/api/index.php')) {
		return url + '/api/index.php'
	}
	return url
}

