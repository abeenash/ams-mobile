import { Pressable, View } from "react-native";
import { Text } from "./Text";

type StatusChipProps = {
    label: string,
    tone: "success" | "danger"
}

export function StatusChip({ label, tone }: StatusChipProps) {
    return (
        <View className={`rounded-chip px-3 py-1 ${tone === "success" ? "bg-success-soft" : "bg-danger-soft"}`}>
            <Text variant="caption" tone={tone}>
                {label}
            </Text>
        </View>
    )
}

type FilterChipProps = {
    label: string,
    selected: boolean,
    onPress: () => void
}

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
    return (
        <Pressable onPress={onPress}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            className={`h-9 items-center justify-center rounded-chip border px-4 active:opacity-80
        ${selected ? "border-primary bg-primary" : "border-border bg-card"}`}>
            <Text variant="callout" tone={selected ? "inverse" : "default"}>
                {label}
            </Text>
        </Pressable>
    )
}