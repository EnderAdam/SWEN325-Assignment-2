import {Button, Text, TextInput, View} from "react-native";
import {auth, db} from "../config/firebase";
import React from "react";
import {deleteUser, signInWithEmailAndPassword} from "firebase/auth";
import {collection, getDocs, query, where, writeBatch} from "firebase/firestore";
import styles from "../utils/AppStyles";

const SignOutScreen = (navigation) => {
    let [errorMessage, setErrorMessage] = React.useState("");
    let [password, setPassword] = React.useState("");


    let deleteUserWithTasks = () => {
        if (password === "") {
            setErrorMessage("Must enter current password to delete account");
        } else {
            signInWithEmailAndPassword(auth, auth.currentUser.email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    // Get all todos for user and delete
                    let batch = writeBatch(db);
                    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
                    getDocs(q).then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            batch.delete(doc.ref);
                        });
                        batch.commit().then(r => {
                                deleteUser(user);
                            }
                        );
                    });
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
        }
    }

    return (
        <View style={styles.signContainer}>
            <TextInput
                placeholder='Current Password'
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}/>
            <Text style={{color: "#ff0000"}}>{errorMessage}</Text>
            <Button title="Sign out" onPress={() => auth.signOut()}/>
            <Button title="Delete user" onPress={() => deleteUserWithTasks()}/>
        </View>
    );
}

export default SignOutScreen;