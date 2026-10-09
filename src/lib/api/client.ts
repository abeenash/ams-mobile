import axios from "axios"
import { getAccessToken, notifyUnauthorized } from "./auth-token"
import { toApiError } from "./errors"

const baseURL = process.env.EXPO_PUBLIC_API_URL

if (!baseURL) {
    throw new Error("EXPO_PUBLIC_API_URL is missing. Create .env.local with the backend address.")
}

export const api = axios.create({
    baseURL,
    timeout: 10_000,
    headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use((response) => response,
    (error) => {
        const apiError = toApiError(error)
        const hadToken = axios.isAxiosError(error) && Boolean(error.config?.headers?.Authorization)

        if (apiError.kind === "unauthorized" && hadToken) {
            notifyUnauthorized()
        }
        return Promise.reject(apiError)
    })
