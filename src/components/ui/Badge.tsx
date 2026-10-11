import { View } from "react-native";
import { Text, type TextTone } from "./Text";

const tones = {
    danger: { box: "bg-danger-soft", text: "danger" },
    warning: { box: "bg-warning-soft", text: "warning" },
    info: { box: "bg-info-soft", text: "primary" },
    neutral: { box: "bg-primary-soft", text: "primary" },
} as const satisfies Record<string, { box: string; text: TextTone }>


type BadgeProps = {
    label: string
    tone: keyof typeof tones
}


export function Badge({ label, tone }: BadgeProps) {
    return (
        <View className={`self-start rounded-full px-2 py-0.5 ${tones[tone].box}`}>
            <Text variant="caption" tone={tones[tone].text} className="uppercase">
                {label}
            </Text>
        </View>
    )
}