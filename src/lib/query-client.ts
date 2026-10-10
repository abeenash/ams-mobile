import { QueryClient } from "@tanstack/react-query"
import { ApiError } from "./api/errors"

const MAX_RETRIES = 2

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            retry: (failureCount, error) => {
                const retryable = error instanceof ApiError && (error.kind === "network" || error.kind === "timeout" || error.kind === "server")
                return retryable && failureCount < MAX_RETRIES
            }
        }
    }
})