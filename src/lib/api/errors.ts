import axios from "axios"

export type ApiErrorKind = "network" | "timeout" | "unauthorized" | "forbidden" | "client" | "server"

export class ApiError extends Error {
    readonly kind: ApiErrorKind
    readonly status?: number

    constructor(kind: ApiErrorKind, message: string, status?: number) {
        super(message)
        this.name = "ApiError"
        this.kind = kind
        this.status = status
    }
}

function serverMessage(data: unknown): string | undefined {
    if (typeof data === "object" && data != null && "message" in data) {
        const message = (data as { message: unknown }).message
        if (typeof message === "string" && message.trim()) {
            return message
        }
    }
    return undefined
}

export function toApiError(error: unknown): ApiError {
    if (error instanceof ApiError) {
        return error
    }

    if (axios.isAxiosError(error)) {
        if (!error.response) {
            if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
                return new ApiError("timeout", "The server took too long to response. Please try again.")
            }
            return new ApiError("network", "Can't reach the server. Check your connection and try again.")
        }

        const { status, data } = error.response
        const message = serverMessage(data)

        if (status === 401) {
            return new ApiError("unauthorized", message ?? "Please sign in again.", status)
        }
        if (status === 403) {
            return new ApiError("forbidden", message ?? "You don't have access to this...", status)
        }
        if (status >= 500) {
            return new ApiError("server", "Something went wrong on our side. Please try again later.", status)
        }
        return new ApiError("client", message ?? "The request could not be completed.", status)
    }

    return new ApiError("client", "Something unexpected happened")
}