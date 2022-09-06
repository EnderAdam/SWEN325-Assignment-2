import React from 'react';
import {Text, View} from 'react-native';
import appStyles from "../utils/AppStyles";

const TaskListView = (props) => {
    return (
        <View style={appStyles.taskItemComponent}>
            <View style={appStyles.taskItemComponentFlex}>
                <View style={appStyles.taskItemComponentCircle}></View>
                <Text style={appStyles.taskItemComponentText}>{props.text}</Text>
            </View>
        </View>
    )
}

export default TaskListView;