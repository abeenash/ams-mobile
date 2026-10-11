import { View } from "react-native";

const fills = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
} as const

type ProgressBarProps = {
    percent: number
    tone: keyof typeof fills
}

export function ProgressBar({ percent, tone }: ProgressBarProps) {
    const clamped = Math.min(100, Math.max(0, percent))
    return (
        <View
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped) }}
            className="h-1.5 overflow-hidden rounded-full bg-skeleton">
            <View className={`h-full rounded-full ${fills[tone]}`}
                style={{ width: `${clamped}%` }} />
        </View>
    )
}