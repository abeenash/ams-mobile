import { ActivityIndicator, Pressable, type PressableProps } from "react-native";

import { Text } from "@/components/ui/Text";

const sizes = {
  md: "h-12 px-6",
  sm: "h-9 px-4",
} as const;

type ButtonProps = Omit<PressableProps, "children"> & {
  label: string;
  size?: keyof typeof sizes;
  loading?: boolean;
  className?: string;
};

export function Button({
  label,
  size = "md",
  loading = false,
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  const inactive = Boolean(disabled) || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: inactive, busy: loading }}
      disabled={inactive}
      className={`flex-row items-center justify-center rounded-chip bg-primary active:opacity-80 ${sizes[size]} ${inactive ? "opacity-60" : ""} ${className}`}
      {...rest}
    >
      {loading ? <ActivityIndicator size="small" className="mr-2 text-white"/> : null}
      <Text variant="headline" tone="inverse">
        {label}
      </Text>
    </Pressable>
  );
}