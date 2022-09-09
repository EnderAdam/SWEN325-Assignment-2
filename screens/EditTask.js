import {Button, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import StarRating from 'react-native-star-rating';
import DateTimePicker from '@react-native-community/datetimepicker';
import appStyles from "../utils/AppStyles";
import {onDateSelected, onTimeSelected, updateTask} from "../utils/Controller";


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
    const [errorMessage, setErrorMessage] = useState('');


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
                    <TextInput style={appStyles.taskName} placeholder={'Write your task'}
                               value={task} onChangeText={text => setTask(text)}/>
                    <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    if (task !== '') {
                        updateTask(route.params.task.id, task, details, shownDate, people, stars, route.params.task.completedDate).then(r => {
                            navigation.navigate('RemainingTasks', {refresh: true});
                        });
                    } else {
                        setErrorMessage('Task name cannot be empty');
                    }
                }}>
                    <View style={appStyles.addWrapper}>
                        <Text>Save</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <TextInput style={appStyles.description} placeholder={'Description'}
                       value={details} onChangeText={text => setDetails(text)}/>
            <View style={appStyles.setDateView}>
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
            <TextInput style={appStyles.people} placeholder={'People'}
                       value={people.join()} onChangeText={text => setPeople(text.replace(/\s/g, "").split(','))}/>
            <StarRating
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