import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    gap: 16
  }
});

type Props = ViewProps;

export default function RootView({ style, ...props }: Props) {
  const colors = useThemeColors();

  return <SafeAreaView style={[stylesheet.container, { backgroundColor: colors.primary }, style]} {...props} />;
}
