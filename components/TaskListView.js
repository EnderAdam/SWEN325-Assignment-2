import React from 'react';
import {Text, View} from 'react-native';
import appStyles from "../utils/AppStyles";

/**
 * This is a component that renders a task for TaskScreen
 * @param name - name of the task
 * @param date - date of the task (displays due date if not finished, displays finished date if finished)
 * @returns {JSX.Element} - a component that renders a task
 * @constructor - TaskListView
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