import React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Button, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import RemainingTasks from "../screens/RemainingTasks";
import AddTask from "../screens/AddTask";
import TaskView from "../screens/TaskView";
import {auth} from "../config/firebase";

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
                                <TouchableOpacity onPress={() => navigationRef.navigate('AddTask')}>
                                    <Image source={require('../Images/plusIcon.jpg')}
                                           style={{width: 24, height: 24, marginRight: 16}}/>
                                </TouchableOpacity>
                            ),
                            headerLeft: () => (
                                <Button title="Sign Out" style={styles.button} onPress={() => auth.signOut()} />
                            )
                        }}
                    />
                    <Stack.Screen name="Profile" component={CompletedTasks}/>
                    <Stack.Screen name='AddTask' component={AddTask}/>
                    <Stack.Screen name='TaskView' component={TaskView} options={{title: TaskView.name}}/>
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutButton: {
        marginTop: 10
    }
});