import React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, StyleSheet, TouchableOpacity, View} from "react-native";
import TasksScreen from "../screens/TasksScreen";
import AddTask from "../screens/AddTask";
import TaskView from "../screens/TaskView";
import {auth} from "../config/firebase";
import DateSelector from "../screens/DateSelector";
import EditTask from "../screens/EditTask";
import Icon from "react-native-vector-icons/FontAwesome";


const Stack = createStackNavigator();


export default function UserStack() {
    const navigationRef = useNavigationContainerRef();

    return (
        <View style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="RemainingTasks"
                        component={TasksScreen}
                        initialParams={{refresh: true}}
                        options={{
                            headerTitleAlign: 'center', title: 'Tasks',
                            headerRight: () => (
                                <View style={styles.topRight}>
                                    <TouchableOpacity onPress={() => navigationRef.navigate('Add a new Task')}>
                                        <Icon name='filter' size={24} color="black"
                                              style={{width: 24, height: 24, marginRight: 10}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigationRef.navigate('Add a new Task', {date: null})}>
                                        <Icon name='plus' size={24} color="black"
                                              style={{width: 24, height: 24, marginRight: 10}}/>
                                    </TouchableOpacity>
                                </View>
                            ),
                            headerLeft: () => (
                                <Button title="Sign Out" style={styles.button} onPress={() => auth.signOut()}/>
                            )
                        }}
                    />
                    <Stack.Screen name='Add a new Task' component={AddTask}/>
                    <Stack.Screen name='TaskView' component={TaskView}
                                  options={{title: TaskView.name, headerTitleAlign: 'center'}}/>
                    <Stack.Screen name='Date Selector' component={DateSelector}
                                  options={{title: 'Planned/Due Date', headerTitleAlign: 'center'}}/>
                    <Stack.Screen name='Edit Task' component={EditTask}
                                  options={{headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}


const styles = StyleSheet.create({
    topRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    signOutButton: {
        marginTop: 10
    }
});