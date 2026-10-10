import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/features/auth/AuthProvider";
import { api } from "@/lib/api/client";
import { toApiError } from "@/lib/api/errors";

export default function MoreScreen() {
  const { session, signOut } = useAuth();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // TEMP: proves the token is attached and the 401 handler works
  const testCall = async () => {
    setLoading(true);
    setResult("");
    try {
      const { data } = await api.get<{ totalElements: number }>("/api/attendance/me", {
        params: { size: 1 },
      });
      setResult(`OK: ${data.totalElements} attendance records`);
    } catch (error) {
      setResult(toApiError(error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen edges={["top"]} className="gap-4">
      <Text variant="headline">{session?.fullName}</Text>
      <Text variant="callout" tone="muted">
        {session?.email}
      </Text>
      <Button label="Test protected call" loading={loading} onPress={testCall} />
      {result ? <Text variant="callout">{result}</Text> : null}
      <Button label="Sign out" onPress={() => void signOut()} />
    </Screen>
  );
}