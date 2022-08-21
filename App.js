import * as React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AddTask from "./components/AddTask";
import RemainingTasks from "./components/RemainingTasks";
import TaskView from "./components/TaskView";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC9372ilKlS0Rqz3QQkD7NtbSnGehe6THk",
    authDomain: "swen325-assignment2-8f38c.firebaseapp.com",
    projectId: "swen325-assignment2-8f38c",
    storageBucket: "swen325-assignment2-8f38c.appspot.com",
    messagingSenderId: "1071550186475",
    appId: "1:1071550186475:web:6c8b75aeb7a52d0c56cfae",
    measurementId: "G-FS707DZVZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


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
                    <Stack.Screen name='TaskView' component={TaskView} options={{title: TaskView.name}}/>
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

export default App;