import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import { Task } from '../../../src/components/Task';
import { CardNumber } from '../../../src/components/CardNumber';
import { InputAddTask } from '../../../src/components/InputAddTask';
import { useEffect, useState } from 'react';


//app-lista: Aplicativo de Lista de Tarefas

export default function Home() {

    const [tasks, setTasks] = useState<{ description: string; check: boolean }[]>([]);
    const [taskText, setTaskText] = useState("");
    const [countTask, setCountTask] = useState(0);
    const [countInProgress, setCountInProgress] = useState(0);
    const [countCompleted, setCountCompleted] = useState(0);

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
        setCountInProgress(countInProgress + 1);
    }

    function handleTaskChangeStatus(taskToChange: { description: string, check: boolean }) {
        const updatedTasks = tasks.filter((task) => task !== taskToChange)
        const newTask = {
            description: taskToChange.description,
            check: !taskToChange.check,
        }
        updatedTasks.push(newTask);
        setTasks(updatedTasks);

        if (taskToChange.check) {
            setCountInProgress(countInProgress - 1);
            setCountCompleted(countCompleted + 1);
        } else {
            setCountInProgress(countInProgress + 1);
            setCountCompleted(countCompleted - 1);
        }
    }

    function handleTaskDelete(taskToDelete: { description: string, check: boolean }) {
        const updatedTasks = tasks.filter((task) => task != taskToDelete)
        setTasks(updatedTasks);

        if (taskToDelete.check) {
            setCountCompleted(countCompleted - 1);
        } else {
            setCountInProgress(countInProgress - 1);
        }
    };

    useEffect(() => {
        let totalTasks = tasks.length;
        setCountTask(totalTasks);

        const inProgressTasks = tasks.filter((task) => !task.check);
        const completedTasks = tasks.filter((task) => task.check);
        setCountInProgress(inProgressTasks.length);
        setCountCompleted(completedTasks.length);

    }, [tasks]);

    return (
        <View style={styles.container}>
            <InputAddTask
                onPress={handleTaskAdd}
                onChangeText={setTaskText}
                value={taskText}
            />

            <View style={{ flexDirection: 'row', gap: 16 }}>
                <CardNumber title='Tarefas' num={countTask} />
                <CardNumber title='Andamento' num={countInProgress} />
                <CardNumber title='Concluídas' num={countCompleted} />
            </View>

            <View style={styles.tasks}>
                <Text style={{ color: '#ffffff', fontSize: 16, fontWeight: 500, marginBottom: 16 }}>Lista de Tarefas: </Text>
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item }) => (
                            <Task
                                title={item.description}
                                status={item.check}
                                onCheck={() => handleTaskChangeStatus(item)}
                                onRemove={() => handleTaskDelete(item)}
                            />
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
        padding: 20,
        paddingTop: 50,
        gap: 16,
    },
    tasks: {
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    }
});
