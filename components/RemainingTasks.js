import {Button, Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import TaskListView from "./TaskListView";
import * as React from "react";
import TaskView from "./TaskView";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// let taskItems = [];

const RemainingTasks = ({navigation, route}) => {

    const [tasks, setTasks] = React.useState([]);

    const completeTask = (index) => {
        let newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    if (route.params.task !== '') {
        if (route.params.task.name !== '') {
            setTasks([...tasks, route.params.task]);
            route.params.task = '';
        }

    }

    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
            <View style={{
                flexDirection: 'row', height: windowHeight / 12, padding: 10,
                alignSelf: 'center', backgroundColor: 'transparent'
            }}>
                <View style={{flex: 0.5}}>
                    <Button
                        style={styles.button}
                        color="#ff5f5f"
                        titleStyle={{fontSize: 66}}
                        title="Remaining"
                        onPress={() =>
                            navigation.navigate('Profile', {name: 'Jane'})
                        }
                    />
                </View>
                <View style={{flex: 0.5}}>
                    <Button
                        title="Finished"
                        onPress={() =>
                            navigation.navigate('Profile', {name: 'Bruh'})
                        }
                    />
                </View>
            </View>
            <View>
                {
                    tasks.map((item, index) => {
                        return (
                            // <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                            <TouchableOpacity key={index} onPress={() => navigation.navigate('TaskView', {task: item})}>
                                <TaskListView text={item.name}/>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default RemainingTasks;