import {Button, Dimensions, ScrollView, TouchableOpacity, View} from "react-native";
import TaskListView from "../components/TaskListView";
import * as React from "react";
import TaskView from "./TaskView";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from "../config/firebase";

const windowHeight = Dimensions.get('window').height;

const TasksScreen = ({navigation, route}) => {
    const [tasks, setTasks] = React.useState([]);
    let [isLoading, setIsLoading] = React.useState(true);
    const [completedShown, setCompletedShown] = React.useState(false);

    if (route.params.refresh === true) {
        setIsLoading(true);
        route.params.refresh = false;
    }

    let loadTasks = async () => {
        const q = query(collection(db, "tasks"), where("userId", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        let newTasks = [];
        querySnapshot.forEach((doc) => {
            let newTask = doc.data();
            newTask.id = doc.id;
            newTasks.push(newTask);
        });

        setTasks(newTasks);
    }

    if (isLoading) {
        loadTasks().then(() => {
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
                    <Button
                        color="#ff5f5f"
                        titleStyle={{fontSize: 66}}
                        title="Remaining"
                        onPress={() =>
                            setCompletedShown(false)
                        }
                    />
                </View>
                <View style={{flex: 0.5}}>
                    <Button
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
                        if (item.isCompleted === completedShown) {
                            return (
                                <TouchableOpacity key={index}
                                                  onPress={() => navigation.navigate('TaskView', {task: item})}>
                                    <TaskListView text={item.name}/>
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