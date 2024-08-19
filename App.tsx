import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Task } from './src/components/Task';

export default function App() {
  return (
    <View style={styles.container}>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
      <Task/>
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
