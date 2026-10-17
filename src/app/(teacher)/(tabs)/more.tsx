import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/features/auth/AuthProvider";

export default function TeacherMoreScreen() {
    const { session, signOut } = useAuth();

    return (
        <Screen edges={["top"]} className="gap-4">
            <Text variant="headline">{session?.fullName}</Text>
            <Text variant="callout" tone="muted">
                {session?.email}
            </Text>
            <Button label="Sign out" onPress={() => void signOut()} />
        </Screen>
    );
}