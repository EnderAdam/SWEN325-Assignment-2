import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {deleteDoc, doc} from "firebase/firestore";
import {db} from "../config/firebase";


const TaskView = ({navigation, route}) => {

    useEffect(() => {
        navigation.setOptions({
            title: route.params.task.name,
            headerRight: () => (
                <View style={styles.topRight}>
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

    let
        completeTask = async (taskId) => {
        const task = await doc(db, "tasks", taskId);
        await task.update({isCompleted: true});
        navigation.navigate('RemainingTasks', {refresh: true});
    }

    return (
        <ScrollView>
            <View style={styles.iconLine}>
                <Icon name='info-circle' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>Details: {route.params.task.details}</Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='calendar' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>Planned/Due Date: {route.params.task.plannedDate}</Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='calendar' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>Completed Date: {route.params.task.completedDate}</Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='users' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>
                    People: {route.params.task.people.map((e) => (e.toString() + ", ")).join("").slice(0, -2)}
                    {/*Removes the final whitespace and comma*/}
                </Text>
            </View>
            <View style={styles.iconLine}>
                <Icon name='star' size={24} color="black"
                      style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>Stars: {route.params.task.stars}/5</Text>
            </View>
            <View style={styles.bottomLine}>
                <View style={styles.taskViewButtons}>
                    <Button title={'Delete Task'}
                            onPress={() => deleteTask(route.params.task.id)}/>
                </View>
                <View style={styles.taskViewButtons}>
                    <Button style={styles.taskViewButtons} title={'Complete Task' + route.params.task.id}
                            onPress={() => completeTask(route.params.task.id)}/>
                </View>
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
    text: {
        fontSize: 16,
        flexWrap: 'wrap',
        width: '85%',
    },
    topRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    bottomLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        marginTop: 16
    },
    taskViewButtons: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});