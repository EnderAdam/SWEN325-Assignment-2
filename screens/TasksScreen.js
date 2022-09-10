import {Button, Dimensions, ScrollView, TouchableOpacity, View} from "react-native";
import TaskListView from "../components/TaskListView";
import * as React from "react";
import TaskView from "./TaskView";
import {loadTasks} from "../utils/Controller";

const windowHeight = Dimensions.get('window').height;

/**
 * This is the screen that shows the list of tasks that the user has created.
 * It also allows the user to create a new task by pressing the plus icon in the top right corner.
 * The user can toggle between remaining tasks and completed tasks by pressing the toggle buttons.
 * @param navigation - The navigation object that allows the screen to navigate to other screens.
 * @param route - The route object that allows the screen to access the parameters passed to it. In this case, it is used to refresh the screen.
 * @returns {JSX.Element} - The screen that shows the list of tasks.
 * @constructor - The constructor for the TasksScreen class.
 */
const TasksScreen = ({navigation, route}) => {
    const [tasks, setTasks] = React.useState([]); // The list of tasks that the user has created.
    const [isLoading, setIsLoading] = React.useState(true); // Whether the screen is loading.
    const [completedShown, setCompletedShown] = React.useState(false); // Whether the completed tasks are shown.

    if (route.params.refresh === true) { // If the screen needs to be refreshed.
        setIsLoading(true);
        route.params.refresh = false;
    }

    if (isLoading) { // If the screen is loading.
        loadTasks(setTasks).then(() => { // Load the tasks. Then, set the tasks and stop loading.
            setIsLoading(false)
        });
    }

    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
            <View style={{
                flexDirection: 'row', height: windowHeight / 12, padding: 10,
                alignSelf: 'center', backgroundColor: 'transparent'
            }}>
                <View style={{flex: 0.5}}>
                    <Button // Remaining tasks button.
                        color={completedShown ? "#ff5f5f" : "#33cc33"}
                        titleStyle={{fontSize: 66}}
                        title="Remaining"
                        onPress={() =>
                            setCompletedShown(false)
                        }
                    />
                </View>
                <View style={{flex: 0.5}}>
                    <Button // Completed tasks button.
                        color={completedShown ? "#33cc33" : "#ff5f5f"}
                        title="Finished"
                        onPress={() =>
                            setCompletedShown(true)
                        }
                    />
                </View>
            </View>
            <ScrollView>
                {
                    tasks.map((item, index) => {
                        //shows the tasks that are completed or not completed depending on the completedShown state
                        if (item.isCompleted === completedShown) {
                            return (
                                <TouchableOpacity key={index}
                                                  onPress={() => navigation.navigate('TaskView', {task: item})}>
                                    <TaskListView name={item.name}
                                                  date={item.isCompleted ? item.completedDate : item.plannedDate}/>
                                </TouchableOpacity>
                            );
                        }
                    })
                }
            </ScrollView>
        </View>
    );
};

export default TasksScreen;