import {Button, Text, TextInput, View} from "react-native";
import {auth} from "../config/firebase";
import React from "react";
import styles from "../utils/AppStyles";
import {deleteUserWithTasks} from "../utils/AuthenticationController";

/**
 * This screen is used to sign out the user. It also allows the user to delete their account.
 * This is done by calling the deleteUserWithTasks function in AuthenticationController.js
 * @param navigation - The navigation object used to navigate between screens
 * @returns {JSX.Element} - The JSX code to render the screen
 * @constructor - The SignOutScreen component
 */
const SignOutScreen = (navigation) => {
    let [errorMessage, setErrorMessage] = React.useState(""); // The error message to display to the user
    let [password, setPassword] = React.useState(""); // The password entered by the user

    return (
        <View style={styles.signContainer}>
            <TextInput
                placeholder='Current Password'
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}/>
            <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
            <Button title="Sign out" onPress={() => auth.signOut() // Sign out the user
            }/>
            <Button title="Delete user" onPress={() => deleteUserWithTasks(password, setErrorMessage)
                // Delete the user and their tasks
            }/>
        </View>
    );
}

export default SignOutScreen;