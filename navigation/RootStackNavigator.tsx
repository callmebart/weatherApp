import { createNativeStackNavigator } from '@react-navigation/native-stack';

/*types for navigation definition*/
import { RootStackParamList } from './types';

/*Screens*/
import HomeScreen from '../screens/HomeScreen';
import ErrorScreen from "../screens/ErrorScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailedWeatherScreen from "../screens/DetailedWeatherScreen";

const Stack = createNativeStackNavigator<RootStackParamList>()
export default function RootStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
        }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DetailedWeatherScreen" component={DetailedWeatherScreen} />
            <Stack.Screen options={{
                headerShown: true,
                headerShadowVisible: false,
                headerBackVisible: true,
                title: "Settings",
                headerTitleStyle: {
                    fontSize: 18,
                },
            }}
                name="SettingsScreen"
                component={SettingsScreen}

            />
            <Stack.Screen options={{
                headerShown: false,
                headerShadowVisible: false,
                headerBackVisible: false,
                animation: "slide_from_bottom",
                title: "",
            }}
                name="ErrorScreen"
                component={ErrorScreen}
            />
        </Stack.Navigator>
    )
}