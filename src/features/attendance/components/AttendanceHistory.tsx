import { StatusChip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { Text } from "@/components/ui/Text";
import colors from "@/constants/colors";
import { hasBlockingFailure, queryFailureMessage } from "@/lib/query-state";
import { CalendarCheck } from "lucide-react-native";
import { ReactElement, useState } from "react";
import { ActivityIndicator, RefreshControl, SectionList, View } from "react-native";
import { groupByDate } from "../grouping";
import { useAttendanceHistory, useAttendanceSummary } from "../queries";
import { AttendanceRecord } from "../types";
import { HistorySkeleton } from "./HistorySkeleton";
import { SubjectFilter } from "./SubjectFilter";

type RowProps = {
    record: AttendanceRecord
    isFirst: boolean
    isLast: boolean
}

function AttendanceRow({ record, isFirst, isLast }: RowProps) {
    return (
        <View className={`flex-row items-center justify-between border-x border-b border-border bg-card px-4 py-3
        ${isFirst ? "rounded-t-card border-t" : ""}
        ${isLast ? "rounded-b-card" : ""}`}>
            <View className="mr-3 flex-1">
                <Text variant="body" numberOfLines={1}>
                    {record.subjectName}
                </Text>
                <Text variant="footnote" tone="muted">
                    {record.subjectCode}
                </Text>
            </View>
            <StatusChip label={record.present ? "Present" : "Absent"} tone={record.present ? "success" : "danger"} />
        </View>
    )
}

type AttendanceHistoryProps = {
    fixedSubjectId?: number
    header?: ReactElement
}

export function AttendanceHistory({ fixedSubjectId, header }: AttendanceHistoryProps) {
    const [pickedId, setPickedId] = useState<number | undefined>(undefined)
    const subjectId = fixedSubjectId ?? pickedId
    const summary = useAttendanceSummary()
    const history = useAttendanceHistory(subjectId)

    const records = history.data?.pages.flatMap((page) => page.content) ?? []
    const sections = groupByDate(records)

    const filter = fixedSubjectId === undefined && summary.data ? (
        <View className="pt-4">
            <SubjectFilter subjects={summary.data} selectedId={pickedId} onSelect={setPickedId} />
        </View>
    ) : null

    if (history.data === undefined) {
        return (
            <View className="flex-1">
                {filter}
                {hasBlockingFailure(history) ? (
                    <ErrorState
                        title="Couldn't load attendance"
                        message={queryFailureMessage(history)}
                        onRetry={() => void history.refetch()}
                    />
                ) : (
                    <HistorySkeleton />
                )}
            </View>
        )
    }

    return (
        <View className="flex-1">
            {filter}
            <SectionList
                className="flex-1"
                contentContainerClassName="grow px-4 pb-6"
                sections={sections}
                keyExtractor={(record) => String(record.id)}
                stickySectionHeadersEnabled={false}
                renderSectionHeader={({ section }) => (
                    <Text variant="caption" tone="muted" className="pb-2 pt-5 uppercase">
                        {section.title}
                    </Text>
                )}
                renderItem={({ item, index, section }) => (
                    <AttendanceRow record={item} isFirst={index === 0} isLast={index === section.data.length - 1} />
                )}
                ListEmptyComponent={
                    <EmptyState
                        icon={CalendarCheck}
                        title={subjectId === undefined ? "No attendance yet" : "No records for this subject"}
                        message="Records appear here once your teachers mark attendance."
                    />
                }
                ListHeaderComponent={header}
                ListFooterComponent={
                    history.isFetchingNextPage ?
                        <ActivityIndicator className="py-4 text-primary" /> : null
                }
                onEndReached={() => {
                    if (history.hasNextPage && !history.isFetchingNextPage) {
                        void history.fetchNextPage()
                    }
                }}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={history.isRefetching && !history.isFetchingNextPage}
                        onRefresh={() => void history.refetch()}
                        colors={[colors.primary.DEFAULT]} />
                }
            />
        </View>
    )
}