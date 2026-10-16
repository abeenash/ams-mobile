import { StatTile } from "@/components/ui/StatTile";
import { TextTone } from "@/components/ui/Text";
import { View } from "react-native";
import { attendanceLevel, AttendanceLevel, attendancePercent, formatPercent } from "../thresholds";
import { SubjectSummary } from "../types";

const levelTone = {
    good: "success",
    warning: "warning",
    danger: "danger"
} as const satisfies Record<AttendanceLevel, TextTone>

export function SubjectStats({ subject }: { subject: SubjectSummary }) {
    const percent = attendancePercent(subject.present, subject.total)

    return (
        <View className="flex-row gap-3 pb-1 pt-4">
            <StatTile value={formatPercent(percent)} label="Attendance" tone={levelTone[attendanceLevel(percent)]} />
            <StatTile value={String(subject.present)} label="Present" />
            <StatTile value={String(subject.total - subject.present)} label="Absent" />
        </View>
    )
}