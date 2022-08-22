import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { useAuthentication } from '../utils/useAuthentication';
import {getAuth} from "firebase/auth";

const auth = getAuth();

export default function HomeScreen() {
    const { user } = useAuthentication();

    return (
        <View style={styles.container}>
            <Text>Welcome {user?.email}!</Text>

            <Button title="Sign Out" style={styles.button} onPress={() => auth.signOut()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 10
    }
});