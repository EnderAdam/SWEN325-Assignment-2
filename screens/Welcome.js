import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from '../utils/AppStyles';

/**
 * Welcome screen of the app. This is the first screen that the user sees when they launch the app for the first time.
 * or when they log out. They can either log in or sign up.
 * @param navigation - The navigation object used to navigate between screens.
 * @returns {JSX.Element} - The JSX element to be rendered.
 * @constructor - The Welcome component.
 */
const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.signContainer}>
            <Text style={{textAlign: 'center'}}>Welcome to my Task Manager app. {'\n'}You can sign in or sign up.</Text>

            <View style={styles.welcomeStyle}>
                <Button title="Sign in" buttonStyle={{marginTop: 10}} onPress={() => navigation.navigate('Sign In')}/>
                <Button title="Sign up" type="outline" buttonStyle={{marginTop: 10}}
                        onPress={() => navigation.navigate('Sign Up')}/>
            </View>
        </View>
    );
}

export default WelcomeScreen;