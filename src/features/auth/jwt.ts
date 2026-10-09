const EXPIRY_MARGIN_MS = 30_000

export function isTokenExpired(token: string): boolean {
    try {
        const payload = token.split(".")[1]
        if (!payload) {
            return true
        }

        let base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
        while (base64.length % 4 !== 0) {
            base64 += "="
        }

        const claims = JSON.parse(atob(base64)) as { exp?: unknown }
        if (typeof claims.exp !== "number") {
            return true
        }
        return claims.exp * 1000 <= Date.now() + EXPIRY_MARGIN_MS
    }
    catch {
        return true
    }
}