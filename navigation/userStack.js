import React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from "react-native";
import TasksScreen from "../screens/TasksScreen";
import AddTask from "../screens/AddTask";
import TaskView from "../screens/TaskView";
import DateSelector from "../screens/DateSelector";
import EditTask from "../screens/EditTask";
import Icon from "react-native-vector-icons/FontAwesome";
import SignOutScreen from "../screens/SignOutScreen";
import AppStyles from "../utils/AppStyles";


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
                                <View style={AppStyles.topRightAddAndSort}>
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
                                <TouchableOpacity
                                    onPress={() => navigationRef.navigate('SignOut')}>
                                    <Icon name='user' size={24} color="black"
                                          style={{width: 24, height: 24, marginRight: 10, marginLeft: 20}}/>
                                </TouchableOpacity>
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
                    <Stack.Screen name='SignOut' component={SignOutScreen}
                                  options={{headerTitleAlign: 'center'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

