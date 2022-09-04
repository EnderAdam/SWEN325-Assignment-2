import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TaskListView = (props) => {
    return (
        <View style={styles.taskItemComponent}>
            <View style={styles.taskItemComponentFlex}>
                <View style={styles.taskItemComponentCircle}></View>
                <Text style={styles.taskItemComponentText}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    taskItemComponent: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    taskItemComponentFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    taskItemComponentCircle: {
        width: 24,
        height: 24,
        borderWidth: 3,
        borderColor: '#000',
        opacity: 0.4,
        borderRadius: 12,
        marginRight: 15,
    },
    taskItemComponentText: {
        maxWidth: '80%',
    },
});

export default TaskListView;