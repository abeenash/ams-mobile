import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchMyAttendance } from "./api"

export const attendanceKeys = {
    all: ["attendance"] as const,
    history: (subjectId?: number) => ["attendance", "history", { subjectId }] as const,
}

export function useAttendanceHistory(subjectId?: any) {
    return useInfiniteQuery({
        queryKey: attendanceKeys.history(subjectId),
        queryFn: ({ pageParam }) => fetchMyAttendance({ page: pageParam, subjectId }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.page + 1),
    })
}