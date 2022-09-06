import {
    Button, KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import * as React from "react";
import {useState} from "react";
import StarRating from 'react-native-star-rating';
import styles from "../utils/AppStyles";
import {addTaskToDatabase} from "../utils/Controller";


const AddTask = ({navigation, route}) => {
    const [task, setTask] = useState('');
    const [details, setDetails] = useState('');
    const [plannedDate, setPlannedDate] = useState("Not Set Yet");
    const [people, setPeople] = useState([]);
    const [stars, setStars] = useState(3);


    if (route.params.date !== null) {
        setPlannedDate(route.params.date + ' ' + route.params.time);
        route.params.date = null;
    }

    const onStarChange = (stars) => {
        setStars(stars);
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
                        addTaskToDatabase(task, details, plannedDate, "Not completed", people, stars);
                        navigation.navigate('RemainingTasks', {
                            refresh: true
                        });

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
                        onPress={() => navigation.navigate('Date Selector', {date: plannedDate, previousScreen: 'Add a new Task'})}>
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
