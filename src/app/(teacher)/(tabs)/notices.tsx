import { EmptyState } from "@/components/ui/EmptyState";
import { Screen } from "@/components/ui/Screen";
import { Megaphone } from "lucide-react-native";

export default function NoticeScreen() {
    return (
        <Screen edges={["left", "right"]}>
            <EmptyState
                icon={Megaphone}
                title="Notices is coming soon"
                message="This section will be designed in a later step."
            />
        </Screen>
    )
}