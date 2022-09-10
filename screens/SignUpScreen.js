import React from 'react';
import {Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {signUp} from "../utils/AuthenticationController";

/**
 * This is the sign-up screen. It allows the user to create an account. It is a child of the AuthScreen.
 * @param navigation - The navigation object used to navigate between screens.
 * @returns {JSX.Element} - The sign-up screen.
 * @constructor - The sign-up screen.
 */
const SignUpScreen = ({navigation}) => {
    // The state of the screen.
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

                <Button // The sign-up button.
                    title="Sign up" buttonStyle={{marginTop: 10}} onPress={() => signUp(value, setValue, navigation)}/>
            </View>
        </View>
    );
}

export default SignUpScreen;