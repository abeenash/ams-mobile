import { Skeleton } from "@/components/ui/Skeleton";
import { View } from "react-native";

const ROWS = [0, 1, 2, 3, 4, 5]

export function HistorySkeleton() {
    return (
        <View className="px-4 pt-4">
            <Skeleton className="mb-3 h-3 w-40" />
            <View className="rounded-card border border-border bg-card">
                {ROWS.map((row, index) => (
                    <View key={row}
                        className={`flex-row items-center justify-between px-4 py-3 
                    ${index < ROWS.length - 1 ? "border-b border-border" : ""}`}>
                        <View className="gap-2">
                            <Skeleton className="h-4 w-44" />
                            <Skeleton className="h-3 w-16" />
                        </View>
                        <Skeleton className="h-6 w-16" />
                    </View>
                ))}
            </View>
        </View>
    )
}