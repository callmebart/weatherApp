import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

/*Navigators*/
import RootStackNavigator from './RootStackNavigator';

export default function Navigation() {

    return (
            <NavigationContainer>
                <RootStackNavigator />
            </NavigationContainer>
    );
}