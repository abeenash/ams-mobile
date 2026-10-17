import { AuthProvider, useAuth } from "@/features/auth/AuthProvider";
import "@/lib/online";
import { queryClient } from "@/lib/query-client";
import { useAppFocus } from "@/lib/use-app-focus";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "../global.css";

SplashScreen.preventAutoHideAsync()

function RootNavigator() {
  useAppFocus()
  const { status, session } = useAuth()
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  })

  const ready = (fontsLoaded || fontError) && status !== "loading"

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync()
    }
  }, [ready])

  if (!ready) return null

  const isStudent = status === "signedIn" && session?.role === "STUDENT"
  const isTeacher = status === "signedIn" && session?.role === "TEACHER"

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={status === "signedOut"}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={isStudent}>
          <Stack.Screen name="(student)" />
        </Stack.Protected>
        <Stack.Protected guard={isTeacher}>
          <Stack.Screen name="(teacher)" />
        </Stack.Protected>
      </Stack>
    </>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  )
}
