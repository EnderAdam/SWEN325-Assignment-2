import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from '../utils/AppStyles';

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