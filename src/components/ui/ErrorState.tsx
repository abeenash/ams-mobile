import colors from "@/constants/colors";
import { TriangleAlert } from "lucide-react-native";
import { View } from "react-native";
import { Button } from "./Button";
import { Text } from "./Text";

type ErrorStateProps = {
    title?: string
    message: string
    onRetry?: () => void
}

export function ErrorState({ title = "Something went wrong", message, onRetry }: ErrorStateProps) {
    return (
        <View className="flex-1 items-center justify-center px-8 py-12">
            <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-danger-soft">
                <TriangleAlert size={24} color={colors.danger.DEFAULT} />
            </View>
            <Text variant="headline" className="text-center">
                {title}
            </Text>
            <Text variant="callout" tone="muted" className="mt-1 text-center">
                {message}
            </Text>
            {onRetry ? (
                <View className="mt-4">
                    <Button label="Retry" size="sm" onPress={onRetry} />
                </View>
            ) : null}
        </View>
    )
}