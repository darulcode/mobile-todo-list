import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      setTasks(prevTasks => [...prevTasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(prevTasks => prevTasks.filter((task, i) => i !== index));
  }

  const toggleTask = (index) => {
    setTasks(prevTasks =>
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
              {tasks.filter(task => task.completed).length}/{tasks.length}
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Insert your task"
              value={newTask}
              onChangeText={setNewTask}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView  indicatorStyle={"white"}>
        <View style={styles.taskList}>
          <Text style={styles.title}>Today's Task</Text>
          {tasks.map((task, index) => (
              <View key={index} style={styles.taskContainer}>
                <Text
                    style={[
                      styles.taskText,
                      task.completed && styles.taskTextCompleted
                    ]}
                >
                  {task.text}
                </Text>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                      checked={task.completed}
                      onPress={() => toggleTask(index)}
                  />
                </View>
                <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                  <Text style={{color: 'red'}}>Delete</Text>
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
  },
  input: {
    flex: 9,
    paddingLeft: 12,
    borderWidth: 1,
    marginLeft: 12,
    marginRight: 8,
    height: 40,
    borderRadius: 5,
    borderColor: '#edb009',
  },
  button: {
    backgroundColor: '#edb009',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
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
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderStyle: 'dotted',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  taskText: {
    flex: 4,
    fontSize: 18,
    paddingLeft: 8,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  checkboxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
