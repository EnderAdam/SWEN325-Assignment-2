import React from 'react';
import {Button, Text, View} from 'react-native';
import styles from '../utils/AppStyles';

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.signContainer}>
            <Text>Welcome screen!</Text>

            <View style={{flex: 1}}>
                <Button title="Sign in" buttonStyle={{marginTop: 10}} onPress={() => navigation.navigate('Sign In')}/>
                <Button title="Sign up" type="outline" buttonStyle={{marginTop: 10}}
                        onPress={() => navigation.navigate('Sign Up')}/>
            </View>
        </View>
    );
}

export default WelcomeScreen;