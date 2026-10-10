import { setAccessToken, setUnauthorizedHandler } from "@/lib/api/auth-token";
import { ApiError } from "@/lib/api/errors";
import { queryClient } from "@/lib/query-client";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { login } from "./api";
import { isTokenExpired } from "./jwt";
import { clearSession, loadSession, saveSession } from "./storage";
import { Session } from "./types";

type AuthStatus = "loading" | "signedOut" | "signedIn"

type AuthContextValue = {
    status: AuthStatus
    session: Session | null
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<AuthStatus>("loading")
    const [session, setSession] = useState<Session | null>(null)

    const signOut = useCallback(async () => {
        setAccessToken(null)
        setSession(null)
        setStatus("signedOut")
        queryClient.clear()
        await clearSession()
    }, [])

    useEffect(() => {
        let cancelled = false

        async function restore() {
            const stored = await loadSession()
            if (cancelled) { return }
            if (stored && !isTokenExpired(stored.token)) {
                setAccessToken(stored.token)
                setSession(stored)
                setStatus("signedIn")
                return
            }
            if (stored) {
                await clearSession()
            }
            setStatus("signedOut")
        }

        void restore()
        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        setUnauthorizedHandler(() => {
            void signOut()
        })
        return () => setUnauthorizedHandler(null)
    }, [signOut])

    const signIn = useCallback(async (email: string, password: string) => {
        const { token, role, fullName } = await login(email, password)

        if (role !== "STUDENT") {
            throw new ApiError("forbidden", "Teacher and admin screens are coming soon. Please sign in with a student account for now.",)
        }

        const next: Session = { token, role, fullName, email }
        await saveSession(next)
        setAccessToken(token)
        setSession(next)
        setStatus("signedIn")
    }, [])

    const value = useMemo(
        () => ({ status, session, signIn, signOut }),
        [status, session, signIn, signOut],
    )

    return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used insude <AuthProvider>")
    }
    return context
}