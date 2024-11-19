import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

export default function Pokemon() {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>Pokemon {id}</Text>
    </SafeAreaView>
  );
}
