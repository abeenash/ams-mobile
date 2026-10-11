import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Text } from "@/components/ui/Text";
import colors from "@/constants/colors";
import { toApiError } from "@/lib/api/errors";
import { ChartColumn } from "lucide-react-native";
import { RefreshControl, ScrollView, View } from "react-native";
import { useAttendanceSummary } from "../queries";
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

    return (
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
    )
}

export function AttendanceOverview() {
    const summary = useAttendanceSummary()

    if (summary.isPending) {
        return <OverviewSkeleton />
    }

    if (summary.isError) {
        return (
            <EmptyState
                icon={ChartColumn}
                title="Couldn't load attendance"
                message={toApiError(summary.error).message}
                action={<Button label="Retry" size="sm" onPress={() => void summary.refetch()} />}
            />
        )
    }

    if (summary.data.length === 0) {
        return (
            <EmptyState
                icon={ChartColumn}
                title="No attendance yet"
                message="Your subjects appear here once your teachers mark attendance."
            />
        )
    }
    return (
        <ScrollView
            className="flex-1"
            contentContainerClassName="gap-3 p-4"
            refreshControl={<RefreshControl
                refreshing={summary.isRefetching}
                onRefresh={() => void summary.refetch()}
                colors={[colors.primary.DEFAULT]} />}
        >
            {summary.data.map((subject) => (
                <SubjectCard key={subject.subjectId}
                    subject={subject} />
            ))}
        </ScrollView>
    )
}