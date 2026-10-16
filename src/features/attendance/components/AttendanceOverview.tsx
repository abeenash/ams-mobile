import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Text } from "@/components/ui/Text";
import colors from "@/constants/colors";
import { useAttendanceSummary } from "@/features/attendance/queries";
import { hasBlockingFailure, queryFailureMessage } from "@/lib/query-state";
import { router } from "expo-router";
import { Inbox } from "lucide-react-native";
import { Pressable, RefreshControl, ScrollView, View } from "react-native";
import { ATTENDANCE_MINIMUM, AttendanceLevel, attendanceLevel, attendancePercent, formatPercent } from "../thresholds";
import { SubjectSummary } from "../types";
import { OverviewSkeleton } from "./OverviewSkeleton";

const barTone = {
    good: "success",
    warning: "warning",
    danger: "danger"
} as const satisfies Record<AttendanceLevel, "success" | "warning" | "danger">

function SubjectCard({ subject }: { subject: SubjectSummary }) {
    const percent = attendancePercent(subject.present, subject.total)
    const level = attendanceLevel(percent)
    const shown = formatPercent(percent)

    return (
        <Pressable
            onPress={() => router.push({
                pathname: "/subjects/[subjectId]",
                params: { subjectId: String(subject.subjectId) }
            })}
            accessibilityRole="button"
            accessibilityLabel={`${subject.subjectName}, ${shown}, ${subject.present} of ${subject.total} classes attended. Open details`}
            className="active:opacity-80"
        >
            <Card
                elevation="card"
                accessible
                accessibilityLabel={`${subject.subjectName}, ${formatPercent(percent)}, 
            ${subject.present} of ${subject.total} classes attended`}>
                <View className="flex-row items-start justify-between">
                    <View className="mr-3 flex-1">
                        <Text variant="headline">{subject.subjectName}</Text>
                        <Text variant="footnote" tone="muted">{subject.subjectCode}</Text>
                    </View>
                    <Text variant="title2" tone={level === "danger" ? "danger" : "default"}>{formatPercent(percent)}</Text>
                </View>
                <View className="mt-3">
                    <ProgressBar percent={percent} tone={barTone[level]} />
                </View>
                <View className="mt-2 flex-row items-center justify-between">
                    <Text variant="footnote" tone="muted">
                        {subject.present}/{subject.total} classes attended
                    </Text>
                    {level === "danger" ? <Badge label={`Below ${ATTENDANCE_MINIMUM}%`} tone="danger" /> : null}
                </View>
            </Card>
        </Pressable>
    )
}

export function AttendanceOverview() {
    const summary = useAttendanceSummary()

    if (summary.data === undefined) {
        if (hasBlockingFailure(summary)) {
            return (
                <ErrorState
                    title="Couldn't load attendance"
                    message={queryFailureMessage(summary)}
                    onRetry={() => void summary.refetch()} />
            )
        }
        return <OverviewSkeleton />
    }

    const subjects = summary.data

    if (subjects.length === 0) {
        return (
            <EmptyState
                icon={Inbox}
                title="No attendance recorded yet"
                message="Records will appear here once your teachers mark attendance."
            />
        )
    }
    return (
        <ScrollView
            className="flex-1"
            contentContainerClassName="gap-3 p-4"
            refreshControl={
                <RefreshControl
                    refreshing={summary.isRefetching}
                    onRefresh={() => void summary.refetch()}
                    colors={[colors.primary.DEFAULT]}
                />}
        >
            {subjects.map((subject) => (
                <SubjectCard key={subject.subjectId}
                    subject={subject} />
            ))}
        </ScrollView>
    )
}