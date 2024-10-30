import { TextProps } from "react-native";
import { Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Shades } from "@/constants/Colors";

const stylesheets = {
  body: StyleSheet.create({
    small: {
      fontSize: 10,
      lineHeight: 16
    },
    medium: {
      fontSize: 12,
      lineHeight: 16
    },
    large: {
      fontSize: 14,
      lineHeight: 16
    },
    caption: {
      fontSize: 8,
      lineHeight: 12
    }
  }),
  header: StyleSheet.create({
    small: {
      fontSize: 10,
      lineHeight: 16,
      fontWeight: "bold"
    },
    medium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "bold"
    },
    large: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: "bold"
    },
    headline: {
      fontSize: 24,
      lineHeight: 32,
      fontWeight: "bold"
    }
  })
};

type Props = TextProps & {
  type?: "body" | "header";
  variant?: "small" | "medium" | "large" | "caption" | "headline";
  color?: keyof Shades;
};

function $Text({ type = "body", variant = "small", color, ...props }: Props) {
  const colors = useThemeColors();
  const stylesheet = stylesheets[type];
  const style = stylesheet[variant as keyof typeof stylesheet];

  return (
    <Text {...props} style={[style, { color: colors[color || "dark"] }, props.style]}>
      {props.children}
    </Text>
  );
}

export function HeaderText({ variant = "small", ...props }: Props) {
  return <$Text type="header" variant="headline" {...props} />;
}

export function BodyText({ variant = "small", ...props }: Props) {
  return <$Text type="body" variant="medium" {...props} />;
}
