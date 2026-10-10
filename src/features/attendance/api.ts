import { api } from "@/lib/api/client"
import { PageResponse } from "@/lib/api/types"
import { AttendanceRecord } from "./types"

export const HISTORY_PAGE_SIZE = 8

export async function fetchMyAttendance(params: {
    page: number
    size?: number
    subjectId: number
}): Promise<PageResponse<AttendanceRecord>> {
    const { data } = await api.get<PageResponse<AttendanceRecord>>("/api/attendance/me", {
        params: { size: HISTORY_PAGE_SIZE, ...params }
    })
    return data
}