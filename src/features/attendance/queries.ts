import { fetchAttendanceSummary, fetchMyAttendance } from "@/features/attendance/api"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const attendanceKeys = {
    all: ["attendance"] as const,
    history: (subjectId?: number) => ["attendance", "history", { subjectId }] as const,
    summary: ["attendance", "summary"] as const
}

export function useAttendanceHistory(subjectId?: number) {
    return useInfiniteQuery({
        queryKey: attendanceKeys.history(subjectId),
        queryFn: ({ pageParam }) => fetchMyAttendance({ page: pageParam, subjectId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
    })
}

export function useAttendanceSummary() {
    return useQuery({
        queryKey: attendanceKeys.summary,
        queryFn: fetchAttendanceSummary,
    })
}