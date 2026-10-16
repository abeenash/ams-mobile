import colors from "@/constants/colors";
import { useIsOnline } from "@/lib/online";
import { WifiOff } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "./Text";

export function OfflineBanner() {
    const online = useIsOnline()

    if (online) return null

    return (
        <View
            accessibilityRole="alert"
            className="flex-row items-center gap-2 border-b border-border bg-warning-soft px-4 py-2">
            <WifiOff size={16} color={colors.warning.DEFAULT} />
            <Text variant="footnote" tone="warning">
                You're offline. Showing saved data.
            </Text>
        </View>
    )
}