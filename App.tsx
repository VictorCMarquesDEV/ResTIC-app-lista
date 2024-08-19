import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Task } from './src/components/Task';
import { CardNumber } from './src/components/CardNumber';
import { InputAddTask } from './src/components/InputAddTask';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

//app-lista: Aplicativo de Lista de Tarefas

export default function App() {

  const [tasks, setTasks] = useState<{ description: string; check: boolean }[]>([]);
  const [taskText, setTaskText] = useState("");
  const [countTask, setCountTask] = useState(0);

  function handleTaskAdd() {
    if (taskText == "") {
      return Alert.alert("Texto vazio. Digite algo!");
    }
    if (tasks.some((task) => task.description === taskText)) {
      return Alert.alert("Essa tarefa já existe!");
    }

    const newTask = { description: taskText, check: false };
    setTasks([...tasks, newTask]);
    setTaskText('');
  }

  useEffect(() => {
    let totalTasks = tasks.length;
    setCountTask(totalTasks);
  }, [tasks]);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Digite a tarefa'
          placeholderTextColor="white"
          keyboardType='default'
          onChangeText={setTaskText}
          value={taskText}
        />
        <TouchableOpacity style={styles.inputButton} onPress={handleTaskAdd}>
          <Feather name='plus-square' size={24} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 16 }}>
        <CardNumber />
        <CardNumber />
        <CardNumber />
      </View>
      
      <View style={styles.tasks}>
        <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 500, marginBottom: 16}}>Lista de Tarefas: </Text>

        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item }) => (
              <Task />
            )
          }
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 500 }}>Você ainda não cadastrou tarefas!</Text>
              <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 500 }}>Crie uma tarefa para começar.</Text>
            </View>
          )}
        />
        </View>
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28385E',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: 64,
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#252627',
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#ffffff',
  },
  inputButton: {
    backgroundColor: '#1e1e1e',
    padding: 16,
    borderRadius: 4,
  },
  tasks: {
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  }
});
