import {Text, View} from "react-native";


const TaskView = ({navigation, route}) => {
    return (<View>
            <Text>This is {route.params.task.name}'s profile</Text>
            <Text>{route.params.task.description}</Text>
        </View>
    );
};


export default TaskView;