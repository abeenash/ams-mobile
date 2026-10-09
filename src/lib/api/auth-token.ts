let accessToken: string | null = null
let unauthorizedHandler: (() => void) | null = null

export function setAccessToken(token: string | null) {
    accessToken = token
}

export function getAccessToken() {
    return accessToken
}

export function setUnauthorizedHandler(handler: (() => void) | null) {
    unauthorizedHandler = handler
}

export function notifyUnauthorized() {
    unauthorizedHandler?.()
}