import { AppHeader } from "@/components/ui/AppHeader";
import { Screen } from "@/components/ui/Screen";
import { AttendanceHistory } from "@/features/attendance/components/AttendanceHistory";
import { SubjectStats } from "@/features/attendance/components/SubjectStats";
import { useAttendanceSummary } from "@/features/attendance/queries";
import { router, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function SubjectDetailsScreen() {
    const { subjectId } = useLocalSearchParams<{ subjectId: string }>()
    const id = Number(subjectId)
    const summary = useAttendanceSummary()
    const subject = summary.data?.find((item) => item.subjectId === id)

    const subtitle = subject ? [subject.subjectCode, subject.teacherName].filter(Boolean).join(" . ") : undefined

    return (
        <View className="flex-1 bg-background">
            <AppHeader title={subject?.subjectName ?? "Attendance"} subtitle={subtitle} onBack={() => router.back()} />
            <Screen edges={["left", "right", "bottom"]} scroll={false} padded={false}>
                <AttendanceHistory fixedSubjectId={id} header={subject ? <SubjectStats subject={subject} /> : undefined} />
            </Screen>
        </View>
    )
}