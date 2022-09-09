import {createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../config/firebase";
import {collection, getDocs, query, where, writeBatch} from "firebase/firestore";

/**
 * Sign up a user with email and password.
 * @param value - The state object.
 * @param setValue - The state setter function.
 * @param navigation - The navigation object.
 * @returns {Promise<void>} - A promise that resolves when the user is signed up.
 */
async function signUp(value, setValue, navigation) {
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
        if (error.code === 'auth/email-already-in-use') {
            setValue({
                ...value,
                error: 'Email already in use.'
            })
        } else if (error.code === 'auth/invalid-email') {
            setValue({
                ...value,
                error: 'Invalid email.'
            })
        } else if (error.code === 'auth/weak-password') {
            setValue({
                ...value,
                error: 'Weak password.'
            })
        } else {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }
}

/**
 * Sign in a user with email and password.
 * @param value - The state object.
 * @param setValue - The state setter function.
 * @returns {Promise<void>} - A promise that resolves when the user is signed in.
 */
async function signIn(value, setValue) {
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

/**
 * Delete the current user and all of their tasks.
 * @param password - The current user's password.
 * @param setErrorMessage - The state setter function for the error message.
 */
let deleteUserWithTasks = (password, setErrorMessage) => {
    if (password === "") {
        setErrorMessage("Must enter current password to delete account");
    } else {
        signInWithEmailAndPassword(auth, auth.currentUser.email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Get all the tasks for user and delete them
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

export {signUp, signIn, deleteUserWithTasks};