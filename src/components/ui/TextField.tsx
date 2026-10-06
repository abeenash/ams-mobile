import { useState, type Ref } from "react";
import { Pressable, TextInput, View, type TextInputProps } from "react-native";

import { Text } from "@/components/ui/Text";

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  secure?: boolean;
  ref?: Ref<TextInput>;
};

export function TextField({
  label,
  error,
  secure = false,
  className = "",
  ref,
  ...rest
}: TextFieldProps) {
  const [hidden, setHidden] = useState(true);
  const hasError = Boolean(error);

  return (
    <View className={className}>
      <Text variant="caption" className="mb-1">
        {label}
      </Text>
      <View>
        <TextInput
          {...rest}
          ref={ref}
          accessibilityLabel={label}
          secureTextEntry={secure && hidden}
          className={`h-12 rounded-chip border bg-card px-4 font-sans text-body text-foreground placeholder:text-muted ${
            hasError ? "border-danger" : "border-border focus:border-primary"
          } ${secure ? "pr-16" : ""}`}
        />
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            className="absolute right-0 top-0 h-12 justify-center px-4"
          >
            <Text variant="callout" tone="primary">
              {hidden ? "Show" : "Hide"}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {hasError ? (
        <Text variant="footnote" tone="danger" className="mt-1" accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}