import { Screen } from "@/components/ui/Screen";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { AttendanceHistory } from "@/features/attendance/components/AttendanceHistory";
import { AttendanceOverview } from "@/features/attendance/components/AttendanceOverview";
import { useState } from "react";
import { View } from "react-native";

type AttendanceTab = "overview" | "history"

const TABS: { value: AttendanceTab; label: string }[] = [
    { value: "overview", label: "Overview" },
    { value: "history", label: "History" },
]

export default function AttendanceScreen() {
    const [tab, setTab] = useState<AttendanceTab>("overview")
    return (
        <Screen edges={["left", "right"]} scroll={false} padded={false}>
            <View className="px-4 pt-4">
                <SegmentedControl options={TABS} value={tab} onChange={setTab} />
            </View>
            {tab === "overview" ? <AttendanceOverview /> : <AttendanceHistory />}
        </Screen>
    )
}