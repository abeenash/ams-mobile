import { View } from "react-native";
import { Text } from "./Text";

export function FormMessage({ message }: { message: string }) {
    return (
        <View accessibilityRole="alert"
            className="rounded-chip bg-danger-soft px-3 py-2">
            <Text variant="footnote" tone="danger">
                {message}
            </Text>
        </View>
    )
}