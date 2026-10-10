import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAttendanceHistory } from "@/features/attendance/queries";
import { toApiError } from "@/lib/api/errors";
import { CalendarCheck } from "lucide-react-native";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function AttendanceScreen() {
    const history = useAttendanceHistory()
    const records = history.data?.pages.flatMap((page) => page.content) ?? []

    if (history.isPending) {
        return (
            <Screen edges={["left", "right"]} scroll={false}
                className="items-center justify-center">
                <ActivityIndicator size="large" className="text-primary" />
            </Screen>
        )
    }

    if (history.isError) {
        return (
            <Screen edges={["left", "right"]} scroll={false}>
                <EmptyState
                    icon={CalendarCheck}
                    title="Couldn't load attendance"
                    message={toApiError(history.error).message}
                    action={<Button label="Retry" size="sm" onPress={() => void history.refetch()} />} />
            </Screen>
        )
    }
    return (
        <Screen edges={["left", "right"]} scroll={false}>
            <FlatList
                data={records}
                keyExtractor={(record) => String(record.id)}
                renderItem={({ item }) => (
                    <View className="flex-row justify-between border-b border-border py-3">
                        <Text variant="body">
                            {item.attendanceDate} . {item.subjectCode}
                        </Text>
                        <Text variant="body" tone={item.present ? "success" : "danger"}>
                            {item.present ? "Present" : "Absent"}
                        </Text>
                    </View>
                )}
                ListEmptyComponent={
                    <EmptyState
                        icon={CalendarCheck}
                        title="No attendance yet"
                        message="Records appear here once your teachers mark attendance." />
                }
                ListFooterComponent={
                    history.isFetchingNextPage ? <ActivityIndicator className="py-4 text-primary" /> : null
                }
                onEndReached={() => {
                    if (history.hasNextPage && !history.isFetchingNextPage) {
                        void history.fetchNextPage()
                    }
                }}
                onEndReachedThreshold={0.5}
            />
        </Screen>
    )
}