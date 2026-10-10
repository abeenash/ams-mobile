import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { BookOpen } from "lucide-react-native";

export default function AcademicScreen() {
    return (
        <Screen edges={["left", "right"]}>
            <EmptyState
                icon={BookOpen}
                title="Academics is coming soon"
                message="This section will be designed in a later step." />
        </Screen>
    )
}