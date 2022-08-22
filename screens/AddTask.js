import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import {windowWidth} from "./HomeScreen";
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from "../config/firebase";


const AddTask = ({navigation}) => {
    const [task, setTask] = useState('');
    const [details, setDetails] = useState('');
    const [plannedDate, setPlannedDate] = useState('');
    const [completedDate, setCompletedDate] = useState('');
    const [people, setPeople] = useState('');
    const [stars, setStars] = useState('');
    const [repeats, setRepeats] = useState('');

    let addToDo = async (task, details, plannedDate, completedDate, people, stars, repeats) => {
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
                name: task,
                details: details,
                plannedDate: plannedDate,
                completedDate: completedDate,
                people: people,
                stars: stars,
                repeats: repeats,
                isCompleted: false,
                userId: auth.currentUser.uid
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}>
                <TextInput style={styles.taskName} placeholder={'Write your task'}
                           value={task} onChangeText={text => setTask(text)}/>
                <TouchableOpacity onPress={() => {
                    if (task !== '') {
                        addToDo(task, details, plannedDate, completedDate, people, stars, repeats)
                            .then(() => {
                                navigation.navigate('RemainingTasks', {
                                    refresh: true
                                })
                            });

                    }
                }}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addTask}>Save</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TextInput style={styles.description} placeholder={'Description'}
                       value={details} onChangeText={text => setDetails(text)}/>
        </View>
    );
};

const styles = StyleSheet.create({
    writeTaskWrapper: {
        position: 'absolute',
        top: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    taskName: {
        paddingVertical: 15,
        width: 250,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    description: {
        left: 25,
        top: 100,
        paddingVertical: 15,
        width: windowWidth - 50,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addTask: {}
});

export default AddTask;
