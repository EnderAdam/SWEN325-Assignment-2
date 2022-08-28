import {Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import Icon from "react-native-vector-icons/FontAwesome";


const TaskView = ({navigation, route}) => {
    useEffect(() => {
        navigation.setOptions({title: route.params.task.name});
    } , [route.params.task.name]);
    return (
        <View>
            <View style={styles.iconLine}>
                <Image source={require('../Images/infoIcon.jpg')}
                       style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>Details: {route.params.task.details}</Text>
            </View>
            <View style={styles.iconLine}>
                <Image source={require('../Images/calendarIcon.jpg')}
                       style={{width: 24, height: 24, marginRight: 10, marginLeft: 10}}/>
                <Text style={styles.text}>Details: {route.params.task.details}</Text>
            </View>
            <Text>{route.params.task.plannedDate}</Text>
            <Text>{route.params.task.completedDate}</Text>
            <Text>{route.params.task.people}</Text>
            <Text>{route.params.task.stars}</Text>
            <Text>{route.params.task.isCompleted}</Text>
        </View>
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
    }
});