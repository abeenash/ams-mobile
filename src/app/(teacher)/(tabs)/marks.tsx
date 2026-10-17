import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { ClipboardList } from "lucide-react-native";

export default function MarkScreen() {
    return (
        <Screen edges={["left", "right"]}>
            <EmptyState
                icon={ClipboardList}
                title="Marks is coming soon"
                message="This section will be designed in a later step."
            />
        </Screen>
    )
}