import { AppHeader } from "@/components/ui/AppHeader";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import colors from "@/constants/colors";
import { Tabs } from "expo-router";
import { ClipboardList, GraduationCap, LayoutGrid, Megaphone } from "lucide-react-native";
import { View } from "react-native";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                header: ({ options }) => (
                    <View>
                        <AppHeader title={options.title ?? ""} />
                        <OfflineBanner />
                    </View>
                ),
                tabBarActiveTintColor: colors.primary.DEFAULT,
                tabBarInactiveTintColor: colors.muted,
                tabBarAllowFontScaling: false,
                tabBarLabelStyle: { fontFamily: "Inter_500Medium", fontSize: 11 },
                tabBarStyle: {
                    backgroundColor: colors.card,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    elevation: 0,
                },
            }}>
            <Tabs.Screen name="index"
                options={{
                    title: "Classes",
                    tabBarIcon: ({ color }) =>
                        <GraduationCap color={color} size={24} />
                }} />

            <Tabs.Screen name="notices"
                options={{
                    title: "Notices",
                    tabBarIcon: ({ color }) =>
                        <Megaphone color={color} size={24} />
                }} />

            <Tabs.Screen name="marks"
                options={{
                    title: "Marks",
                    tabBarIcon: ({ color }) =>
                        <ClipboardList color={color} size={24} />
                }} />

            <Tabs.Screen name="more"
                options={{
                    title: "More",
                    tabBarIcon: ({ color }) =>
                        <LayoutGrid color={color} size={24} />
                }} />
        </Tabs>
    )
}