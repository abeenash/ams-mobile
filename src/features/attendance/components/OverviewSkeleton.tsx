import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { View } from "react-native";

const CARDS = [0, 1, 2, 3]

export function OverviewSkeleton() {
    return (
        <View className="gap-3 p-4">
            {CARDS.map((card) => (
                <Card key={card} elevation="card" className="gap-3">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-1.5 w-full" />
                </Card>
            ))}
        </View>
    )
}