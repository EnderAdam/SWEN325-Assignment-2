import * as React from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Task from "./components/Task";

const Stack = createNativeStackNavigator();
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const App = () => {
    const navigationRef = useNavigationContainerRef();
    return (
        <View style={{flex: 1}}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={RemainingTasks}
                        options={{
                            headerTitleAlign: 'center', title: 'Tasks'
                        }}
                    />
                    <Stack.Screen name="Profile" component={CompletedTasks}/>
                </Stack.Navigator>
            </NavigationContainer>


        </View>
    );
};

const RemainingTasks = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}}>
            <View style={{
                flexDirection: 'row', height: windowHeight / 12, padding: 10,
                alignSelf: 'center', backgroundColor: 'transparent'
            }}>
                <View style={{flex: 0.5}}>
                    <Button
                        style={styles.button}
                        color="#ff5c5c"
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
                            navigation.navigate('Profile', {name: 'Jane'})
                        }
                    />
                </View>
            </View>
            <View>
                <Task text={'joe'}/>
                <Task text={'2'}/>
            </View>
        </View>
    );
};

const CompletedTasks = ({navigation, route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin"
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default App;