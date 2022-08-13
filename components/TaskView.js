import {Text, View} from "react-native";
import {useEffect} from "react";


const TaskView = ({navigation, route}) => {
    useEffect(() => {
        navigation.setOptions({title: route.params.task.name});
    } , [route.params.task.name]);
    return (<View>
            <Text>This is {route.params.task.name}'s profile</Text>
            <Text>{route.params.task.details}</Text>
            <Text>{route.params.task.plannedDate}</Text>
            <Text>{route.params.task.completedDate}</Text>
            <Text>{route.params.task.people}</Text>
            <Text>{route.params.task.stars}</Text>
            <Text>{route.params.task.repeats}</Text>
            <Text>{route.params.task.isCompleted}</Text>
        </View>
    );
};


export default TaskView;