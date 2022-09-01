import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

/*Navigators*/
import RootStackNavigator from './RootStackNavigator';

/*Theme*/
import { ThemeContext } from "../hooks/ThemeProvider";
import { Theme } from "../types/types";

export default function Navigation() {
    const [theme, setTheme] = React.useState(Theme.light)
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <NavigationContainer>
                <RootStackNavigator />
            </NavigationContainer>
        </ThemeContext.Provider>
    );
}