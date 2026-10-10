import colors from "@/constants/colors"
import type { LucideIcon } from "lucide-react-native"
import { ReactNode } from "react"
import { View } from "react-native"
import { Text } from "./Text"

type EmptyStateProps = {
    icon: LucideIcon
    title: string
    message?: string
    action?: ReactNode
}

export function EmptyState({ icon: Icon, title, message, action }: EmptyStateProps) {
    return (
        <View className="flex-1 items-center justify-center px-8 py-12">
            <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-skeleton">
                <Icon size={24} color={colors.muted} />
            </View>
            <Text variant="headline" className="text-center">
                {title}
            </Text>
            {message ? (
                <Text variant="callout" tone="muted" className="mt-1 text-center">
                    {message}
                </Text>
            ) : null}
            {action ? <View className="mt-4">{action}</View> : null}
        </View>
    )
}