import React from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

/**
 * This is a custom hook that allows the user to check if they are logged in or not.
 * @returns {{user: undefined}} - The user object.
 */
export function useAuthentication() {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                // User is signed out
                setUser(undefined);
            }
        });
        return unsubscribeFromAuthStatuChanged;
    }, []);

    return {
        user
    };
}