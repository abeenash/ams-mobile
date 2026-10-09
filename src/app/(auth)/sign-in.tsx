import { useRef, useState } from "react";
import { Image, TextInput, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormMessage } from "@/components/ui/FormMessage";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";
import { useAuth } from "@/features/auth/AuthProvider";
import { toApiError } from "@/lib/api/errors";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInScreen() {
  const { signIn } = useAuth();
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const emailValid = EMAIL_PATTERN.test(email.trim());
  const emailError = submitted && !emailValid ? "Enter a valid email address" : undefined;
  const passwordError = submitted && password.length === 0 ? "Enter your password" : undefined;

  const submit = async () => {
    if (loading) return;

    setSubmitted(true);
    setFormError(null);
    if (!emailValid || password.length === 0) return;

    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setFormError(toApiError(error).message);
      setLoading(false);
    }
  };

  return (
    <Screen className="justify-center gap-6">
      <View className="items-center gap-1">
        <Image
          source={require("@/assets/images/orchid-logo.png")}
          resizeMode="contain"
          accessibilityLabel="Orchid International College"
          className="mb-3 h-[101px] w-72"
        />
        <Text variant="title1">Sign in to AMS</Text>
        <Text variant="callout" tone="muted">
          Academic Management System
        </Text>
      </View>

      <Card elevation="raised" className="gap-4">
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@college.edu.np"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          returnKeyType="next"
          submitBehavior="submit"
          editable={!loading}
          onSubmitEditing={() => passwordRef.current?.focus()}
          error={emailError}
        />
        <TextField
          ref={passwordRef}
          label="Password"
          secure
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          autoCapitalize="none"
          autoComplete="password"
          returnKeyType="go"
          editable={!loading}
          onSubmitEditing={submit}
          error={passwordError}
        />
        {formError ? <FormMessage message={formError} /> : null}
        <Button
          label={loading ? "Signing in..." : "Sign in"}
          loading={loading}
          onPress={submit}
          className="mt-2"
        />
      </Card>

      <Text variant="footnote" tone="muted" className="text-center">
        Accounts are issued by your college.
      </Text>
    </Screen>
  );
}