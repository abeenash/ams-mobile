import { shadows } from "@/constants/shadows";
import { Pressable, View } from "react-native";
import { Text } from "./Text";

type Option<T extends string> = {
    value: T
    label: string
}

type SegmentedControlProps<T extends string> = {
    options: Option<T>[]
    value: T
    onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
    return (
        <View accessibilityRole="tablist" className="flex-row rounded-card bg-skeleton p-1">
            {options.map((option) => {
                const selected = option.value === value
                return (
                    <Pressable
                        key={option.value}
                        onPress={() => onChange(option.value)}
                        accessibilityRole="tab"
                        accessibilityState={{ selected }}
                        className={`h-10 flex-1 items-center justify-center rounded-chip ${selected ? "bg-card" : ""}`}
                        style={selected ? { boxShadow: shadows.card } : undefined}>
                        <Text variant="callout" tone={selected ? "default" : "muted"}>
                            {option.label}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}