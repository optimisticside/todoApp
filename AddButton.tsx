import React, { useState } from 'react';
import { StyleSheet, View,Button, Modal, Text, TextInput } from 'react-native';

interface addProp{
    task: string;
    addTask(task: string) : void;
}

export default function AddButt({taskList, onUpdateTasks}:{taskList: string[], onUpdateTasks(newTasks: string[]): void}) {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    
    const handleButtonPress = () =>{
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    function pushTask({task_body}: {task_body: string}){
        const task: Task = {
            id: Math.random().toString(),
            body: task_body,
        };

        if (tasks && tasks?.addTask){
            tasks?.addTask(task);
        }
    }

    const [taskText, setTaskText] = useState('');

    const handleTaskTextChange = (text: string) => {
        setTaskText(text);
    };

    const handleAddTask = () => {
        pushTask({ task_body: taskText });
        console.log("Task added, " + taskText);
        setTaskText('');
        console.log("all tasks: " + tasks);
        handleCloseModal();
    };

    return (
        <View style={styles.addButton}>
            <Button title={"Add Task"} color='white' onPress={handleButtonPress} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.textInput}> Add a New Task</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter task"
                        value={taskText}
                        onChangeText={handleTaskTextChange}
                        onSubmitEditing={handleAddTask}
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Add" onPress={handleAddTask} />
                        <Button title="Cancel" color='red' onPress={handleCloseModal} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        // ... button styles
    },
    modalContainer: {
        flex: 3, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'grey', 
        borderRadius: 10, 
    },
    textInput: {
        fontSize: 40, // Add the desired font size here
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        fontSize: 40,
    },
});