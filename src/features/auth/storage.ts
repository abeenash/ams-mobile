import * as SecureStore from "expo-secure-store"
import { Role, Session } from "./types"

const SESSION_KEY = "ams.session"
const ROLES: Role[] = ["ADMIN", "TEACHER", "STUDENT"]

function isSession(value: unknown): value is Session {
    if (typeof value !== "object" || value === null) {
        return false
    }
    const candidate = value as Record<string, unknown>
    return (
        typeof candidate.token === "string" &&
        typeof candidate.fullName === "string" && typeof candidate.email === "string" && ROLES.includes(candidate.role as Role)
    )
}

export async function loadSession(): Promise<Session | null> {
    try {
        const raw = await SecureStore.getItemAsync(SESSION_KEY)
        if (!raw) {
            return null
        }
        const parsed: unknown = JSON.parse(raw)
        return isSession(parsed) ? parsed : null
    } catch {
        return null
    }
}

export async function saveSession(session: Session): Promise<void> {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session))
}

export async function clearSession(): Promise<void> {
    try {
        await SecureStore.deleteItemAsync(SESSION_KEY)
    } catch {

    }
}