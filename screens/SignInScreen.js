import React from 'react';
import {Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../config/firebase";


const SignInScreen = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setValue({
                    ...value,
                    error: 'User not found.'
                })
            } else if (error.code === 'auth/wrong-password') {
                setValue({
                    ...value,
                    error: 'Wrong password.'
                })
            } else {
                setValue({
                    ...value,
                    error: error.message,
                })
            }
        }
    }

    return (
        <View>
            <Text>Sign in screen!</Text>

            {!!value.error && <View style={{marginTop: 10, padding: 10}}><Text>{value.error}</Text></View>}

            <View>
                <Input
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

                <Button title="Sign in" buttonStyle={{marginTop: 10}} onPress={signIn}/>
            </View>
        </View>
    );
}

export default SignInScreen;