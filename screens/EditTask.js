import {
    Button,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../config/firebase";
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "../utils/styles";



const EditTask = ({navigation, route}) => {
    if (route.params.task != null) {
        useEffect(() => {
            navigation.setOptions({
                title: route.params.task.name
            });
        }, []);
    }
    const [task, setTask] = useState(route.params.task.name);
    const [details, setDetails] = useState(route.params.task.details);
    const [shownDate, setShownDate] = useState(route.params.task.completedDate === 'Not completed' ? route.params.task.plannedDate : route.params.task.completedDate);
    const [people, setPeople] = useState(route.params.task.people);
    const [stars, setStars] = useState(route.params.task.stars);
    const [datePicker, setDatePicker] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());


    const onStarChange = (stars) => {
        setStars(stars);
    }

    function showDatePicker() {
        setDatePicker(true);
    }


    let updateTask = async (taskID, task, details, date, people, stars) => {
        try {
            const docRef = doc(db, "tasks", taskID);
            if (route.params.task.completedDate === 'Not completed') {
                await updateDoc(docRef, {
                    name: task,
                    details: details,
                    plannedDate: date,
                    people: people,
                    stars: stars
                });
            } else {
                await updateDoc(docRef, {
                    name: task,
                    details: details,
                    completedDate: date,
                    people: people,
                    stars: stars
                });
            }
            console.log("Document updated with ID: ", taskID);
        } catch (e) {
            console.error("Error updating document: ", e);
        }

    }

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        showTimePicker();
    }

    function showTimePicker() {
        setTimePicker(true);
    }

    function onTimeSelected(event, value) {
        setTimePicker(false);
        setShownDate(date.toDateString() + ' ' + value.toLocaleTimeString("en-US"));
    }

    return (
        <View>
            {datePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                    style={styles.datePicker}
                />
            )}

            {timePicker && (
                <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={false}
                    onChange={onTimeSelected}
                    style={styles.datePicker}
                />
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}>
                <TextInput style={styles.taskName} placeholder={'Write your task'}
                           value={task} onChangeText={text => setTask(text)}/>
                <TouchableOpacity onPress={() => {
                    if (task !== '') {
                        updateTask(route.params.task.id, task, details, shownDate, people, stars).then(r => {
                            navigation.navigate('RemainingTasks', {refresh: true});
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
            <View style={styles.setDateView}>
                {route.params.task.isCompleted ? (
                    <Text style={styles.date}>Completed Date = {shownDate}</Text>
                ) : (
                    <Text style={styles.date}>Planned Date = {shownDate}</Text>
                )}
                <Button style={styles.setDateButton} title={'Set Planned Date'}
                        onPress={() => {
                            showDatePicker();
                        }
                        }>
                </Button>
            </View>
            <TextInput style={styles.people} placeholder={'People'}
                       value={people.join()} onChangeText={text => setPeople(text.replace(/\s/g, "").split(','))}/>
            <StarRating
                containerStyle={styles.starRating}
                disabled={false}
                maxStars={5}
                rating={stars}
                selectedStar={onStarChange}
            />
        </View>
    );
};


export default EditTask;