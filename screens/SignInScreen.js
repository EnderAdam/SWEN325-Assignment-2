import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../config/firebase";
import styles from '../utils/AppStyles';


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
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.signContainer}>
            <Text>Signin screen!</Text>

            {!!value.error && <View style={{marginTop: 10, padding: 10}}><Text>{value.error}</Text></View>}

            <View style={{flex: 1}}>
                <TextInput
                    placeholder='Email'
                    containerStyle={{marginTop: 10}}
                    value={value.email}
                    onChangeText={(text) => setValue({...value, email: text})}
                    leftIcon={<Icon
                        name='envelope'
                        size={16}
                    />}
                />

                <TextInput
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