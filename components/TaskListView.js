import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TaskListView = (props) => {
    //make thus crcle view a button
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={styles.circle}></View>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
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
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    circle: {
        width: 24,
        height: 24,
        borderWidth: 3,
        borderColor: '#000',
        opacity: 0.4,
        borderRadius: 12,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
});

export default TaskListView;