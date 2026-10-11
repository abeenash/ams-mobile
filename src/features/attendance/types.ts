export type AttendanceRecord = {
    id: number
    subjectId: number
    subjectName: string
    subjectCode: string
    attendanceDate: string
    present: boolean
}

export type SubjectSummary = {
    subjectId: number
    subjectName: string
    subjectCode: string
    present: number
    total: number
}