import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <View className="rounded-card border border-border bg-card p-4">
        <Text className="text-title1 font-bold text-primary">AMS</Text>
        <Text className="mt-2 text-body text-muted">Nativewind + Design tokens are working.</Text>
      </View>
      <View className="mt-4 self-start rounded-chip bg-success-soft px-2 py-1">
        <Text className="text-caption font-medium text-success">Present</Text>
      </View>
    </View>
  );
}
