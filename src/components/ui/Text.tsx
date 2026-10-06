import { Text as RNText, type TextProps as RNTextProps } from "react-native";

const variants = {
  display: "text-display font-sans-bold",
  title1: "text-title1 font-sans-bold",
  title2: "text-title2 font-sans-bold",
  headline: "text-headline font-sans-semibold",
  body: "text-body font-sans",
  callout: "text-callout font-sans",
  footnote: "text-footnote font-sans",
  caption: "text-caption font-sans-medium",
} as const;

const tones = {
  default: "text-foreground",
  muted: "text-muted",
  primary: "text-primary",
  success: "text-success",
  danger: "text-danger",
  warning: "text-warning",
  info: "text-info",
  inverse: "text-white",
} as const;

export type TextVariant = keyof typeof variants;
export type TextTone = keyof typeof tones;

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  tone?: TextTone;
};

export function Text({ variant = "body", tone = "default", className, ...rest }: TextProps) {
  const classes = [variants[variant], tones[tone], className].filter(Boolean).join(" ");
  return <RNText className={classes} {...rest} />;
}