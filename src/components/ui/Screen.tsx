import { ReactNode } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
    children: ReactNode
    footer?: ReactNode
    scroll?: boolean
    edges?: Edge[]
    className?: string
}

export function Screen({
    children,
    footer,
    scroll = true,
    edges = ["top", "right", "bottom", "left"],
    className = ""
}: ScreenProps) {
    return (
        <SafeAreaView className="flex-1 bg-background" edges={edges}>
            <KeyboardAvoidingView className="flex-1" behavior="padding">
                {scroll ? (
                    <ScrollView
                        className="flex-1"
                        contentContainerClassName={`grow p-4 ${className}`}
                        keyboardShouldPersistTaps="handled">
                        {children}
                    </ScrollView>
                ) : (
                    <View className={`flex-1 p-4 ${className}`}>
                        {children}
                    </View>
                )}
                {footer ? <View className="px-4 pb-4 pt-2">{footer}</View> : null}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}