import React from 'react';
import {Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {signIn} from "../utils/AuthenticationController";

/**
 * This is the sign in screen for the application. It allows the user to sign in to the application.
 * @returns {JSX.Element} The sign in screen.
 * @constructor The sign in screen.
 */
const SignInScreen = () => {
    // The state of the sign in screen.
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    return (
        <View>

            {!!value.error && <View style={{marginTop: 10, padding: 10}}><Text>{value.error}</Text></View>}
            {/*If there is an error, display it.*/}

            <View>
                <Input
                    // The email input.
                    placeholder='Email'
                    containerStyle={{marginTop: 10}}
                    value={value.email}
                    onChangeText={(text) => setValue({...value, email: text})}
                    leftIcon={<Icon
                        name='envelope'
                        size={16}
                    />}
                />

                <Input
                    // The password input.
                    placeholder='Password'
                    containerStyle={{marginTop: 10}}
                    value={value.password}
                    onChangeText={(text) => setValue({...value, password: text})}
                    secureTextEntry={true}
                    leftIcon={<Icon
                        name='key'
                        size={16}
                    />}
                />

                <Button // The sign-in button.
                    title="Sign in" buttonStyle={{marginTop: 10}} onPress={() => signIn(value, setValue)}/>
            </View>
        </View>
    );
}

export default SignInScreen;