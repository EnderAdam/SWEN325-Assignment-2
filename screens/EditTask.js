import {
    Button,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {auth, db} from "../config/firebase";
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;

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
        top: 120,
        paddingVertical: 15,
        width: windowWidth - 50,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    people: {
        left: 25,
        top: 250,
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
    starRating: {
        top: 300,
        width: windowWidth - 50,
        left: 25,
    },
    setDateView: {
        top: 180,
        left: 25,
        width: windowWidth - 50,
    },
    setDateButton: {
        backgroundColor: '#f44ff4',
        color: '#f44ff4',
    },
    date: {
        fontSize: 18,
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },
});

export default EditTask;
