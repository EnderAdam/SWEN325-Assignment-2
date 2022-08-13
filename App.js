import * as React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AddTask from "./components/AddTask";
import RemainingTasks from "./components/RemainingTasks";
import TaskView from "./components/TaskView";

const Stack = createNativeStackNavigator();


const App = () => {

    const navigationRef = useNavigationContainerRef();
    return (
        <View style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="RemainingTasks"
                        component={RemainingTasks}
                        initialParams={{task: ''}}
                        options={{
                            headerTitleAlign: 'center', title: 'Tasks',
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigationRef.navigate('AddTask')}>
                                    <Image source={require('./Images/plusIcon.jpg')}
                                           style={{width: 24, height: 24, marginRight: 16}}/>
                                </TouchableOpacity>
                            ),
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigationRef.current?.navigate('Settings')}>
                                    <Image source={require('./Images/settingsIcon.jpg')}
                                           style={{width: 28, height: 28, marginRight: 16}}/>
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <Stack.Screen name="Profile" component={CompletedTasks}/>
                    <Stack.Screen name='AddTask' component={AddTask}/>
                    <Stack.Screen name='TaskView' component={TaskView}/>
                    {/*<Stack.Screen name={'Settings'} component={Settings}/>*/}
                </Stack.Navigator>
            </NavigationContainer>


        </View>
    );
};


const CompletedTasks = ({navigation, route}) => {
    return (<View>
            <Text>This is {route.params.name}'s profile</Text>
        </View>
    );
};
const styles = StyleSheet.create({});

export {RemainingTasks};
export default App;