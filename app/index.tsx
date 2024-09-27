import ListItem from "@/components/ListItem";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import appStyles from "@/constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/constants/types";

export default function Home() {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("tasks").then((tasks) => {
      if (tasks) setTasks(JSON.parse(tasks));
    });
  }, []);

  async function addTask() {
    if (!newTask.trim().length) return Alert.alert("Please input a task");
    setTasks([...tasks, { text: newTask, completed: false }]);
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    setNewTask("");
  }

  async function completeTask(index: number) {
    if (
      (await AsyncStorage.getItem("settings.keepCompletedItems")) !== "true"
    ) {
      Alert.alert(
        "Complete Task",
        "Complete this task and remove it from the list?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            isPreferred: true,
            style: "default",
            async onPress() {
              let newTasks: Task[] = [...tasks];
              newTasks.splice(index, 1);
              setTasks(newTasks);
              await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
            },
          },
        ]
      );
    } else {
      const newTasks: Task[] = [...tasks];
      newTasks[index].completed = !newTasks[index].completed;

      setTasks(newTasks);
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#121212" }}>
      <ScrollView style={appStyles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>To Do List</Text>
          <TouchableOpacity onPress={() => router.navigate("/settings")}>
            <Ionicons name="settings-sharp" color="white" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add an item"
            onChangeText={(text) => setNewTask(text)}
            value={newTask}
          />
          <TouchableOpacity onPress={addTask} style={styles.addBtn}>
            <Text style={{ color: "white" }}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.list}>
          {tasks.length ? (
            tasks.map((task, index) => (
              <ListItem
                key={index}
                task={task}
                onComplete={() => completeTask(index)}
              />
            ))
          ) : (
            <Text style={{ color: "gray", fontSize: 20 }}>No tasks</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    // marginTop: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 40,
    color: "white",
  },
  inputContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    color: "white",
    backgroundColor: "#1c1c1c",
    padding: 10,
    width: "85%",
    borderRadius: 10,
  },
  addBtn: {
    backgroundColor: "teal",
    padding: 10,
    marginLeft: "auto",
    borderRadius: 10,
  },
  list: {
    display: "flex",
    gap: 15,
    marginTop: 20,
  },
});
