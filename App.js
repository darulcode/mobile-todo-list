import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';

export default function App() {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [...prevTasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleEditTask = () => {
    if (editText.trim()) {
      setTasks((prevTasks) =>
          prevTasks.map((task, i) =>
              i === editingIndex ? { ...task, text: editText } : task
          )
      );
      setEditingIndex(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditText('');
  };

  const handleDeleteTask = (index) => {
    Alert.alert(
        "Hapus Task",
        "Apakah Anda yakin ingin menghapus task ini?",
        [
          {
            text: "Batal",
            style: "cancel", // Gaya tombol Batal
          },
          {
            text: "Hapus",
            onPress: () =>
                setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index)),
            style: "destructive",
          },
        ]);

  };

  const toggleTask = (index) => {
    setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        )
    );
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.heading}>
          <Text style={[styles.h1]}>Hello,</Text>
          <Text style={[styles.h1, styles.bold]}>A Darul Ilmi</Text>
        </View>
        <View style={styles.card}>
          <View>
            <Text style={styles.cardText}>Todo Done</Text>
            <Text style={styles.cardText}>Keep it up</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {tasks.filter((task) => task.completed).length}/{tasks.length}
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          {editingIndex === null ? (
              <>
                <TextInput
                    style={styles.input}
                    placeholder="Insert your task"
                    value={newTask}
                    onChangeText={setNewTask}
                />
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </>
          ) : (
              <>
                <TextInput
                    style={styles.input}
                    placeholder="Edit your task"
                    value={editText}
                    onChangeText={setEditText}
                />
                <TouchableOpacity onPress={handleEditTask} style={styles.button}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </>
          )}
        </View>

        <ScrollView>
          <View style={styles.taskList}>
            <Text style={styles.title}>Today's Task</Text>
            {tasks.map((task, index) => (
                <View key={index} style={styles.taskContainer}>
                  <CheckBox
                      checked={task.completed}
                      onPress={() => toggleTask(index)}
                  />
                  <Text
                      style={[
                        styles.taskText,
                        task.completed && styles.taskTextCompleted,
                      ]}
                  >
                    {task.text}
                  </Text>
                  <TouchableOpacity
                      onPress={() => {
                        setEditingIndex(index);
                        setEditText(task.text);
                      }}
                  >
                    <Text style={{ color: 'blue' }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <Text style={{ color: 'red', marginHorizontal: 8 }}>Delete</Text>
                  </TouchableOpacity>
                </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    marginHorizontal: 14,
    marginTop: 12,
  },
  h1: {
    fontSize: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  card: {
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#edb009',
    marginHorizontal: 12,
    borderRadius: 11,
    height: 120,
    alignItems: 'center',
  },
  cardText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  progressContainer: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  progressText: {
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    paddingLeft: 12,
    borderWidth: 1,
    height: 40,
    borderRadius: 5,
    borderColor: '#edb009',
  },
  button: {
    backgroundColor: '#edb009',
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  taskList: {
    marginTop: 10,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 8,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  editContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  editInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#edb009',
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
