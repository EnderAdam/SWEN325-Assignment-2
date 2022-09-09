import React from 'react';
import {Text, View} from 'react-native';
import appStyles from "../utils/AppStyles";

/**
 * This is a component that renders a task for TaskScreen.
 * @param name
 * @param date
 * @returns {JSX.Element}
 * @constructor
 */
const TaskListView = ({name, date}) => {
    return (
        <View style={appStyles.taskItemComponent}>
            <View style={appStyles.taskItemComponentFlex}>
                <View style={appStyles.taskItemComponentCircle}></View>
                <Text style={appStyles.taskItemComponentText}>{name}</Text>
            </View>
            <Text>{date}</Text>
        </View>
    )
}

export default TaskListView;