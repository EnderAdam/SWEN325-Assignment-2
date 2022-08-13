import {Button, Dimensions, StyleSheet, View} from "react-native";
import Task from "./Task";
import * as React from "react";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let taskItems = [];

const RemainingTasks = ({navigation, route}) => {
    const handleAddTask = (task) => {
        if (task !== '') {
            taskItems = [...taskItems, task];
        }
    }

    if (route)
    handleAddTask(route.params.task);

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
                    taskItems.map((item, index) => <Task key={index} text={item}/>)
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default RemainingTasks;