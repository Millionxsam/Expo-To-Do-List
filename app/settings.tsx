import appStyles from "@/constants/styles";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FlatList,
  ScrollView,
  SectionListComponent,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function Settings() {
  const [keepItems, setKeepItems] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setKeepItems(
        (await AsyncStorage.getItem("settings.keepCompletedItems")) === "true"
      );
    })();
  }, []);

  useEffect(() => {
    const keep = keepItems ? "true" : "false";
    AsyncStorage.setItem("settings.keepCompletedItems", keep);
  }, [keepItems]);

  return (
    <ScrollView style={appStyles.body}>
      <View style={styles.option}>
        <Text style={styles.label}>Keep items after completed</Text>
        <Switch
          value={keepItems}
          trackColor={{ true: "teal" }}
          onValueChange={(value) => setKeepItems(value)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontSize: 17,
  },
  option: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
