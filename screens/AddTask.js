import {Button, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useState} from "react";
import StarRating from 'react-native-star-rating';
import styles from "../utils/AppStyles";
import appStyles from "../utils/AppStyles";
import {addTaskToDatabase, onDateSelected, onTimeSelected} from "../utils/Controller";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * This is the screen that is used to add a new task to the database.
 * @param navigation - The navigation object that is used to navigate between screens.
 * @returns {JSX.Element} - The JSX element that is used to render the screen.
 * @constructor - The constructor for the AddTask screen.
 */
const AddTask = ({navigation}) => {
    // The state variables that are used to store the data for the task.
    const [task, setTask] = useState('');
    const [details, setDetails] = useState('');
    const [plannedDate, setPlannedDate] = useState("Not Set Yet");
    const [people, setPeople] = useState([]);
    const [stars, setStars] = useState(3);
    const [errorMessage, setErrorMessage] = useState(''); // The state variable that is used to store the error message.
    // The state variables that are used to store the data of the date and time pickers.
    const [datePicker, setDatePicker] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    return (
        <View>
            {datePicker && (
                <DateTimePicker
                    // The date picker is used to select the date for the task.
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={(event, value) =>
                        onDateSelected(event, value, setDate, setDatePicker, setTimePicker)}
                    style={appStyles.datePicker}
                />
            )}

            {timePicker && (
                <DateTimePicker
                    // The time picker is used to select the time for the task.
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={false}
                    onChange={(event, value) =>
                        onTimeSelected(event, value, setTimePicker, setPlannedDate, date)}
                    style={appStyles.datePicker}
                />
            )}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}>
                <View>
                    <TextInput // The text input that is used to enter the name of the task.
                        style={styles.taskName} placeholder={'Write your task'}
                               value={task} onChangeText={text => setTask(text)}>
                    </TextInput>
                    <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (task !== '') { // If the task is not empty, then the task is added to the database.
                        addTaskToDatabase(task, details, plannedDate, "Not completed", people, stars)
                            .catch((error) => setErrorMessage(error.message));
                        navigation.navigate('RemainingTasks', {
                            refresh: true
                        });
                    } else { // If the task is empty, then an error message is displayed.
                        setErrorMessage("Task name is mandatory.");
                    }
                }}>
                    <View style={styles.addWrapper}>
                        <Text>Save</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TextInput // The text input that is used to enter the details of the task.
                style={styles.description} placeholder={'Description'}
                       value={details} onChangeText={text => setDetails(text)}/>
            <View // The view that is used to display the planned date of the task and the button that is used to select the date.
                style={styles.setDateView}>
                <Text style={styles.date}>Planned date = {plannedDate}</Text>
                <Button style={styles.setDateButton} title={'Set Planned Date'}
                        onPress={() => setDatePicker(true)}>
                </Button>
            </View>
            <TextInput // The text input that is used to enter the people that are involved in the task.
                style={styles.people} placeholder={'People'}
                       value={people.join()}
                       // The people are stored as a list of strings that are separated by commas.
                       onChangeText={text => setPeople(text.replace(/\s/g, "").split(','))}/>
            <StarRating // The star rating that is used to rate the importance of the task.
                containerStyle={styles.starRating}
                disabled={false}
                maxStars={5}
                rating={stars}
                selectedStar={(rating) => setStars(rating)}
            />
        </View>
    );
};

export default AddTask;
