import React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../config/firebase";
import styles from '../utils/AppStyles';

const SignUpScreen = ({navigation}) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Sign In');
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.signContainer}>
            <Text>Signup screen!</Text>

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

                <Button title="Sign up" buttonStyle={{marginTop: 10}} onPress={signUp}/>
            </View>
        </View>
    );
}

export default SignUpScreen;