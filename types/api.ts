// types/api.ts


export interface ApiNotification {
    type: 'success' | 'error' | 'validation'
    title: string
    message: string
    code: number
}

export interface ApiResponse<T = unknown> {
    response: {
        notification?: ApiNotification
        data?: T
        token?: string
    }

    request?: {
        endpoint: string
        params: Record<string, unknown>
        headers: Record<string, string | null>
    }
}