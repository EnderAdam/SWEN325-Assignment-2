import * as React from 'react';
import './config/firebase';
import RootNavigation from './navigation';
import 'react-native-gesture-handler';
import {ThemeProvider} from "@react-navigation/native";

const App = () => {
    return (
        <ThemeProvider>
            <RootNavigation/>
        </ThemeProvider>

    )
};

export default App;