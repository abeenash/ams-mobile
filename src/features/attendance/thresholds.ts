export const ATTENDANCE_MINIMUM = 75
export const ATTENDANCE_GOOD = 80

export type AttendanceLevel = "good" | "warning" | "danger"

export function attendancePercent(present: number, total: number): number {
    return total === 0 ? 0 : (present / total) * 100
}

export function attendanceLevel(percent: number): AttendanceLevel {
    if (percent >= ATTENDANCE_GOOD) return "good"
    if (percent >= ATTENDANCE_MINIMUM) return "warning"
    return "danger"
}

export function formatPercent(percent: number): string {
    const rounded = Math.round(percent)
    if (attendanceLevel(percent) === attendanceLevel(rounded)) {
        return `${rounded}%`
    }
    return `${(Math.floor(percent * 10) / 10).toFixed(1)}%`
}