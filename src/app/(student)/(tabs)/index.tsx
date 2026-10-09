import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/features/auth/AuthProvider";

export default function HomeScreen() {
    const { session } = useAuth()
    const firstName = session?.fullName.split(" ")[0]

    return (
        <Screen edges={["top"]}>
            <Text variant="callout" tone="muted">Namaste,</Text>
            <Text variant="title1">{firstName}</Text>
        </Screen>
    );
}