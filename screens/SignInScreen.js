import React from 'react';
import {Text, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import {signIn} from "../utils/AuthenticationController";


const SignInScreen = () => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    return (
        <View>

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

                <Button title="Sign in" buttonStyle={{marginTop: 10}} onPress={() => signIn(value, setValue)}/>
            </View>
        </View>
    );
}

export default SignInScreen;