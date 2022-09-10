import React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from "react-native";
import TasksScreen from "../screens/TasksScreen";
import AddTask from "../screens/AddTask";
import TaskView from "../screens/TaskView";
import EditTask from "../screens/EditTask";
import Icon from "react-native-vector-icons/FontAwesome";
import SignOutScreen from "../screens/SignOutScreen";
import AppStyles from "../utils/AppStyles";

/**
 * This is the main stack for the user. It contains all the screens that the user can access after
 * @type {import("@react-navigation/native").TypedNavigator<ParamListBase, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap, typeof StackNavigator>}
 */
const Stack = createStackNavigator();


/**
 * This is the main stack for the user. It contains all the screens that the user can access after
 * @returns {JSX.Element} The stack
 * @constructor UserStack
 */
export default function UserStack() {
    const navigationRef = useNavigationContainerRef(); // This is used to navigate

    return (
        <View style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        // This is the screen that the user sees when they first log in
                        name="RemainingTasks"
                        component={TasksScreen}
                        initialParams={{refresh: true}}
                        options={{
                            // This is the header for the screen
                            headerTitleAlign: 'center', title: 'Tasks',
                            // This is the button that allows the add new tasks
                            headerRight: () => (
                                <View style={AppStyles.topRightAddAndSort}>
                                    <TouchableOpacity
                                        onPress={() => navigationRef.navigate('Add a new Task')}>
                                        <Icon name='plus' size={24} color="black"
                                              style={{width: 24, height: 24, marginRight: 10}}/>
                                    </TouchableOpacity>
                                </View>
                            ),
                            // This is the button that allows the user to sign out or delete their account
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => navigationRef.navigate('SignOut')}>
                                    <Icon name='user' size={24} color="black"
                                          style={{width: 24, height: 24, marginRight: 10, marginLeft: 20}}/>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    {/* Other screens */}
                    <Stack.Screen name='Add a new Task' component={AddTask}/>
                    <Stack.Screen name='TaskView' component={TaskView}
                                  options={{title: TaskView.name, headerTitleAlign: 'center'}}/>
                    <Stack.Screen name='Edit Task' component={EditTask}
                                  options={{headerTitleAlign: 'center'}}/>
                    <Stack.Screen name='SignOut' component={SignOutScreen}
                                  options={{headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

