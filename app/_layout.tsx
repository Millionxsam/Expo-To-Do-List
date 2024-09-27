import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          presentation: "modal",
          title: "Settings",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#252525" },
          headerRight(props) {
            return (
              <TouchableOpacity onPress={() => router.navigate("/")}>
                <Text>
                  <Ionicons
                    name="close-outline"
                    color={props.tintColor}
                    size={30}
                  />
                </Text>
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack>
  );
}
