import {Button, Text, TextInput, View} from "react-native";
import {auth} from "../config/firebase";
import React from "react";
import styles from "../utils/AppStyles";
import {deleteUserWithTasks} from "../utils/AuthenticationController";

const SignOutScreen = (navigation) => {
    let [errorMessage, setErrorMessage] = React.useState("");
    let [password, setPassword] = React.useState("");

    return (
        <View style={styles.signContainer}>
            <TextInput
                placeholder='Current Password'
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}/>
            <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
            <Button title="Sign out" onPress={() => auth.signOut()}/>
            <Button title="Delete user" onPress={() => deleteUserWithTasks(password, setErrorMessage)}/>
        </View>
    );
}

export default SignOutScreen;