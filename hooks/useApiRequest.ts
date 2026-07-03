// hooks/useApiRequest.ts
'use client'

import {useCallback, useState} from 'react'
import {useToastStore, useAuthStore} from '@/stores/useStore'

import {showNotification} from "@/lib/apiNotification";


type RequestOptions = {
    type?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    endpoint: string
    body?: any
    headers?: Record<string, string>
    params?: Record<string, any>
    baseUrl?: string
    sendToken?: boolean
    formData?: boolean
    showToast?: boolean
    showErrorToast?: boolean
}

type UseApiRequestReturn = {
    makeRequest: <T = any>(options: RequestOptions) => Promise<T>
    errors: Record<string, string>
    setErrors: (errors: Record<string, string>) => void
    loading: boolean
    isLoggedIn: boolean
    called: boolean
}

function buildQueryString(params: Record<string, any> = {}) {
    const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
    if (!filtered.length) return ''
    return '?' + new URLSearchParams(filtered as [string, string][]).toString()
}

const useApiRequest = (): UseApiRequestReturn => {
    const {addToast} = useToastStore()
    const accessToken = useAuthStore((state) => state.accessToken)
    const setAccessTokenLoggedIn = useAuthStore((state) => !!state.accessToken)

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [called, setCalled] = useState(false)

    const makeRequest = useCallback(
        async <T = any>({
                            type = 'GET',
                            endpoint,
                            body = null,
                            headers = {},
                            params = {},
                            baseUrl,
                            sendToken = true,
                            formData = false,
                            showToast = true,
                            showErrorToast = true,
                        }: RequestOptions): Promise<T> => {
            console.group(`🚀 API Request: ${type} ${endpoint}`)
            setLoading(true)
            setErrors({})
            console.log('1. Started request', {type, endpoint, body, params})

            const isMultipart = formData || body instanceof FormData

            const requestHeaders: Record<string, string> = {
                ...headers,
                ...(sendToken && accessToken ? {Authorization: `Bearer ${accessToken}`} : {}),
            }

            if (!isMultipart) {
                requestHeaders['Content-Type'] = requestHeaders['Content-Type'] || 'application/json'
            }

            console.log('2. Built headers', requestHeaders)

            const url = `${baseUrl || process.env.NEXT_PUBLIC_API_URL}${endpoint}${buildQueryString(params)}`
            console.log('3. Final URL', url, baseUrl, process.env.NEXT_PUBLIC_API_URL)

            try {
                console.log('4. Sending fetch...')
                const res = await fetch(url, {
                    method: type,
                    headers: requestHeaders,
                    body: ['POST', 'PUT', 'PATCH'].includes(type)
                        ? isMultipart
                            ? body
                            : JSON.stringify(body)
                        : undefined,
                })

                console.log('5. Response received', {status: res.status, ok: res.ok})

                const data = await res.json().catch(() => ({}))
                console.log('6. Parsed JSON body', data)

                if (!res.ok) {
                    console.warn('7. Request failed (non-2xx)', data)

                    if (showErrorToast && data?.response?.notification?.message) {
                        const notif = data.response.notification
                        addToast(notif.message, notif.type as 'success' | 'error')
                    }
                    if (data?.response?.data) {
                        setErrors(data.response.data)
                    }
                    setCalled(true)
                    throw data
                }

                if (showToast && data?.response?.notification?.message) {
                    const notif = data.response.notification
                    addToast(notif.message, notif.type as 'success' | 'error')
                }



                console.log('7. Request succeeded ✅', data)
                setCalled(true)
                return data as T
            } catch (error: any) {
                console.error('❌ API Request Error:', error)
                throw error
            } finally {
                setLoading(false)
                console.log('8. Finished (loading=false)')
                console.groupEnd()
            }
        },
        [accessToken, addToast]
    )

    return {makeRequest, errors, setErrors, loading, isLoggedIn: setAccessTokenLoggedIn, called}
}

export default useApiRequest