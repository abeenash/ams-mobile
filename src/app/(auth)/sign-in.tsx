import { useRef, useState } from "react";
import { Image, TextInput, View } from "react-native";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { TextField } from "@/components/ui/TextField";

export default function SignIn() {
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailError = submitted && !email.includes("@") ? "Enter a valid email" : undefined;
  const passwordError = submitted && password.length === 0 ? "Enter your password" : undefined;

  const submit = () => setSubmitted(true);

  return (
    <Screen className="justify-center gap-6">
      <View className="items-center gap-1">
        <Image
          source={require("@/assets/images/orchid-logo.png")}
          resizeMode="contain"
          accessibilityLabel="Orchid International College"
          className="mb-3 h-[111px] w-72"
        />
        <Text variant="title1">Welcome Back!</Text>
        <Text variant="callout" tone="muted">
          Sign in to your AMS
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
          onSubmitEditing={submit}
          error={passwordError}
        />
        <Button label="Sign in" onPress={submit} className="mt-2" />
      </Card>

      <Text variant="footnote" tone="muted" className="text-center">
        Accounts are issued by your college.
      </Text>
    </Screen>
  );
}