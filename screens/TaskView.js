import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../config/firebase";


const TaskView = ({navigation, route}) => {

    useEffect(() => {
        navigation.setOptions({
            title: route.params.task.name,
            headerRight: () => (
                <View style={styles.editIcon}>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit Task', {task: route.params.task})}>
                        <Icon name='edit' size={24} color="black"
                              style={{width: 24, height: 24, marginRight: 10}}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [route.params.task.name]);

    let deleteTask = async (taskId) => {
        await deleteDoc(doc(db, "tasks", taskId));
        navigation.navigate('RemainingTasks', {refresh: true});
    }

    /**
     *  Update the task's status to completed
     *  Set the completedDate to the current time and date
     * @param taskId
     * @returns {Promise<void>}
     */
    let completeTask = async (taskId) => {
        const task = await doc(db, "tasks", taskId);
        await updateDoc(task, {completedDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString()});
        await updateDoc(task, {isCompleted: true});
        navigation.navigate('RemainingTasks', {refresh: true});
    }

    /**
     *  Update the task's status to not completed
     *  Remove the completedDate
     * @param taskId
     * @returns {Promise<void>}
     */
    let uncompleteTask = async (taskId) => {
        const task = await doc(db, "tasks", taskId);
        await updateDoc(task, {completedDate: "Not completed"});
        await updateDoc(task, {isCompleted: false});
        navigation.navigate('RemainingTasks', {refresh: true});
    }

    return (
        <ScrollView>
            <View style={styles.iconLine}>
                <Icon name='info-circle' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.TaskIconTexts}>Details: {route.params.task.details}</Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='calendar' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.TaskIconTexts}>Planned/Due Date: {route.params.task.plannedDate}</Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='calendar' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.TaskIconTexts}>Completed Date: {route.params.task.completedDate}</Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='users' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.TaskIconTexts}>
                    People: {route.params.task.people.map((e) => (e.toString() + ", ")).join("").slice(0, -2)}
                    {/*Removes the final whitespace and comma*/}
                </Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='star' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.TaskIconTexts}>Stars: {route.params.task.stars}/5</Text>
            </View>
            <View style={styles.TaskViewBottomLine}>
                <View style={styles.taskViewButtons}>
                    <Button title={'Delete Task'}
                            onPress={() => deleteTask(route.params.task.id)}/>
                </View>
                {!route.params.task.isCompleted ? (

                    <View style={styles.taskViewButtons}>
                        <Button style={styles.taskViewButtons} title={'Complete Task'}
                                onPress={() => completeTask(route.params.task.id)}/>
                    </View>
                ) : (
                    <View style={styles.taskViewButtons}>
                        <Button style={styles.taskViewButtons} title={'Uncomplete Task'}
                                onPress={() => uncompleteTask(route.params.task.id)}/>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};


export default TaskView;

const styles = StyleSheet.create({
    iconLine: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 16
    },
    TaskIconTexts: {
        fontSize: 16,
        flexWrap: 'wrap',
        width: '85%',
    },
    editIcon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    TaskViewBottomLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 16,
    },
    taskViewButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});