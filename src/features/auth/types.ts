export type Role = "ADMIN" | "TEACHER" | "STUDENT"

export type LoginResponse = {
    token: string
    role: Role
    fullName: string
}

export type Session = LoginResponse & {
    email: string
}