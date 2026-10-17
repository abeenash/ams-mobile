import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { GraduationCap } from "lucide-react-native";

export default function NoticeScreen() {
    return (
        <Screen edges={["left", "right"]}>
            <EmptyState
                icon={GraduationCap}
                title="Classes are coming next."
            />
        </Screen>
    )
}