import { Card } from "./Card";
import { Text, TextTone } from "./Text";

type StatTileProps = {
    value: string
    label: string
    tone?: TextTone
}

export function StatTile({ value, label, tone = "default" }: StatTileProps) {
    return (
        <Card elevation="card" className="flex-1"
            accessible
            accessibilityLabel={`${label}: ${value}`}>
            <Text variant="title2" tone={tone}>
                {value}
            </Text>
            <Text variant="footnote" tone="muted">
                {label}
            </Text>
        </Card>
    )
}