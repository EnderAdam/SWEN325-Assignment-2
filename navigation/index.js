import React from 'react';
import {useAuthentication} from '../utils/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';

/**
 * RootStack is the stack navigator for the entire application.
 * It is composed of the AuthStack and the UserStack
 * Only one stack is visible at a time depending on the authentication state.
 * @returns {JSX.Element} The stack navigator for the entire application.
 * @constructor
 */
export default function RootNavigation() {
    const {user} = useAuthentication();

    return user ? <UserStack/> : <AuthStack/>;
}