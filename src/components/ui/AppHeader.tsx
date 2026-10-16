import colors from "@/constants/colors";
import { ChevronLeft } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";

type AppHeaderProps = {
    title: string
    subtitle?: string
    right?: ReactNode
    onBack?: () => void
}

export function AppHeader({ title, subtitle, right, onBack }: AppHeaderProps) {

    const insets = useSafeAreaInsets()

    return (
        <View className="border-b border-border bg-card px-4 pb-3"
            style={{ paddingTop: insets.top + 12 }}>
            <View className="flex-row items-center justify-between">
                {onBack ? (
                    <Pressable
                        onPress={onBack}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        hitSlop={8}
                        className="-ml-2 mr-2 h-10 w-10 items-center justify-center rounded-full active:bg-skeleton">
                        <ChevronLeft size={24} color={colors.foreground} />
                    </Pressable>
                ) : null}
                <View className="flex-1">
                    <Text variant={onBack ? "headline" : "title2"} numberOfLines={1}>
                        {title}
                    </Text>
                    {subtitle ? (
                        <Text variant="footnote" tone="muted" numberOfLines={1}>
                            {subtitle}
                        </Text>
                    ) : null}
                </View>
                {right}
            </View>
        </View>
    )
}