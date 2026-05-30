export interface PingServices {
	favorites: unknown
}

export interface PingData {
	status: 'ok' | 'degraded'
	version: string
	environment: string
	timestamp: string
	uptime: string
	services: PingServices
}

export interface PingResponse {
	success: boolean
	data: PingData
}
