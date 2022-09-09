import {Button, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import StarRating from 'react-native-star-rating';
import styles from "../utils/AppStyles";
import {addTaskToDatabase} from "../utils/Controller";
import DateTimePicker from "@react-native-community/datetimepicker";
import appStyles from "../utils/AppStyles";


const AddTask = ({navigation, route}) => {
    const [task, setTask] = useState('');
    const [details, setDetails] = useState('');
    const [plannedDate, setPlannedDate] = useState("Not Set Yet");
    const [people, setPeople] = useState([]);
    const [stars, setStars] = useState(3);
    const [errorMessage, setErrorMessage] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());


    if (route.params.date !== null) {
        setPlannedDate(route.params.date + ' ' + route.params.time);
        route.params.date = null;
    }

    const onStarChange = (stars) => {
        setStars(stars);
    }

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
        setTimePicker(true);
    }

    function onTimeSelected(event, value) {
        setTimePicker(false);
        setPlannedDate(date.toDateString() + ' ' + value.toLocaleTimeString("en-US"));
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
                    style={appStyles.datePicker}
                />
            )}

            {timePicker && (
                <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={false}
                    onChange={onTimeSelected}
                    style={appStyles.datePicker}
                />
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}>
                <View>
                    <TextInput style={styles.taskName} placeholder={'Write your task'}
                               value={task} onChangeText={text => setTask(text)}>
                    </TextInput>
                    <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (task !== '') {
                        addTaskToDatabase(task, details, plannedDate, "Not completed", people, stars)
                            .catch((error) => setErrorMessage(error.message));
                        navigation.navigate('RemainingTasks', {
                            refresh: true
                        });
                    } else {
                        setErrorMessage("Task name is mandatory.");
                    }
                }}>
                    <View style={styles.addWrapper}>
                        <Text>Save</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TextInput style={styles.description} placeholder={'Description'}
                       value={details} onChangeText={text => setDetails(text)}/>
            <View style={styles.setDateView}>
                <Text style={styles.date}>Planned date = {plannedDate}</Text>
                <Button style={styles.setDateButton} title={'Set Planned Date'}
                        onPress={() => setDatePicker(true)}>
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

export default AddTask;
