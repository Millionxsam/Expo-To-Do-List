import { Task } from "@/constants/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ListItem({
  task,
  onComplete,
}: {
  task: Task;
  onComplete: Function;
}) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{task.text}</Text>
      <TouchableOpacity
        onPress={() => onComplete()}
        style={
          task.completed
            ? StyleSheet.compose(styles.completeBtn, {
                backgroundColor: "teal",
              })
            : styles.completeBtn
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 20,
  },
  listItemText: {
    color: "white",
    fontSize: 17,
  },
  completeBtn: {
    height: 25,
    width: 25,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "teal",
  },
});
