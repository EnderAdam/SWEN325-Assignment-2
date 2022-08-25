import React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RemainingTasks from "../screens/RemainingTasks";
import AddTask from "../screens/AddTask";
import TaskView from "../screens/TaskView";
import {auth} from "../config/firebase";
import DateSelector from "../screens/DateSelector";

const Stack = createStackNavigator();

export default function UserStack() {
    const navigationRef = useNavigationContainerRef();

    return (
        <View style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="RemainingTasks"
                        component={RemainingTasks}
                        initialParams={{refresh: true}}
                        options={{
                            headerTitleAlign: 'center', title: 'Tasks',
                            headerRight: () => (
                                <View style={styles.topRight}>
                                    <TouchableOpacity onPress={() => navigationRef.navigate('Add a new Task')}>
                                        <Image source={require('../Images/filterIcon.jpg')}
                                               style={{width: 24, height: 24, marginRight: 16}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigationRef.navigate('Add a new Task')}>
                                        <Image source={require('../Images/plusIcon.jpg')}
                                               style={{width: 24, height: 24, marginRight: 16}}/>
                                    </TouchableOpacity>
                                </View>
                            ),
                            headerLeft: () => (
                                <Button title="Sign Out" style={styles.button} onPress={() => auth.signOut()}/>
                            )
                        }}
                    />
                    <Stack.Screen name="Profile" component={CompletedTasks}/>
                    <Stack.Screen name='Add a new Task' component={AddTask}/>
                    <Stack.Screen name='TaskView' component={TaskView} options={{title: TaskView.name}}/>
                    <Stack.Screen name='Date Selector' component={DateSelector} options={{title: TaskView.name}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const CompletedTasks = ({navigation, route}) => {
    return (<View>
            <Text>This is {route.params.name}'s profile</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    topRight: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutButton: {
        marginTop: 10
    }
});