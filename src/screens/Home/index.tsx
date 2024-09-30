import { FlatList, StyleSheet, View, Text, Alert } from 'react-native';
import { Task } from '../../../src/components/Task';
import { CardNumber } from '../../../src/components/CardNumber';
import { InputAddTask } from '../../../src/components/InputAddTask';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { TaskProps } from '../../utils/types';
import { Formik } from 'formik';
import * as Yup from 'yup'


//app-lista: Aplicativo de Lista de Tarefas

export default function Home() {

    const { tasks, createTask, setTasks } = useContext(TaskContext);
    const [countTask, setCountTask] = useState(0);
    const [countInProgress, setCountInProgress] = useState(0);
    const [countCompleted, setCountCompleted] = useState(0);

    const TaskSchema = Yup.object().shape({
        taskText: Yup.string().min(3, "No mínimo, 3 caracteres!").max(50, "No máximo, 50 caracteres!").required("Tarefa não pode ser vazia!")
    });

    function handleTaskAdd(taskText: string) {

        if (tasks.some((task) => task.title === taskText)) {
            return Alert.alert("Essa tarefa já existe!");
        }

        createTask(taskText);
        setCountInProgress(countInProgress + 1);
    }

    function handleTaskChangeStatus(taskToChange: TaskProps) {
        const updatedTasks = tasks.filter((task) => task.title !== taskToChange.title)
        const newTask = {
            id: taskToChange.id,
            title: taskToChange.title,
            status: !taskToChange.status,
        }
        updatedTasks.push(newTask);
        setTasks(updatedTasks);

        if (taskToChange.status) {
            setCountInProgress(countInProgress - 1);
            setCountCompleted(countCompleted + 1);
        } else {
            setCountInProgress(countInProgress + 1);
            setCountCompleted(countCompleted - 1);
        }
    }

    function handleTaskDelete(taskToDelete: TaskProps) {
        const updatedTasks = tasks.filter((task) => task.title != taskToDelete.title)
        setTasks(updatedTasks);

        if (taskToDelete.status) {
            setCountCompleted(countCompleted - 1);
        } else {
            setCountInProgress(countInProgress - 1);
        }
    };

    useEffect(() => {
        let totalTasks = tasks.length;
        setCountTask(totalTasks);

        const inProgressTasks = tasks.filter((task) => !task.status);
        const completedTasks = tasks.filter((task) => task.status);
        setCountInProgress(inProgressTasks.length);
        setCountCompleted(completedTasks.length);

    }, [tasks]);

    return (
        <View style={styles.container}>

            <Formik
                initialValues={{ taskText: '' }}
                validationSchema={TaskSchema}
                onSubmit={(values, { resetForm }) => {
                    handleTaskAdd(values.taskText);
                    resetForm({ values: { taskText: '' } });
                }}
            >
                {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                    <View>
                        <InputAddTask
                            onPress={handleSubmit}
                            onChangeText={handleChange('taskText')}
                            onBlur={handleBlur('taskText')}
                            value={values.taskText}
                        />

                        {touched.taskText && errors.taskText && (
                            <Text style={{ color: '#ff0000' }}>{errors.taskText}</Text>
                        )}

                    </View>
                )}

            </Formik>

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
                                id={item.id}
                                title={item.title}
                                status={item.status}
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
