import {Button, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';
import appStyles from "../utils/AppStyles";
import {onDateSelected, onTimeSelected, updateTask} from "../utils/Controller";

/**
 * This is the screen that is used to edit a task in the database.
 * @param navigation - The navigation object that is used to navigate between screens.
 * @param route - The route object that is used to pass data between screens. In this case, the task that is being edited.
 * @returns {JSX.Element} - The JSX element that is used to render the screen.
 * @constructor - The constructor for the EditTask screen.
 */
const EditTask = ({navigation, route}) => {
    if (route.params.task != null) { // If the task is not null, then set the title of the screen to the name of the task.
        useEffect(() => {
            navigation.setOptions({
                title: route.params.task.name
            });
        }, []);
    }
    // The state variables that are used to store the data of the task. These are used to update the task in the database.
    const [task, setTask] = useState(route.params.task.name);
    const [details, setDetails] = useState(route.params.task.details);
    //shownDate is dependent whether the task is finished or not.
    //If the task is finished, completedDate is shown, otherwise dueDate is shown.
    const [shownDate, setShownDate] = useState(route.params.task.completedDate === 'Not completed' ? route.params.task.plannedDate : route.params.task.completedDate);
    const [people, setPeople] = useState(route.params.task.people);
    const [stars, setStars] = useState(route.params.task.stars);
    // The state variables that are used to store the data of the date and time pickers.
    const [datePicker, setDatePicker] = useState(false);
    const [timePicker, setTimePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [errorMessage, setErrorMessage] = useState(''); // The state variable that is used to store the error message.


    return (
        <View>
            {datePicker && (
                <DateTimePicker
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
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={false}
                    onChange={(event, value) =>
                        onTimeSelected(event, value, setTimePicker, setShownDate, date)}
                    style={appStyles.datePicker}
                />
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={appStyles.writeTaskWrapper}>
                <View>
                    <TextInput // The text input that is used to enter the name of the task.
                        style={appStyles.taskName} placeholder={'Write your task'}
                               value={task} onChangeText={text => setTask(text)}/>
                    <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (task !== '') { // If the task is not empty, then update the task in the database.
                        updateTask(route.params.task.id, task, details, shownDate, people, stars, route.params.task.completedDate).then(r => {
                            navigation.navigate('RemainingTasks', {refresh: true});
                        });
                    } else { // If the task is empty, then show an error message.
                        setErrorMessage('Task name cannot be empty');
                    }
                }}>
                    <View style={appStyles.addWrapper}>
                        <Text>Save</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TextInput // The text input that is used to enter the details of the task.
                style={appStyles.description} placeholder={'Description'}
                       value={details} onChangeText={text => setDetails(text)}/>
            <View // The view that is used to display the planned date of the task and the button that is used to select the date.
                style={appStyles.setDateView}>
                {route.params.task.isCompleted ? (
                    <View>
                        <Text style={appStyles.date}>Completed Date = {shownDate}</Text>
                        <Button style={appStyles.setDateButton} title={'Set Completed Date'}
                                onPress={() => setDatePicker(true)}/>
                    </View>
                ) : (
                    <View>
                        <Text style={appStyles.date}>Planned Date = {shownDate}</Text>
                        <Button style={appStyles.setDateButton} title={'Set Planned Date'}
                                onPress={() => setDatePicker(true)}/>
                    </View>
                )}

            </View>
            <TextInput // The text input that is used to enter the people that are involved in the task.
                style={appStyles.people} placeholder={'People'}
                       value={people.join()}
                        // The people are stored as a list of strings that are separated by commas.
                       onChangeText={text => setPeople(text.replace(/\s/g, "").split(','))}/>
            <StarRating // The star rating that is used to rate the importance of the task.
                containerStyle={appStyles.starRating}
                disabled={false}
                maxStars={5}
                rating={stars}
                selectedStar={(rating) => setStars(rating)}
            />
        </View>
    );
};


export default EditTask;