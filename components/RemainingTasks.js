import {Button, Dimensions, StyleSheet, TouchableOpacity, View} from "react-native";
import TaskListView from "./TaskListView";
import * as React from "react";


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

    console.log(tasks);
    if (route.params.task !== '') {
        setTasks([...tasks, route.params.task]);
        route.params.task = '';
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
                            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                <TaskListView text={item}/>
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