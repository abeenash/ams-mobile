import { toApiError } from "./api/errors"

type QueryLike = {
    data: unknown
    error: unknown
    isError: boolean
    isPending: boolean
    fetchStatus: "fetching" | "paused" | "idle"
}

export function hasBlockingFailure(query: QueryLike): boolean {
    if (query.data !== undefined) return false
    return query.isError || (query.isPending && query.fetchStatus === "paused")
}

export function queryFailureMessage(query: QueryLike): string {
    if (query.isError) return toApiError(query.error).message
    return "You're offline. Check your connection and try again."
}