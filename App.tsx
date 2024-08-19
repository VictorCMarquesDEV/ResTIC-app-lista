import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Task } from './src/components/Task';
import { CardNumber } from './src/components/CardNumber';
import { InputAddTask } from './src/components/InputAddTask';

export default function App() {
  return (
    <View style={styles.container}>
      <InputAddTask/>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <CardNumber />
        <CardNumber />
        <CardNumber />
      </View>
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28385E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },
});
