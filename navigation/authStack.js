import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/Welcome';
import SignInScreen from '../screens/SignInScreen';
import SignOutScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

/**
 * AuthStack is the stack navigator for the authentication screens.
 * The screens are: Welcome, SignIn, SignUp.
 *  - WelcomeScreen is the welcome screen.
 *  - SignInScreen is the sign in screen.
 *  - SignUpScreen is the sign-up screen.
 *  - The screens are wrapped in a NavigationContainer.
 * @returns {JSX.Element} The stack navigator for the authentication screens.
 * @constructor AuthStack
 */
export default function AuthStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Sign In" component={SignInScreen} />
                <Stack.Screen name="Sign Up" component={SignOutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}