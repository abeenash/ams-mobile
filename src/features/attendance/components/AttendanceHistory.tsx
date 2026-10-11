import { Button } from "@/components/ui/Button";
import { StatusChip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { Text } from "@/components/ui/Text";
import colors from "@/constants/colors";
import { toApiError } from "@/lib/api/errors";
import { CalendarCheck } from "lucide-react-native";
import { useState } from "react";
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

export function AttendanceHistory() {
    const [subjectId, setSubjectId] = useState<number | undefined>(undefined)
    const summary = useAttendanceSummary()
    const history = useAttendanceHistory(subjectId)

    const records = history.data?.pages.flatMap((page) => page.content) ?? []
    const sections = groupByDate(records)

    const filter = summary.data ? (
        <View className="pt-4">
            <SubjectFilter subjects={summary.data} selectedId={subjectId} onSelect={setSubjectId} />
        </View>
    ) : null

    if (history.isPending) {
        return (
            <View className="flex-1">
                {filter}
                <HistorySkeleton />
            </View>
        )
    }

    if (history.isError) {
        return (
            <View className="flex-1">
                {filter}
                <EmptyState
                    icon={CalendarCheck}
                    title="Couldn't load attendance"
                    message={toApiError(history.error).message}
                    action={<Button label="Retry" size="sm" onPress={() => void history.refetch()} />} />
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