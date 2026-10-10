import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";

type AppHeaderProps = {
    title: string
    subtitle?: string
    right?: ReactNode
}

export function AppHeader({ title, subtitle, right }: AppHeaderProps) {

    const insets = useSafeAreaInsets()

    return (
        <View className="border-b border-border bg-card px-4 pb-3"
            style={{ paddingTop: insets.top + 12 }}>
            <View className="flex-row items-center justify-between">
                <View className="flex-1">
                    <Text variant="title2">
                        {title}
                    </Text>
                    {subtitle ? (
                        <Text variant="footnote" tone="muted">
                            {subtitle}
                        </Text>
                    ) : null}
                </View>
                {right}
            </View>
        </View>
    )
}