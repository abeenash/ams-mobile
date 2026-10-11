import { formatDateHeading } from "@/lib/date";
import { AttendanceRecord } from "./types";

export type DateSection = {
    date: string
    title: string
    data: AttendanceRecord[]
}

export function groupByDate(records: AttendanceRecord[]): DateSection[] {
    const sections: DateSection[] = []

    for (const record of records) {
        const last = sections[sections.length - 1]
        if (last && last.date === record.attendanceDate) {
            last.data.push(record)
        } else {
            sections.push({
                date: record.attendanceDate,
                title: formatDateHeading(record.attendanceDate),
                data: [record]
            })
        }
    }

    return sections
}