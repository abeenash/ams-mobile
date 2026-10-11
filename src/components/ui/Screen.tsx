import { ReactNode } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
    children: ReactNode
    footer?: ReactNode
    scroll?: boolean
    padded?: boolean
    edges?: Edge[]
    className?: string
}

export function Screen({
    children,
    footer,
    scroll = true,
    padded = true,
    edges = ["top", "right", "bottom", "left"],
    className = ""
}: ScreenProps) {

    const padding = padded ? "p-4" : ""

    return (
        <SafeAreaView className="flex-1 bg-background" edges={edges}>
            <KeyboardAvoidingView className="flex-1" behavior="padding">
                {scroll ? (
                    <ScrollView
                        className="flex-1"
                        contentContainerClassName={`grow ${padding} ${className}`}
                        keyboardShouldPersistTaps="handled">
                        {children}
                    </ScrollView>
                ) : (
                    <View className={`flex-1 ${padding} ${className}`}>
                        {children}
                    </View>
                )}
                {footer ? <View className="px-4 pb-4 pt-2">{footer}</View> : null}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}