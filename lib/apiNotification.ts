export type NotificationType = 'success' | 'error' | 'validation'

export interface ApiNotification {
    type: NotificationType
    title: string
    message: string
    code: number
}

export function apiNotification() {
    return {
        success(message: string, title = 'Success', code = 200): ApiNotification {
            return {
                type: 'success',
                title,
                message,
                code,
            }
        },

        error(message: string, title = 'Error', code = 400): ApiNotification {
            return {
                type: 'error',
                title,
                message,
                code,
            }
        },

        validation(message: string, title = 'Validation Error', code = 422): ApiNotification {
            return {
                type: 'validation',
                title,
                message,
                code,
            }
        },
    }
}