import {Button, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {completeTask, deleteTask, uncompleteTask} from "../utils/Controller";
import styles from '../utils/AppStyles';


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
                            onPress={() => deleteTask(route.params.task.id, navigation)}/>
                </View>
                {!route.params.task.isCompleted ? (

                    <View style={styles.taskViewButtons}>
                        <Button style={styles.taskViewButtons} title={'Complete Task'}
                                onPress={() => completeTask(route.params.task.id, navigation)}/>
                    </View>
                ) : (
                    <View style={styles.taskViewButtons}>
                        <Button style={styles.taskViewButtons} title={'Uncomplete Task'}
                                onPress={() => uncompleteTask(route.params.task.id, navigation)}/>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};


export default TaskView;