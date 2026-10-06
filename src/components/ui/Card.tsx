import { shadows } from "@/constants/shadows"
import { View, type ViewProps } from "react-native"

type CardProps = ViewProps & {
    elevation?: "none" | "card" | "raised"
    padded?: boolean
}

export function Card({
    elevation = "card",
    padded = true,
    className = "",
    style,
    ...rest
}: CardProps) {
    return (
        <View
            className={`rounded-card bg-card ${padded ? "p-4" : ""} ${className}`}
            style={[elevation === "none" ? undefined : { boxShadow: shadows[elevation] }, style]}
            {...rest}
        />
    )
}